import { courseInfo, meetingTime } from "../interfaces/coursesInterfaces"
import { generateEmptyTimetableInfos, timetableHours, timetableInfos } from "../interfaces/timetableInterfaces"
import { Dayjs } from "dayjs";
import { CourseGridInfos } from "../components/Timetable/CourseGrid/CourseGrid";
import { haveCourseGrid } from "../components/Timetable/TimetableTd/TimetableTd";
import { DaysRange } from "../interfaces/settingsInterfaces";
import { Pages } from "../interfaces/pagesInterfaces"


export function calculateCourseGridHeight(displayStartTime: Dayjs, displayEndTime: Dayjs): number {

    return displayEndTime.diff(displayStartTime, 'hour', true)
}

/* generateTimetableTdProps Helper function
 */
function calculateRowSpan(courseGridInfos: CourseGridInfos[]): number {

    const startTime = courseGridInfos[0].displayStartTime;
    // console.log("startTime" + courseGridInfos[0].startTime.hour())
    // console.log("display startTime" + startTime.hour())
    const endTime = courseGridInfos[courseGridInfos.length - 1].displayEndTime
    // console.log("endTime" + courseGridInfos[courseGridInfos.length - 1].endTime.hour())
    // console.log("display endTime" + endTime.hour())
    const duration = endTime.diff(startTime, 'hour', true)

    const rowspan = Math.ceil(startTime.minute() / 60 + duration)

    return rowspan
}

/* generateTimetableTdProps Helper function
 */
export function generateCourseGridInfos(courseCode: string, courseBackgroundColor: string, meetingTime: meetingTime, displayStartTime: Dayjs, displayEndTime: Dayjs): CourseGridInfos {

    const courseGridInfos: CourseGridInfos = {
        courseCode: courseCode,
        backgroundColor: courseBackgroundColor,
        format: meetingTime.courseType,
        location: meetingTime.location,
        startTime: meetingTime.startTime,
        endTime: meetingTime.endTime,
        displayStartTime: displayStartTime,
        displayEndTime: displayEndTime,
        height: calculateCourseGridHeight(displayStartTime, displayEndTime)
    }
    // console.log("startTime" + courseGridInfos.startTime.hour())
    // console.log("displayTime" + displayStartTime.hour())
    // console.log("height" + courseGridInfos.height)

    return courseGridInfos
}


/* addMeetingTimeToDay Helper Function
 * Generate timetableTd props
 * @param oldTimetableTdProps
 * @param courseCode
 * @param courseBackgroundColor
 * @param meetingTime
 * @param clockType 
 */
function generateTimetableTdProps(oldTimetableTdProps: haveCourseGrid | null, courseCode: string, courseBackgroundColor: string, meetingTime: meetingTime, displayStartTime: Dayjs, displayEndTime: Dayjs): haveCourseGrid {
    const courseGridInfo = generateCourseGridInfos(courseCode, courseBackgroundColor, meetingTime, displayStartTime, displayEndTime)
    const courseGridInfos = !oldTimetableTdProps ? [courseGridInfo] : [...oldTimetableTdProps.courseGridInfos, courseGridInfo]
    const rowspan = calculateRowSpan(courseGridInfos)

    const timetableTdProps = {
        rowspan: rowspan,
        courseGridInfos: courseGridInfos
    }

    return timetableTdProps
}

/* addMeetingTimeToDay Helper Function
 * Find the previous hour that is not null in timetableHours
 * @param timetableHours
 * @param hour
 * @returns the previous hour that is not null in timetableHours
 */
function findNotNullHour(timetableHours: timetableHours, hour: number): number {

    let newHour = hour

    while (!timetableHours[newHour as keyof timetableHours]) {
        newHour -= 1
    }

    return newHour
}

/* formatTimetableInfos Helper Function
 * Return updated timetableHours with meetingTime
 * 
 * @param timetableHours:
 * @param meetingTime:
 * @param courseCode:
 * @param courseBackgroundColor
 * @param clockType
 * @returns coursesData: courses data with meetingTime.startTime and meetingTime.endTime in type Dayjs
*/
function addMeetingTimeToDay(timetableHours: timetableHours, meetingTime: meetingTime, courseCode: string, courseBackgroundColor: string, displayStartTime: Dayjs, displayEndTime: Dayjs): timetableHours {
    // Get the associating hour in timetableHours
    let hour = +displayStartTime.hour()

    // If hour is null, then find previous hour that is not null
    if (timetableHours[hour as keyof timetableHours] === null) {
        hour = findNotNullHour(timetableHours, hour) //Should also go forward when necessary
    }

    const timetableStartTime = timetableHours[hour as keyof timetableHours] //made a copy

    // Ensure that timetableStartTime is not null
    if (!timetableStartTime) {
        console.log("Course Code: " + JSON.stringify(courseCode))
        console.log("Days Selection: " + JSON.stringify(meetingTime.days))
        console.log("Meeting Start Time: " + meetingTime.startTime.hour())
        console.log("Meeting End Time: " + meetingTime.endTime.hour())
        return timetableHours
        // throw new Error(`timetableStartTime is null at hour ${hour}`)
    }

    timetableStartTime.timetableTdProps = generateTimetableTdProps(timetableStartTime.timetableTdProps, courseCode, courseBackgroundColor, meetingTime, displayStartTime, displayEndTime)

    if (!timetableStartTime.timetableTdProps.rowspan || !timetableStartTime.timetableTdProps.courseGridInfos) {
        // console.log("An error has occured:")
        // console.log("Course Code: " + JSON.stringify(courseCode))
        // console.log("Days Selection: " + JSON.stringify(meetingTime.days))
        // console.log("Meeting Start Time: " + meetingTime.startTime.hour())
        // console.log("Meeting End Time: " + meetingTime.endTime.hour())

        throw new Error("timetableStartTime.timetableTdProps.rowspan is not defined")
    }

    let rowspan = timetableStartTime.timetableTdProps.rowspan
    let recalculateRowspan = rowspan > 1 ? true : false
    let i = 1
    while (rowspan > 1) {
        let newCourseGridInfos = timetableHours[(hour + i) as keyof timetableHours]?.timetableTdProps?.courseGridInfos

        if (newCourseGridInfos) {
            timetableStartTime.timetableTdProps.courseGridInfos.push(...newCourseGridInfos)
        }
        timetableHours[(hour + i) as keyof timetableHours] = null
        rowspan -= 1
        i += 1
    }
    if (recalculateRowspan) {
        timetableStartTime.timetableTdProps.rowspan = calculateRowSpan(timetableStartTime.timetableTdProps.courseGridInfos)
    }

    return timetableHours
}

export function formatTimetableInfos(coursesData: courseInfo[], daysRange: DaysRange, startTime: Dayjs, endTime: Dayjs): timetableInfos {

    let timetableInfos: timetableInfos = generateEmptyTimetableInfos(daysRange, startTime, endTime);

    for (const course of coursesData) {
        for (const meetingTime of course.meetingTimes) {
            for (const day in meetingTime.days) {

                if (meetingTime.days[day as keyof typeof meetingTime.days] &&
                    timetableInfos[day as keyof timetableInfos]
                    // && meetingTime.startTime >= startTime 
                    // && meetingTime.endTime <= endTime
                ) {
                    // if (course.courseCode === "Course 4") {

                    //     console.log("Course " + course.courseCode)
                    //     console.log("start time " + startTime.hour())
                    //     console.log("end time " + endTime.hour())
                    //     console.log("meeting time start time " + meetingTime.startTime.hour())
                    //     console.log("meeting time end time " + meetingTime.endTime.hour())
                    // }
                    if (meetingTime.startTime > endTime || meetingTime.endTime <= startTime) {
                        // console.log("condition 1")
                        continue
                    }
                    else if (meetingTime.endTime > endTime.add(1, 'hour')) {
                        // console.log("condition 2")
                        // meetingTime.endTime = endTime
                        timetableInfos[day as keyof timetableInfos] = addMeetingTimeToDay(timetableInfos[day as keyof timetableInfos]!, meetingTime, course.courseCode, course.backgroundColour, meetingTime.startTime, endTime.add(1, 'hour'))
                    }
                    else if (meetingTime.startTime < startTime) {
                        // console.log("condition 3")
                        timetableInfos[day as keyof timetableInfos] = addMeetingTimeToDay(timetableInfos[day as keyof timetableInfos]!, meetingTime, course.courseCode, course.backgroundColour, startTime, meetingTime.endTime)
                    }
                    else {
                        // console.log("condition 4")
                        timetableInfos[day as keyof timetableInfos] = addMeetingTimeToDay(timetableInfos[day as keyof timetableInfos]!, meetingTime, course.courseCode, course.backgroundColour, meetingTime.startTime, meetingTime.endTime)
                    }

                }
            }
        }
    }

    return timetableInfos
}

export function generateTimetables(coursesData: courseInfo[], daysRange: DaysRange, pages: Pages[]): timetableInfos[] {
    let timetables: timetableInfos[] = []
    for (const page of pages) {
        // console.log("Page Start Time" + page.startTime.hour())
        // console.log("Page End Time" + page.endTime.hour())
        const TimetableInfos = formatTimetableInfos(coursesData, daysRange, page.startTime, page.endTime)
        timetables.push(TimetableInfos)
    }

    return timetables


}