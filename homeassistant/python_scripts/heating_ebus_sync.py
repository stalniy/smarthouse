heating_mode = hass.states.get('input_select.heating_mode').state

if heating_mode == 'auto':
    # TODO: add possibility to auto adjust heating mode in case 
    # 1. heater stops heating too often
    # 2. heater cannot increase temp during a long period of time
    temp_diff = float(hass.states.get('sensor.house_min_heating_temp_diff').state)
    is_day_heating_time = hass.states.get('binary_sensor.is_day_heating_time').state == 'on'
    is_cheap_heating_time = hass.states.get('binary_sensor.is_cheap_heating_period').state == 'on'

    if temp_diff <= -3 or is_day_heating_time and is_cheap_heating_time:
        heating_mode = 'swift'
    elif temp_diff <= -2:
        heating_mode = 'fast'
    elif temp_diff <= -1:
        heating_mode = 'normal'
    else:
        heating_mode = 'minimum'

if heating_mode == 'minimum':
    flow_temp_desired = 35
elif heating_mode == 'fast':
    flow_temp_desired = 50
elif heating_mode == 'swift':
    flow_temp_desired = 60
else:
    flow_temp_desired = 40

hwc_temp_desired = float(hass.states.get('input_number.main_heater_storage_temp_desired').state)
heating_disabled = "0" if hass.states.get('input_boolean.heating_enabled').state == "on" else "1"
hwc_disabled = "0" if hass.states.get('input_boolean.hwc_enabled').state == "on" else "1"

service_data = {
    'topic': 'ebusd/bai/SetModeOverride/set', 
    'qos': 1, 
    'payload': '0;{};{};-;-;{};0;{};-;0;0;0'.format(int(flow_temp_desired), int(hwc_temp_desired), heating_disabled, hwc_disabled)
}

hass.services.call("mqtt", "publish", service_data, False)
logger.info(service_data)
