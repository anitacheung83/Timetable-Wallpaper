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
    startTime: Dayjs,
    endTime: Dayjs,
    backgroundColor: string,
    headerColor: string,
    textColor: string,
    courseGridWidth: number,
    courseGridHeight: number,
    clockType: '12 Hour' | '24 Hour',
    displayTime: boolean,
    widgets: boolean,
}

