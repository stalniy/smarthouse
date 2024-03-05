const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const tuya = require('zigbee-herdsman-converters/lib/tuya');
const e = exposes.presets;

const valueConverter = tuya.valueConverterBasic.lookup((options) => ({
    'ON': !options.invert_switch, 
    'OFF': !!options.invert_switch,
}));

const definition = {
    fingerprint: [
        {
            modelID: 'TS0601',
            manufacturerName: '_TZE204_dqolcpcp',
        },
    ],
    zigbeeModel: ['TS0601'], // The model ID from: Device with modelID 'lumi.sens' is not supported.
    model: 'TS0601', // Vendor model number, look on the device for a model number
    vendor: 'Tuya', // Vendor of the device (only used for documentation and startup logging)
    description: '12 channels switch', // Description of the device, copy from vendor site. (only used for documentation and startup logging)
    exposes: [
        e.switch().withEndpoint('l1'),
        e.switch().withEndpoint('l2'),
        e.switch().withEndpoint('l3'),
        e.switch().withEndpoint('l4'),
        e.switch().withEndpoint('l5'),
        e.switch().withEndpoint('l6'),
        e.switch().withEndpoint('l7'),
        e.switch().withEndpoint('l8'),
        e.switch().withEndpoint('l9'),
        e.switch().withEndpoint('l10'),
        e.switch().withEndpoint('l11'),
        e.switch().withEndpoint('l12'),
    ],
    fromZigbee: [
        fz.ignore_basic_report, 
        tuya.fz.datapoints,
    ],
    toZigbee: [
        tuya.tz.datapoints,
    ],
    configure: async (device, coordinatorEndpoint, logger) => {
        await tuya.configureMagicPacket(device, coordinatorEndpoint, logger);
        await reporting.bind(device.getEndpoint(1), coordinatorEndpoint, ['genOnOff']);
        await reporting.bind(device.getEndpoint(242), coordinatorEndpoint, ['genOnOff']);
        // await reporting.onOff(device.getEndpoint(1));
        // await reporting.onOff(device.getEndpoint(242));
    },
    endpoint: (x) => { 
        return {
            l1: 1,
            l2: 1,
            l3: 1,
            l4: 1,
            l5: 1,
            l6: 1,
            l7: 1,
            l8: 1,
            l9: 1,
            l10: 1,
            l11: 1,
            l12: 1,
        }
    },
    options: [
        new exposes.Binary(`invert_switch`, exposes.access.SET, true, false).withDescription(`Inverts the switch state, false: switch=on, true: switch=off.`)
    ],
    meta: {
        multiEndpoint: true,
        tuyaDatapoints: [
            [1, 'state_l1', valueConverter],
            [2, 'state_l2', valueConverter],
            [3, 'state_l3', valueConverter],
            [4, 'state_l4', valueConverter],
            [5, 'state_l5', valueConverter],
            [6, 'state_l6', valueConverter],
            [101, 'state_l7', valueConverter],
            [102, 'state_l8', valueConverter],
            [103, 'state_l9', valueConverter],
            [104, 'state_l10', valueConverter],
            [105, 'state_l11', valueConverter],
            [106, 'state_l12', valueConverter],
        ],
    },
};

module.exports = definition;
