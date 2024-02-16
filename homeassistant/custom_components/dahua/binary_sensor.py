"""Binary sensor platform for dahua."""

from homeassistant.core import HomeAssistant
from custom_components.dahua import DahuaDataUpdateCoordinator

from .const import (
    DOMAIN
)
from .sensors.sensor_factory import sensor_type_for_event

async def async_setup_entry(hass: HomeAssistant, entry, async_add_devices):
    """Setup binary_sensor platform."""
    coordinator: DahuaDataUpdateCoordinator = hass.data[DOMAIN][entry.entry_id]

    sensors = []
    for event_name in coordinator.get_event_list():
        sensors.append(sensor_type_for_event(coordinator, entry, event_name))

    # For doorbells we'll just add these since most people will want them
    if coordinator.is_doorbell():
        sensors.append(sensor_type_for_event(coordinator, entry, "DoorbellPressed"))
        sensors.append(sensor_type_for_event(coordinator, entry, "Invite"))
        sensors.append(sensor_type_for_event(coordinator, entry, "DoorStatus"))
        sensors.append(sensor_type_for_event(coordinator, entry, "CallNoAnswered"))

    if sensors:
        async_add_devices(sensors)

