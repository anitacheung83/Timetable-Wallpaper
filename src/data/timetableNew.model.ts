import { timetableTdProps } from "../components/TimetableTd/TimetableTd"

export interface timetableTdInsertionNew {
    timetableTd: React.FunctionComponent<timetableTdProps>,
    timetableTdProps?: timetableTdProps
}

export interface timetableDayNew {
    mon: null | timetableTdInsertionNew,
    tue: null | timetableTdInsertionNew,
    wed: null | timetableTdInsertionNew,
    thu: null | timetableTdInsertionNew,
    fri: null | timetableTdInsertionNew,
}

export interface timetableInfosNew {
    6?: timetableDayNew,
    8?: timetableDayNew,
    7?: timetableDayNew,
    9?: timetableDayNew,
    10?: timetableDayNew,
    11?: timetableDayNew,
    12?: timetableDayNew,
    13?: timetableDayNew,
    14?: timetableDayNew,
    15?: timetableDayNew,
    16?: timetableDayNew,
    17?: timetableDayNew,
    18?: timetableDayNew,
    19?: timetableDayNew,
    20?: timetableDayNew,
    21?: timetableDayNew,
    22?: timetableDayNew,
    23?: timetableDayNew,
}


