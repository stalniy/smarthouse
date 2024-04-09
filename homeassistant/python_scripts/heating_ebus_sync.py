heating_mode = hass.states.get('input_select.heating_mode').state
temp_diff = float(hass.states.get('input_number.min_heating_temp_diff').state)

if heating_mode == 'auto':
    # TODO: add possibility to auto adjust heating mode in case 
    # 1. heater stops heating too often
    # 2. heater cannot increase temp during a long period of time
    is_heating_only_hotfloor = hass.states.get('binary_sensor.heating_only_hotfloor_in_house').state == 'on'

    if temp_diff <= -2.5 and not is_heating_only_hotfloor:
        heating_mode = 'swift'
    elif temp_diff <= -1.5 and not is_heating_only_hotfloor:
        heating_mode = 'fast'
    elif temp_diff <= -0.5:
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

can_heat = hass.states.get('input_boolean.heating_enabled').state == "on" and \
    temp_diff < 0 and ( \
        hass.states.get('binary_sensor.is_radiator_valves_open').state == 'on' or \
        hass.states.get('binary_sensor.is_hot_floor_valves_open').state == 'on' \
    )

heating_disabled = "0" if can_heat else "1"
hwc_temp_desired = float(hass.states.get('input_number.main_heater_storage_temp_desired').state)
hwc_disabled = "0" if hass.states.get('input_boolean.hwc_enabled').state == "on" else "1"

service_data = {
    'topic': 'ebusd/bai/SetModeOverride/set', 
    'qos': 1, 
    'payload': '0;{};{};-;-;{};0;{};-;0;0;0'.format(
        int(flow_temp_desired), 
        int(hwc_temp_desired), 
        heating_disabled, 
        hwc_disabled
    )
}

hass.services.call("mqtt", "publish", service_data, False)
logger.info(service_data)