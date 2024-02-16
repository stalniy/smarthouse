from custom_components.dahua import DahuaDataUpdateCoordinator
from .dahua_event_sensor import DahuaEventSensor
from .cross_region_detection_sensor import CrossRegionDetectionSensor

def sensor_type_for_event(coordinator: DahuaDataUpdateCoordinator, config_entry, event_name: str):
    # if event_name == 'CrossRegionDetection':
    #     return CrossRegionDetectionSensor(coordinator, config_entry, event_name)
    # else:
    return DahuaEventSensor(coordinator, config_entry, event_name)