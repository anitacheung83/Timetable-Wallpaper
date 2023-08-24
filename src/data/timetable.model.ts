
import TimetableTd, { timetableTdProps } from "../components/TimetableTd"
import { days } from "./course.model"
import React from "react"


export interface timetableTdInsertion {
    // timetableTd: React.FunctionComponent<timetableTdProps>,
    timetableTdProps: null | timetableTdProps
}

export interface timetableHours {
    6?: null | timetableTdInsertion,
    7?: null | timetableTdInsertion,
    8?: null | timetableTdInsertion,
    9?: null | timetableTdInsertion,
    10?: null | timetableTdInsertion,
    11?: null | timetableTdInsertion,
    12?: null | timetableTdInsertion,
    13?: null | timetableTdInsertion,
    14?: null | timetableTdInsertion,
    15?: null | timetableTdInsertion,
    16?: null | timetableTdInsertion,
    17?: null | timetableTdInsertion,
    18?: null | timetableTdInsertion,
    19?: null | timetableTdInsertion,
    20?: null | timetableTdInsertion,
    21?: null | timetableTdInsertion,
    22?: null | timetableTdInsertion,
    23?: null | timetableTdInsertion,

}

export interface timetableInfos {
    mon?: timetableHours,
    tue?: timetableHours,
    wed?: timetableHours,
    thu?: timetableHours,
    fri?: timetableHours,
    sat?: timetableHours,
    sun?: timetableHours

}

export const emptyTimetableTdProps: timetableTdProps = {
    rowspan: 0,
    courseGridProps: []
}

const emptyTimetableTdInsertion: timetableTdInsertion = {
    timetableTdProps: null
}

// Define an empty timetableHours object with empty timetableHour for each hour
// Create a function to generate empty timetable hours
function generateEmptyTimetableHours() {
    return {
        9: { ...emptyTimetableTdInsertion },
        10: { ...emptyTimetableTdInsertion },
        11: { ...emptyTimetableTdInsertion },
        12: { ...emptyTimetableTdInsertion },
        13: { ...emptyTimetableTdInsertion },
        14: { ...emptyTimetableTdInsertion },
        15: { ...emptyTimetableTdInsertion },
        16: { ...emptyTimetableTdInsertion },
        17: { ...emptyTimetableTdInsertion },
        18: { ...emptyTimetableTdInsertion },
        // 19: { ...emptyTimetableTdInsertion },
        // 20: { ...emptyTimetableTdInsertion },
        // 21: { ...emptyTimetableTdInsertion },
        // 22: { ...emptyTimetableTdInsertion },
        // 23: { ...emptyTimetableTdInsertion },
    };
}

// Define an empty timetableInfos object with unique empty timetableHours for each day

export function generateEmptyTimetableInfos(selectedDays: days) {
    const emptyTimetableInfos = {} as Record<keyof days, timetableHours>;

    if (selectedDays.mon) {
        emptyTimetableInfos.mon = generateEmptyTimetableHours();
    }
    if (selectedDays.tue) {
        emptyTimetableInfos.tue = generateEmptyTimetableHours();
    }
    if (selectedDays.wed) {
        emptyTimetableInfos.wed = generateEmptyTimetableHours();
    }
    if (selectedDays.thu) {
        emptyTimetableInfos.thu = generateEmptyTimetableHours();
    }
    if (selectedDays.fri) {
        emptyTimetableInfos.fri = generateEmptyTimetableHours();
    }
    if (selectedDays.sat) {
        emptyTimetableInfos.sat = generateEmptyTimetableHours();
    }
    if (selectedDays.sun) {
        emptyTimetableInfos.sun = generateEmptyTimetableHours();
    }

    return emptyTimetableInfos;

};
