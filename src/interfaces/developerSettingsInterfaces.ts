
interface DateTimeImageStyle {
    height: string,
    top: string
}

interface DateTimeImage {
    SRC: string,
    STYLE: DateTimeImageStyle,
}

interface DeviceMockImageStyle {
    height: string
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
    HEIGHT: string
    WATERMARK_POSITION: string
    BORDER_RADIUS: string
    LENGTH_LIMIT: number;
    PDF_SETTINGS: {
        PAGE_ORIENTATION: 'p' | 'l'
    }
    DEVICE_IMAGES?: DeviceImages
    TOP?: number;
}