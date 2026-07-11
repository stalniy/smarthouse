temp_diff = float(hass.states.get('input_number.min_heating_temp_diff').state)
MIN_TEMP = 35
ACTUATOR_CYCLE_TIME = 180
MAX_LIFT = 10.0 # max lift temperature in C

def clamp(value, min_value, max_value):
    return max(min_value, min(value, max_value))

def is_heater_just_enabled():
    return (dt_util.now() - hass.states.get('input_boolean.heating_enabled').last_changed).seconds <= 60

def auto_calc_heating_flow_temp():
    hotfloor_base_temp = MIN_TEMP + -1 * temp_diff * MAX_LIFT * 0.2 * float(hass.states.get('sensor.house_hotfloor_heating_load_factor').state)
    hotfloor_temp = clamp(hotfloor_base_temp, MIN_TEMP, 40)

    radiators_base_temp = MIN_TEMP + 5 + -1 * temp_diff * MAX_LIFT * float(hass.states.get('sensor.house_radiators_heating_load_factor').state) + float(hass.states.get('input_number.main_heater_bias').state)
    radiators_temp = clamp(radiators_base_temp, MIN_TEMP + 5, 60)

    return max(hotfloor_temp, radiators_temp)


def calc_heating_flow_temp():
    heating_mode = hass.states.get('input_select.heating_mode').state
    if heating_mode == 'auto':
        return auto_calc_heating_flow_temp()
    if heating_mode == 'minimum':
        return MIN_TEMP
    if heating_mode == 'fast':
        return 50
    if heating_mode == 'swift':
        return 60
    return 40

radiator_valves_open_state = hass.states.get('binary_sensor.is_radiator_valves_open')
hot_floor_valves_open_state = hass.states.get('binary_sensor.is_hot_floor_valves_open')
has_demand = temp_diff < 0 and ( \
    radiator_valves_open_state.state == 'on' and (dt_util.now() - radiator_valves_open_state.last_changed).total_seconds() > ACTUATOR_CYCLE_TIME or \
    hot_floor_valves_open_state.state == 'on' and (dt_util.now() - hot_floor_valves_open_state.last_changed).total_seconds() > ACTUATOR_CYCLE_TIME \
)
heating_disabled = "0" if hass.states.get('input_boolean.heating_enabled').state == "on" and has_demand else "1"
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
