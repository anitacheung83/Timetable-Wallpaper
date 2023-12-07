import { courseInfo } from "../interfaces/coursesInterfaces";
import { Dayjs } from "dayjs";

export function removeCourseUpdateStartTimeEndTime(courseInfos: courseInfo[], defaultStartTime: Dayjs, defaultEndTime: Dayjs) {

    let newStartTime = defaultStartTime;
    let newEndTime = defaultEndTime;

    for (let courseInfo of courseInfos) {
        for (let meetingTime of courseInfo.meetingTimes) {
            if (meetingTime.startTime.isBefore(newStartTime)) {
                newStartTime = meetingTime.startTime;
            }
            if (meetingTime.endTime.isAfter(newEndTime)) {
                newEndTime = meetingTime.endTime;
            }
        }
    }

    return [newStartTime, newEndTime];
}