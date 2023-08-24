import { days } from "../data/course.model";
import dayjs, { Dayjs } from "dayjs";

export interface SettingProps {
    daysSelection: days,
    startTime: Dayjs,
    endTime: Dayjs,
    backgroundColor: string,
    courseGridWidth: number,
    courseGridHeight: number,
    clockType: '12 Hour' | '24 Hour',
}

const initialDays = {
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: false,
    sun: false
}

export const initialSetting: SettingProps = {
    daysSelection: initialDays,
    startTime: dayjs('2022-04-17T09:00'),
    endTime: dayjs('2022-04-17T18:00'),
    backgroundColor: "#E6DDC6",
    courseGridWidth: 49,
    courseGridHeight: 64,
    clockType: '24 Hour'
}
