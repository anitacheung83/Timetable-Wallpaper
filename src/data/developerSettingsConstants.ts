import DeveloperSettings from '../interfaces/developerSettingsInterfaces'
import iPhoneDateTime from "../assets/iphoneDateTime.png"
import iPhoneImage from "../assets/iphone-14-lock-screen.png"
import iPadImage from "../assets/ipad-pro-13.png"

export const iPhoneSettingsConstants: DeveloperSettings = {
    ASPECT_RATIO: 9 / 19.5,
    HEIGHT: "699px",
    WATERMARK_POSITION: "18px",
    BORDER_RADIUS: "24px",
    LENGTH_LIMIT: 441,
    PDF_SETTINGS: {
        PAGE_ORIENTATION: 'p'
    },
    TOP: 184,
    DEVICE_IMAGES: {
        DATE_TIME: {
            SRC: iPhoneDateTime,
            STYLE: {
                height: "120px",
                top: "66px"
            }
        },
        DEVICE_MOCK: {
            SRC: iPhoneImage,
            STYLE: {
                height: "770px"
            }
        }
    },
}

export const iPhoneWithWidgetsSettingsConstants: DeveloperSettings = {
    ASPECT_RATIO: 9 / 19.5,
    HEIGHT: "699px",
    WATERMARK_POSITION: "18px",
    BORDER_RADIUS: "24px",
    LENGTH_LIMIT: 392,
    PDF_SETTINGS: {
        PAGE_ORIENTATION: 'p'
    },
    TOP: 249,
    DEVICE_IMAGES: {
        DATE_TIME: {
            SRC: iPhoneDateTime,
            STYLE: {
                height: "120px",
                top: "66px"
            }
        },
        DEVICE_MOCK: {
            SRC: iPhoneImage,
            STYLE: {
                height: "770px"
            }
        }
    },
}

export const iPadSettingsConstants: DeveloperSettings = {
    ASPECT_RATIO: 199 / 139,
    HEIGHT: "610px",
    WATERMARK_POSITION: "10px",
    BORDER_RADIUS: "24px",
    LENGTH_LIMIT: 405,
    PDF_SETTINGS: {
        PAGE_ORIENTATION: 'l'
    },
    TOP: 170,
    DEVICE_IMAGES: {
        DATE_TIME: {
            SRC: iPhoneDateTime,
            STYLE: {
                height: "110px",
                top: "68px"
            }
        },
        DEVICE_MOCK: {
            SRC: iPadImage,
            STYLE: {
                height: "729px"
            }
        }
    }
}

export const letterSettingsConstants: DeveloperSettings = {
    ASPECT_RATIO: 8.5 / 11,
    HEIGHT: "800px",
    WATERMARK_POSITION: "14px",
    BORDER_RADIUS: "10px",
    LENGTH_LIMIT: 686,
    PDF_SETTINGS: {
        PAGE_ORIENTATION: 'p'
    },
}

export const a4SettingsConstants: DeveloperSettings = {
    ASPECT_RATIO: 210 / 297,
    HEIGHT: "880px",
    WATERMARK_POSITION: "14px",
    BORDER_RADIUS: "10px",
    LENGTH_LIMIT: 784,
    PDF_SETTINGS: {
        PAGE_ORIENTATION: 'p'
    },
}