import DeveloperSettings from '../interfaces/developerSettingsInterfaces'
import iPhoneDateTime from "../assets/iphoneDateTime.png"
import iPhoneImage from "../assets/iphone-14-lock-screen.png"
import iPadImage from "../assets/ipad-pro-13.png"
import iPhoneDateTimeWhite from "../assets/iPhoneDateTimeWhite.svg"
import iPhoneDateTimeBlack from "../assets/iPhoneDateTimeBlack.svg"

export const iPhoneSettingsConstants: DeveloperSettings = {
    ASPECT_RATIO: 9 / 19.5,
    HEIGHT: "699px",
    WIDTH: 404,
    WATERMARK_POSITION: "18px",
    BORDER_RADIUS: "24px",
    LENGTH_LIMIT: 460,
    PDF_SETTINGS: {
        PAGE_ORIENTATION: 'p'
    },
    TOP: 184,
    SCALE: {
        phone: 1,
        tablet: 1
    },
    DEVICE_IMAGES: {
        DATE_TIME: {
            SRC: {
                WHITE: iPhoneDateTimeWhite,
                BLACK: iPhoneDateTimeBlack

            },
            STYLE: {
                height: "120px",
                top: "66px"
            }
        },
        DEVICE_MOCK: {
            SRC: iPhoneImage,
            STYLE: {
                height: "778px",
            }
        }
    },
}

export const iPhoneWithWidgetsSettingsConstants: DeveloperSettings = {
    ASPECT_RATIO: 9 / 19.5,
    HEIGHT: "699px",
    WIDTH: 404,
    WATERMARK_POSITION: "18px",
    BORDER_RADIUS: "24px",
    LENGTH_LIMIT: 392,
    PDF_SETTINGS: {
        PAGE_ORIENTATION: 'p'
    },
    TOP: 249,
    SCALE: {
        phone: 1,
        tablet: 1
    },
    DEVICE_IMAGES: {
        DATE_TIME: {
            SRC: {
                WHITE: iPhoneDateTimeWhite,
                BLACK: iPhoneDateTimeBlack

            },
            STYLE: {
                height: "120px",
                top: "66px"
            }
        },
        DEVICE_MOCK: {
            SRC: iPhoneImage,
            STYLE: {
                height: "778px"
            }
        }
    },
}

export const iPadSettingsConstants: DeveloperSettings = {
    ASPECT_RATIO: 199 / 139,
    HEIGHT: "610px",
    WIDTH: 949,
    WATERMARK_POSITION: "10px",
    BORDER_RADIUS: "24px",
    LENGTH_LIMIT: 405,
    PDF_SETTINGS: {
        PAGE_ORIENTATION: 'l'
    },
    TOP: 170,
    SCALE: {
        phone: 0.45,
        tablet: 1
    },
    DEVICE_IMAGES: {
        DATE_TIME: {
            SRC: {
                WHITE: iPhoneDateTimeWhite,
                BLACK: iPhoneDateTimeBlack

            },
            STYLE: {
                height: "110px",
                top: "68px"
            }
        },
        DEVICE_MOCK: {
            SRC: iPadImage,
            STYLE: {
                height: "734px"
            }
        }
    }
}

export const letterSettingsConstants: DeveloperSettings = {
    ASPECT_RATIO: 8.5 / 11,
    HEIGHT: "800px",
    WIDTH: 640,
    WATERMARK_POSITION: "14px",
    BORDER_RADIUS: "10px",
    LENGTH_LIMIT: 706,
    TOP: 41,
    SCALE: {
        phone: 0.64,
        tablet: 1
    },
    PDF_SETTINGS: {
        PAGE_ORIENTATION: 'p'
    },
}

export const a4SettingsConstants: DeveloperSettings = {
    ASPECT_RATIO: 210 / 297,
    HEIGHT: "880px",
    WIDTH: 640,
    WATERMARK_POSITION: "14px",
    BORDER_RADIUS: "10px",
    LENGTH_LIMIT: 790,
    TOP: 49,
    SCALE: {
        phone: 0.64,
        tablet: 1
    },
    PDF_SETTINGS: {
        PAGE_ORIENTATION: 'p'
    },
}