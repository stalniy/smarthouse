from .dahua_event_sensor import DahuaEventSensor

class CrossRegionDetectionSensor(DahuaEventSensor):
    def collect_attributes_from_event(self, event):
        attributes = dict()
        attributes['region'] = event['data']['Name']

        direction = event['data'].get('Direction')
        if direction is not None:
            attributes['direction'] = direction

        detected_object = event['data'].get('Object')
        if detected_object is not None:
            details = {
                'action': detected_object['Action'],
                'action_type': event['action']
            }
            if detected_object.get('Confidence', 0) != 0:
                details['confidence'] = detected_object['Confidence']
            if detected_object.get('ObjectType', 'Unknown') != 'Unknown':
                details['type'] = detected_object['ObjectType']
            if detected_object.get('Speed', 0) != 0:
                details['speed'] = detected_object['Speed']

            attributes['object'] = details

        return attributes
