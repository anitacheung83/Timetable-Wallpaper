import { courseInfo, meetingTime } from "../data/course.model"
import { generateEmptyTimetableInfos, timetableHours, timetableInfos } from "../data/timetable.model"
import dayjs, { Dayjs } from "dayjs";
import { CourseGridProps } from "../components/CourseGrid";
import { timetableTdProps } from "../components/TimetableTd";
import { emptyTimetableTdProps } from "../data/timetable.model";
import { days } from "../data/course.model";

export function formatTimetableInfos(coursesData: courseInfo[]): timetableInfos {
    const selectedDays = { mon: true, tue: true, wed: true, thu: true, fri: true }
    let timetableInfos: timetableInfos = generateEmptyTimetableInfos(selectedDays);

    for (const course of coursesData) {
        for (const meetingTime of course.meetingTimes) {
            for (const day in meetingTime.days) {
                if (meetingTime.days[day as keyof typeof meetingTime.days]) {
                    timetableInfos[day as keyof timetableInfos] = addMeetingTimeToDay(timetableInfos[day as keyof timetableInfos]!, meetingTime, course.courseCode, course.backgroundColour)
                }
            }
        }
    }

    return timetableInfos
}


function addMeetingTimeToDay(timetableHours: timetableHours, meetingTime: meetingTime, courseCode: string, courseBackgroundColor: string): timetableHours {
    // CASTING
    // Cast meetingTime.startTime and meetingTime.endTime to dayjs
    meetingTime.startTime = dayjs(meetingTime.startTime)
    meetingTime.endTime = dayjs(meetingTime.endTime)

    // Cast meetingTime.startTime.hour to number
    let hour = +meetingTime.startTime.hour()

    // FIND THE ASSOCIATING HOUR
    // If hour is null, then find previous hour that is not null
    if (timetableHours[hour as keyof timetableHours] === null) {
        hour = findNotNullHour(timetableHours, hour)
    }

    const timetableStartTime = timetableHours[hour as keyof timetableHours] //made a copy

    if (!timetableStartTime) {
        throw new Error("timetableStartTime is Null")
    }

    // GenerateTimetableTdProps, to be add to timetableInfos; timetableInfos -> timetableHours -> timetableHour -> timetableTdInsertion -> timetableTd & timetableTdProps
    // May need to Generate empty TD props

    timetableStartTime.timetableTdProps = generateTimetableTdProps(timetableStartTime.timetableTdProps, courseCode, courseBackgroundColor, meetingTime)

    // console.log(timetableStartTime.timetableTdProps)

    if (!timetableStartTime.timetableTdProps.rowspan || !timetableStartTime.timetableTdProps.courseGridProps) {
        throw new Error("timetableStartTime.timetableTdProps.rowspan is not defined")
    }

    // If rowspan > 1, reorganize the array
    if (timetableStartTime.timetableTdProps.rowspan > 1) {
        let toBeMove = timetableHours[(hour + 1) as keyof timetableHours]
        if (toBeMove && toBeMove.timetableTdProps && toBeMove.timetableTdProps.courseGridProps) {
            const newCourseGridProps = toBeMove.timetableTdProps.courseGridProps //Bug here
            // console.log("New Course Grid Props", newCourseGridProps)

            timetableStartTime.timetableTdProps.courseGridProps.push(...newCourseGridProps)
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

    let newHour = hour

    while (!timetableHours[newHour as keyof timetableHours]) {
        newHour += 1
    }

    return newHour
}

export function generateCourseGridProps(courseCode: string, courseBackgroundColor: string, meetingTime: meetingTime): CourseGridProps {
    // console.log("meetingTime:", meetingTime); // Debugging line
    meetingTime.startTime = dayjs(meetingTime.startTime)
    meetingTime.endTime = dayjs(meetingTime.endTime)

    const courseGridProps: CourseGridProps = {
        courseCode: courseCode,
        backgroundColor: courseBackgroundColor,
        format: meetingTime.courseType,
        location: meetingTime.location,
        startHour: meetingTime.startTime.hour(),
        startMinute: meetingTime.startTime.minute(),
        endHour: meetingTime.endTime.hour(),
        endMinute: meetingTime.endTime.minute(),
        height: calculateCourseGridHeight(meetingTime)
    }

    return courseGridProps

}

export function calculateCourseGridHeight(meetingTime: meetingTime) {

    return meetingTime.endTime.diff(meetingTime.startTime, 'hour', true)
}

function generateTimetableTdProps(oldTimetableTdProps: timetableTdProps | null, courseCode: string, courseBackgroundColor: string, meetingTime: meetingTime): timetableTdProps {
    const timetableTdProps = {
        rowspan: calculateRowSpan(oldTimetableTdProps, meetingTime),
        courseGridProps: addCourseGridProps(oldTimetableTdProps, courseCode, courseBackgroundColor, meetingTime)
    }

    return timetableTdProps

}

function calculateRowSpan(oldTimetableTdProps: timetableTdProps | null, meetingTime: meetingTime): number {

    let rowspan = 0

    if (oldTimetableTdProps) {
        rowspan += oldTimetableTdProps.rowspan!
    }

    rowspan += Math.ceil(meetingTime.endTime.diff(meetingTime.startTime, 'hour', true))

    return rowspan
}

function addCourseGridProps(oldTimetableTdProps: timetableTdProps | null, courseCode: string, courseBackgroundColor: string, meetingTime: meetingTime): CourseGridProps[] {
    // console.log("This is oldTimetableTdProps", oldTimetableTdProps)
    const courseGridProp = generateCourseGridProps(courseCode, courseBackgroundColor, meetingTime)

    if (oldTimetableTdProps == null) {
        return [courseGridProp]
    }

    if (!oldTimetableTdProps.courseGridProps) {
        throw new Error("addCourseGridProps(): oldTimetableTdProps.courseGrid is undefined")
    }
    // let index = 0
    // let oldTimeVal = oldTimetableTdProps.courseGridProps[index].startHour + oldTimetableTdProps.courseGridProps[index].startMinute / 60
    // let newTimeVal = courseGridProp.startHour + courseGridProp.startMinute / 60
    // while (oldTimeVal < newTimeVal) {
    //     index++;
    //     oldTimeVal = oldTimetableTdProps.courseGridProps[index].startHour + oldTimetableTdProps.courseGridProps![index].startMinute / 60
    // }

    // oldTimetableTdProps.courseGridProps.splice(index, 0, courseGridProp)

    // oldTimetableTdProps.courseGridProps.push(courseGridProp)

    return [courseGridProp]
}



