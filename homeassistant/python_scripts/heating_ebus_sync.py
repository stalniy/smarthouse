heating_mode = hass.states.get('input_select.heating_mode').state

if heating_mode == 'auto':
    # TODO: add possibility to auto adjust heating mode in case 
    # 1. heater stops heating too often
    # 2. heater cannot increase temp during a long period of time
    house_temp_desired = float(hass.states.get('sensor.house_max_temp_desired').state)
    house_avg_temp = float(hass.states.get('sensor.house_avg_temp').state)
    temp_diff = house_temp_desired - house_avg_temp

    if temp_diff >= 3:
        heating_mode = 'swift'
    elif temp_diff >= 2:
        heating_mode = 'fast'
    else:
        heating_mode = 'normal'

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
