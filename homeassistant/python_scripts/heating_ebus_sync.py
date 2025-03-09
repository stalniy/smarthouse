temp_diff = float(hass.states.get('input_number.min_heating_temp_diff').state)

def suggested_temp_for_temp_diff():
    if temp_diff <= -2.5:
        return 60
    elif temp_diff <= -1.5:
        return 50
    elif temp_diff <= -0.5:
        return 40
    else:
        return 35

def auto_calc_heating_flow_temp():
    is_heating_only_hotfloor = hass.states.get('binary_sensor.heating_only_hotfloor_in_house').state == 'on'

    if is_heating_only_hotfloor:
        return 40 if temp_diff < -2 else 35
    
    current_temp = float(hass.states.get('sensor.ebusd_bai_flowtempdesired_temp').state) or 35
    house_min_heating_temp_diff_rate = float(hass.states.get('sensor.house_min_heating_teamp_diff_rate').state) or 0
    main_heater_flame_off_counter = float(hass.states.get('counter.main_heater_cycle_count').state) or 0

    if (dt_util.now() - hass.states.get('input_boolean.heating_enabled').last_changed).seconds <= 60:
        return suggested_temp_for_temp_diff()
    
    if main_heater_flame_off_counter >= 2:
        # too often heater was toggled, temp is too high
        return max(35, current_temp - 5)

    if house_min_heating_temp_diff_rate < 0.5:
        # less than 0.5C per 5 min => slow heating, need to increase temp
        return min(current_temp + 1, 60)
    
    return current_temp


def calc_heating_flow_temp():
    heating_mode = hass.states.get('input_select.heating_mode').state
    if heating_mode == 'auto':
        return auto_calc_heating_flow_temp()
    if heating_mode == 'minimum':
        return 35
    if heating_mode == 'fast':
        return 50
    if heating_mode == 'swift':
        return 60
    return 40

can_heat = hass.states.get('input_boolean.heating_enabled').state == "on" and \
    temp_diff < 0 and ( \
        hass.states.get('binary_sensor.is_radiator_valves_open').state == 'on' or \
        hass.states.get('binary_sensor.is_hot_floor_valves_open').state == 'on' \
    )

heating_disabled = "0" if can_heat else "1"
heating_temp = int(calc_heating_flow_temp())
hwc_temp_desired = int(float(hass.states.get('input_number.main_heater_storage_temp_desired').state))
hwc_disabled = "0" if hass.states.get('input_boolean.hwc_enabled').state == "on" else "1"

service_data = {
    'topic': 'ebusd/bai/SetModeOverride/set', 
    'qos': 1, 
    'payload': '0;{};{};-;-;{};0;{};-;0;0;0'.format(
        heating_temp, 
        hwc_temp_desired, 
        heating_disabled, 
        hwc_disabled
    )
}

hass.services.call("mqtt", "publish", service_data, False)
logger.info(service_data)
output["mqtt_service_call"] = service_data
output["heating_temp"] = heating_temp
output["hwc_temp"] = hwc_temp_desired