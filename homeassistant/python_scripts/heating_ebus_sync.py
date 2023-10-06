house_temp_desired = float(hass.states.get('sensor.house_max_temp_desired').state)
if hass.states.get('binary_sensor.is_day').state == 'off':
    house_temp_desired = house_temp_desired - float(hass.states.get('input_number.night_shift_temp_desired').state)
temp_outside = -10 # TODO: get temp from ouside
heating_curve_factor = 0.7 # TODO: setup heating curve

flow_temp_desired = round(house_temp_desired + heating_curve_factor * (house_temp_desired - temp_outside), 0)

if flow_temp_desired > 60:
    flow_temp_desired = 60

hwc_temp_desired = float(hass.states.get('input_number.main_heater_storage_temp_desired').state)
heating_disabled = "0" if hass.states.get('switch.ebusd_bai_heatingswitch_onoff').state == "on" else "1"
hwc_disabled = "0" if hass.states.get('switch.ebusd_bai_hwcswitch_onoff').state == "on" else "1"

service_data = {
    'topic': 'ebusd/bai/SetModeOverride/set', 
    'qos':'1', 
    'payload': '0;{};{};-;-;{};0;{};-;0;0;0'.format(int(flow_temp_desired), int(hwc_temp_desired), heating_disabled, hwc_disabled)
}

hass.services.call("mqtt", "publish", service_data, False)
logger.info(service_data)
