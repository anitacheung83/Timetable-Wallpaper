interface DateTimeImageSrc {
    WHITE: string,
    BLACK: string
}

interface DateTimeImageStyle {
    height: string,
    top: string
}

interface DateTimeImage {
    SRC: DateTimeImageSrc,
    STYLE: DateTimeImageStyle,
}

interface DeviceMockImageStyle {
    height: string
    marginTop?: string
}

interface DeviceMockImage {
    SRC: string,
    STYLE: DeviceMockImageStyle
}

interface DeviceImages {
    DATE_TIME: DateTimeImage,
    DEVICE_MOCK: DeviceMockImage
}

export default interface DeveloperSettings {
    ASPECT_RATIO: number
    //Height DOES NOT include device mock
    HEIGHT: string
    // Width includes device mock
    WIDTH: number
    WATERMARK_POSITION: string
    BORDER_RADIUS: string
    LENGTH_LIMIT: number;
    PDF_SETTINGS: {
        PAGE_ORIENTATION: 'p' | 'l'
    }
    TOP: number;
    SCALE: {
        phone: number,
        tablet: number
    }
    DEVICE_IMAGES?: DeviceImages
}