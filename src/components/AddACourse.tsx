import React, { useContext } from "react";
import CourseInfoForm from "../components/CourseInfoForm";
import { generateEmptyMeetingTime } from "../data/course.model";
import { v4 } from "uuid";
import { SettingsContext } from "../context/settingsContext";
import Setting from "./Setting";

export default function AddACourse() {

    const timetableSettings = useContext(SettingsContext)

    //generate unique id here
    function uniqueId() {
        return v4()
    }

    return (
        <>
            <CourseInfoForm id={uniqueId()} courseCode="" backgroundColour="" meetingTimes={[generateEmptyMeetingTime(timetableSettings.daysRange)]} existed={false} />
        </>
    )
}