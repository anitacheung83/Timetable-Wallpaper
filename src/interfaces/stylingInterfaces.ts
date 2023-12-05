import { Dayjs } from "dayjs";

export interface StylingState {
    title: string,
    startTime: Dayjs,
    endTime: Dayjs,
    backgroundColor: string,
    headerColor: string,
    clockType: '12 Hour' | '24 Hour',
    displayTime: boolean
}