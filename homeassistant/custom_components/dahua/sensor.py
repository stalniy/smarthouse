"""Sensor platform for dahua."""
import re

from homeassistant.components.sensor import SensorEntity
from homeassistant.core import HomeAssistant
from custom_components.dahua import DahuaDataUpdateCoordinator

from .const import (
    DOMAIN
)
from .entity import DahuaBaseEntity

# Override event names. Otherwise we'll generate the name from the event name for example SmartMotionHuman will
# become "Smart Motion Human"
NAME_OVERRIDES = {
    "CrossRegionDetection": "Crossed Regioin",
}

async def async_setup_entry(hass: HomeAssistant, entry, async_add_devices):
    """Setup binary_sensor platform."""
    coordinator: DahuaDataUpdateCoordinator = hass.data[DOMAIN][entry.entry_id]

    sensors: list[DahuaEventSensor] = []
    sensors.append(DahuaEventSensor(coordinator, entry, "CrossRegionDetection"))

    if sensors:
        async_add_devices(sensors)


class DahuaEventSensor(DahuaBaseEntity, SensorEntity):
    """
    dahua binary_sensor class to record events. Many of these events are configured in the camera UI by going to:
    Setting -> Event -> IVS -> and adding a tripwire rule, etc. See the DahuaEventThread in thread.py on how we connect
    to the cammera to listen to events.
    """

    def __init__(self, coordinator: DahuaDataUpdateCoordinator, config_entry, event_name: str):
        DahuaBaseEntity.__init__(self, coordinator, config_entry)
        SensorEntity.__init__(self)

        # event_name is the event name, example: VideoMotion, CrossLineDetection, SmartMotionHuman, etc
        self._event_name = event_name

        self._coordinator = coordinator
        self._device_name = coordinator.get_device_name()
        self._device_class = None
        self._icon_override = None

        # name is the friendly name, example: Cross Line Alarm. If the name is not found in the override it will be
        # generated from the event_name. For example SmartMotionHuman will become "Smart Motion Human"
        # https://stackoverflow.com/questions/25674532/pythonic-way-to-add-space-before-capital-letter-if-and-only-if-previous-letter-i/25674575
        default_name = re.sub(r"(?<![A-Z])(?<!^)([A-Z])", r" \1", event_name)
        self._name = NAME_OVERRIDES.get(event_name, default_name)

        # Build the unique ID. This will convert the name to lower underscores. For example, "Smart Motion Vehicle" will
        # become "smart_motion_vehicle" and will be added as a suffix to the device serial number
        self._unique_id = coordinator.get_serial_number() + "_" + self._name.lower().replace(" ", "_")

    @property
    def unique_id(self):
        """Return the entity unique ID."""
        return self._unique_id

    @property
    def name(self): 
        """Return the name of the binary_sensor. Example: Cam14 Motion Alarm"""
        return f"{self._device_name} {self._name}"

    @property
    def device_class(self):
        """Return the class of this binary_sensor, Example: motion"""
        return self._device_class

    @property
    def icon(self) -> str:
        return self._icon_override

    async def async_added_to_hass(self):
        """Connect to dispatcher listening for entity data notifications."""
        event_name = self._event_name
        
        def update_state():
            self._coordinator.log.debug(f"Received update for sensor event {event_name}")

            # if event['action'] == 'Start':
            #     self._attr_native_value = event['name']
            # elif event['action'] == 'Stop':
            #     self._attr_native_value = None
            
            # self.async_write_ha_state()
            
        self._coordinator.add_dahua_event_listener(event_name, update_state)

    @property
    def should_poll(self) -> bool:
        """Return True if entity has to be polled for state.  False if entity pushes its state to HA"""
        return False
