import { courseInfo, meetingTime } from "../data/course.model"
import { generateEmptyTimetableInfos, timetableHours, timetableInfos } from "../data/timetable.model"
import dayjs, { Dayjs } from "dayjs";
import { CourseGridInfos } from "../components/CourseGrid";
import { haveCourseGrid, timetableTdProps } from "../components/TimetableTd";
import { emptyTimetableTdProps } from "../data/timetable.model";
import { days } from "../data/course.model";
import { DaysRange } from "../context/settingsContext";

export function formatTimetableInfos(rawCoursesData: courseInfo[], daysRange: DaysRange, startTime: Dayjs, endTime: Dayjs, clockType: '12 Hour' | '24 Hour'): timetableInfos {

    let timetableInfos: timetableInfos = generateEmptyTimetableInfos(daysRange, startTime, endTime);

    const coursesData = castTimeToDayjs(rawCoursesData)

    for (const course of coursesData) {
        for (const meetingTime of course.meetingTimes) {
            for (const day in meetingTime.days) {
                if (meetingTime.days[day as keyof typeof meetingTime.days]) {
                    timetableInfos[day as keyof timetableInfos] = addMeetingTimeToDay(timetableInfos[day as keyof timetableInfos]!, meetingTime, course.courseCode, course.backgroundColour, clockType)
                }
            }
        }
    }

    return timetableInfos
}

function castTimeToDayjs(coursesData: courseInfo[]) {
    for (const course of coursesData) {
        for (const meetingTime of course.meetingTimes) {
            meetingTime.startTime = dayjs(meetingTime.startTime)
            meetingTime.endTime = dayjs(meetingTime.endTime)
        }
    }
    return coursesData

}


function addMeetingTimeToDay(timetableHours: timetableHours, meetingTime: meetingTime, courseCode: string, courseBackgroundColor: string, clockType: '12 Hour' | '24 Hour'): timetableHours {
    console.log(timetableHours)
    // Cast meetingTime.startTime.hour to number
    let hour = +meetingTime.startTime.hour()

    // FIND THE ASSOCIATING HOUR
    // If hour is null, then find previous hour that is not null
    if (timetableHours[hour as keyof timetableHours] === null) {
        hour = findNotNullHour(timetableHours, hour) //Should also go forward when necessary
    }

    const timetableStartTime = timetableHours[hour as keyof timetableHours] //made a copy

    if (!timetableStartTime) {
        console.log(timetableHours)
        console.log(hour)
        console.log(timetableStartTime)
        console.log(meetingTime)
        throw new Error("timetableStartTime is Null")
    }

    // GenerateTimetableTdProps, to be add to timetableInfos; timetableInfos -> timetableHours -> timetableHour -> timetableTdInsertion -> timetableTd & timetableTdProps
    // May need to Generate empty TD props
    // if (!timetableStartTime.timetableTdProps) {
    //     console.log(timetableStartTime)
    //     throw new Error("timetable is null")
    // }

    timetableStartTime.timetableTdProps = generateTimetableTdProps(timetableStartTime.timetableTdProps, courseCode, courseBackgroundColor, meetingTime, clockType)

    // console.log(timetableStartTime.timetableTdProps)

    if (!timetableStartTime.timetableTdProps.rowspan || !timetableStartTime.timetableTdProps.courseGridInfos) {
        throw new Error("timetableStartTime.timetableTdProps.rowspan is not defined")
    }

    // If rowspan > 1, reorganize the array
    if (timetableStartTime.timetableTdProps.rowspan > 1) {
        let toBeMove = timetableHours[(hour + 1) as keyof timetableHours]
        if (toBeMove && toBeMove.timetableTdProps && toBeMove.timetableTdProps.courseGridInfos) {
            const newCourseGridInfos = toBeMove.timetableTdProps.courseGridInfos //Bug here
            // console.log("New Course Grid Props", newcourseGridInfos)

            timetableStartTime.timetableTdProps.courseGridInfos.push(...newCourseGridInfos)
        }

        let nullHour = hour + 1
        let nullRow = timetableStartTime.timetableTdProps.rowspan
        while (nullRow > 1) {
            timetableHours[nullHour as keyof timetableHours] = null //Bug here
            nullHour += 1;
            nullRow -= 1;
        }
    }

    return timetableHours
}

function findNotNullHour(timetableHours: timetableHours, hour: number): number {

    // figure out whether to add to the previous hour or the after hour

    let newHour = hour

    while (!timetableHours[newHour as keyof timetableHours]) {
        // newHour += 1
        newHour -= 1
    }

    return newHour
}

export function generatecourseGridInfos(courseCode: string, courseBackgroundColor: string, meetingTime: meetingTime, clockType: '12 Hour' | '24 Hour'): CourseGridInfos {

    const courseGridInfos: CourseGridInfos = {
        courseCode: courseCode,
        backgroundColor: courseBackgroundColor,
        format: meetingTime.courseType,
        location: meetingTime.location,
        startTime: meetingTime.startTime,
        endTime: meetingTime.endTime,
        height: calculateCourseGridHeight(meetingTime),
        top: meetingTime.startTime.minute() / 60,
        bottom: (60 - meetingTime.endTime.minute()) / 60
    }



    return courseGridInfos

}

export function calculateCourseGridHeight(meetingTime: meetingTime) {

    return meetingTime.endTime.diff(meetingTime.startTime, 'hour', true)
}

function generateTimetableTdProps(oldTimetableTdProps: haveCourseGrid | null, courseCode: string, courseBackgroundColor: string, meetingTime: meetingTime, clockType: '12 Hour' | '24 Hour'): haveCourseGrid {
    const timetableTdProps = {
        rowspan: calculateRowSpan(oldTimetableTdProps, meetingTime),
        courseGridInfos: addcourseGridInfos(oldTimetableTdProps, courseCode, courseBackgroundColor, meetingTime, clockType)
    }

    return timetableTdProps

}

function calculateRowSpan(oldTimetableTdProps: haveCourseGrid | null, meetingTime: meetingTime): number {

    let rowspan = 0

    if (oldTimetableTdProps) {
        rowspan += oldTimetableTdProps.rowspan!
    }

    // let crossBorder = 

    // rowspan += Math.ceil(meetingTime.endTime.diff(meetingTime.startTime, 'hour', true))
    rowspan += Math.ceil(meetingTime.endTime.diff(meetingTime.startTime, 'hour', true) + (meetingTime.startTime.minute() / 60))

    return rowspan
}

function addcourseGridInfos(oldTimetableTdProps: haveCourseGrid | null, courseCode: string, courseBackgroundColor: string, meetingTime: meetingTime, clockType: '12 Hour' | '24 Hour'): CourseGridInfos[] {
    // console.log("This is oldTimetableTdProps", oldTimetableTdProps)
    const courseGridInfo = generatecourseGridInfos(courseCode, courseBackgroundColor, meetingTime, clockType)

    if (oldTimetableTdProps == null) {
        return [courseGridInfo]
    }

    if (!oldTimetableTdProps.courseGridInfos) {
        throw new Error("addcourseGridInfos(): oldTimetableTdProps.courseGrid is undefined")
    }

    else {
        oldTimetableTdProps.courseGridInfos.push(courseGridInfo)
        return oldTimetableTdProps.courseGridInfos
    }
    // let index = 0
    // let oldTimeVal = oldTimetableTdProps.courseGridInfos[index].startHour + oldTimetableTdProps.courseGridInfos[index].startMinute / 60
    // let newTimeVal = courseGridProp.startHour + courseGridProp.startMinute / 60
    // while (oldTimeVal < newTimeVal) {
    //     index++;
    //     oldTimeVal = oldTimetableTdProps.courseGridInfos[index].startHour + oldTimetableTdProps.courseGridInfos![index].startMinute / 60
    // }

    // oldTimetableTdProps.courseGridInfos.splice(index, 0, courseGridProp)

    // oldTimetableTdProps.courseGridInfos.push(courseGridProp)

    // return [courseGridProp]
}



