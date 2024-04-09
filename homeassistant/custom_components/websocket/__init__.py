"""
Custom integration to integrate Dahua cameras with Home Assistant.
"""
import asyncio
from typing import Any, Dict
import logging
# import time

from datetime import timedelta
import aiohttp

from homeassistant.components.tag import async_scan_tag
import homeassistant.helpers.config_validation as cv
from homeassistant.exceptions import TemplateError
from homeassistant.helpers.template import Template
# import hashlib

from aiohttp import ClientError, ClientResponseError, ClientSession, TCPConnector
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import CALLBACK_TYPE, Config, HomeAssistant, EventOrigin, callback
from homeassistant.exceptions import ConfigEntryNotReady, PlatformNotReady
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed
from homeassistant.const import EVENT_HOMEASSISTANT_STOP, EVENT_HOMEASSISTANT_START

import voluptuous as vol
import websockets.sync.client
import json

DOMAIN = "websocket"

CONFIG_SCHEMA = vol.Schema({
  DOMAIN: vol.All(cv.ensure_list, [vol.Schema({
    vol.Required('url'): cv.string,
    vol.Required('event_type'): cv.template,
    vol.Required('event_data'): cv.template,
  })])
}, extra=vol.ALLOW_EXTRA)

_LOGGER: logging.Logger = logging.getLogger(__package__)

async def async_setup(hass: HomeAssistant, config: Config):
  hass.data[DOMAIN] = {}

  def _get_config_value(item_config, attr, message, parse: bool = False, default: Any = None):
    value: Template = item_config.get(attr)

    if value is str:
      return value

    value.hass = hass
    result = None
    try:
      result = value.async_render({ 'message': message }, limited=True, parse_result=parse)
    except TemplateError as exc:
      _LOGGER.error(
          "TemplateError in %s: %s -> %s",
          attr,
          value.template,
          exc,
      )

    if result is None:
      return default

    return result

  async def proxy_websocket_events(item_config):
    async for websocket in websockets.connect(item_config['url']):
      try:
        async for raw_message in websocket:
          message = json.loads(str(raw_message))
          event_type = _get_config_value(item_config, 'event_type', message, default='')
          if event_type:
            event_data = _get_config_value(item_config, 'event_data', message, parse=True, default=dict())
            hass.bus.fire(event_type, event_data, origin=EventOrigin.remote)
      except websockets.ConnectionClosed as ex:
        _LOGGER.warn(
          "Connection to %s was closed, will reconnet later",
          item_config['url'],
          exc_info=ex
        )

  async def connect_to_websockets(event):
    tasks = [asyncio.create_task(proxy_websocket_events(item_config)) for item_config in config[DOMAIN]]
    
    @callback
    def disconnect():
      for task in tasks:
        task.cancel()
    
    hass.bus.listen_once(EVENT_HOMEASSISTANT_STOP, disconnect)

  hass.bus.async_listen_once(EVENT_HOMEASSISTANT_START, connect_to_websockets)

  return True