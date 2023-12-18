import { iPhoneSettingsConstants, iPhoneWithWidgetsSettingsConstants, iPadSettingsConstants, letterSettingsConstants, a4SettingsConstants } from "../data/developerSettingsConstants";

export function getDeviceConstant(device: string, widget: boolean) {
    let constantDevice;
    switch (device) {
        case "ipad":
            constantDevice = iPadSettingsConstants;
            break;
        case "iphone":
            constantDevice = widget ? iPhoneWithWidgetsSettingsConstants : iPhoneSettingsConstants;
            break;
        case "letter":
            constantDevice = letterSettingsConstants;
            break;
        case "a4":
            constantDevice = a4SettingsConstants;
            break;
        default:
            constantDevice = iPhoneSettingsConstants;
            break;
    }

    return constantDevice
}

export function getScale(SCALE: { phone: number, tablet: number }, WIDTH: number): number {
    const deviceWidth = window.innerWidth;

    if (deviceWidth < 600) {
        return (0.96 * deviceWidth) / WIDTH
    } else if (deviceWidth < 1200) {
        return SCALE.tablet
    } else {
        return 1
    }
}