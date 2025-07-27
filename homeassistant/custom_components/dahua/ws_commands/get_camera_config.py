
from hashlib import md5
from homeassistant.components import websocket_api
from homeassistant.helpers import entity_registry as er
import voluptuous as vol
from homeassistant.core import HomeAssistant, callback
from ..const import DOMAIN, CONF_ADDRESS, CONF_CHANNEL
from homeassistant.auth.permissions.const import POLICY_READ


@websocket_api.websocket_command({
    vol.Required("type"): "dahua/get_camera_config",
    vol.Required("entity_id"): str
})
@callback
def ws_get_camera_config(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
):
    entity_id = msg["entity_id"]

    if not connection.user.permissions.check_entity(entity_id, POLICY_READ):
        connection.send_error(msg["id"], "permission_denied", "You do not have permission to access this entity")
        return

    entity_registry = er.async_get(hass)
    entity_entry = entity_registry.async_get(entity_id)

    if not entity_entry or not entity_entry.config_entry_id:
        connection.send_error(msg["id"], "entity_not_found", "Entity not found or not associated with a config entry")
        return

    # Get the config entry to access username and password
    config_entry = hass.config_entries.async_get_entry(entity_entry.config_entry_id)

    if not config_entry or config_entry.domain != DOMAIN:
        connection.send_error(msg["id"], "config_entry_not_found", "Config entry not found or not a Dahua integration")
        return

    connection.send_result(msg["id"], {
        "address": config_entry.data.get(CONF_ADDRESS),
        "channel": config_entry.data.get(CONF_CHANNEL, 0) + 1,
    })