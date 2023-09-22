import { courseInfo, meetingTime } from "../data/course.model"
import { generateEmptyTimetableInfos, timetableHours, timetableInfos } from "../data/timetable.model"
import { Dayjs } from "dayjs";
import { CourseGridInfos } from "../components/CourseGrid/CourseGrid";
import { haveCourseGrid } from "../components/TimetableTd/TimetableTd";
import { DaysRange } from "../store/settings-slice";


export function calculateCourseGridHeight(meetingTime: meetingTime) {

    return meetingTime.endTime.diff(meetingTime.startTime, 'hour', true)
}

/* generateTimetableTdProps Helper function
 */
function calculateRowSpan(courseGridInfos: CourseGridInfos[]): number {

    const startTime = courseGridInfos[0].startTime;
    const endTime = courseGridInfos[courseGridInfos.length - 1].endTime
    const duration = endTime.diff(startTime, 'hour', true)

    const rowspan = Math.ceil(startTime.minute() / 60 + duration)

    return rowspan
}

/* generateTimetableTdProps Helper function
 */
export function generateCourseGridInfos(courseCode: string, courseBackgroundColor: string, meetingTime: meetingTime): CourseGridInfos {

    const courseGridInfos: CourseGridInfos = {
        courseCode: courseCode,
        backgroundColor: courseBackgroundColor,
        format: meetingTime.courseType,
        location: meetingTime.location,
        startTime: meetingTime.startTime,
        endTime: meetingTime.endTime,
        height: calculateCourseGridHeight(meetingTime)
    }

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
function generateTimetableTdProps(oldTimetableTdProps: haveCourseGrid | null, courseCode: string, courseBackgroundColor: string, meetingTime: meetingTime): haveCourseGrid {
    const courseGridInfo = generateCourseGridInfos(courseCode, courseBackgroundColor, meetingTime)
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
function addMeetingTimeToDay(timetableHours: timetableHours, meetingTime: meetingTime, courseCode: string, courseBackgroundColor: string): timetableHours {
    // Get the associating hour in timetableHours
    let hour = +meetingTime.startTime.hour()

    // If hour is null, then find previous hour that is not null
    if (timetableHours[hour as keyof timetableHours] === null) {
        hour = findNotNullHour(timetableHours, hour) //Should also go forward when necessary
    }

    const timetableStartTime = timetableHours[hour as keyof timetableHours] //made a copy

    // Ensure that timetableStartTime is not null
    if (!timetableStartTime) {
        throw new Error("timetableStartTime is Null")
    }

    timetableStartTime.timetableTdProps = generateTimetableTdProps(timetableStartTime.timetableTdProps, courseCode, courseBackgroundColor, meetingTime)

    if (!timetableStartTime.timetableTdProps.rowspan || !timetableStartTime.timetableTdProps.courseGridInfos) {
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
                    timetableInfos[day as keyof timetableInfos] &&
                    meetingTime.startTime >= startTime &&
                    meetingTime.endTime <= endTime) {
                    timetableInfos[day as keyof timetableInfos] = addMeetingTimeToDay(timetableInfos[day as keyof timetableInfos]!, meetingTime, course.courseCode, course.backgroundColour)
                }
            }
        }
    }

    return timetableInfos
}





