import { Dayjs } from "dayjs";

export interface DaysRange {
    mon: boolean,
    tue: boolean,
    wed: boolean,
    thu: boolean,
    fri: boolean,
    sat: boolean,
    sun: boolean,
}

export interface TimetableSettings {
    device: 'iphone' | 'ipad' | 'letter' | 'a4',
    daysRange: DaysRange,
    courseGridWidth: number,
    courseGridHeight: number,
    widgets: boolean,
}

