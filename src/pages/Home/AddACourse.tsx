import React from "react";
import CourseInfoForm from "../../components/CourseInfoForm/CourseInfoForm";
import { generateEmptyMeetingTime } from "../../data/course.model";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function AddACourse() {
    const daysRange = useSelector((state: RootState) => state.settings.daysRange)

    //generate unique id here
    function uniqueId() {
        return v4()
    }

    return (
        <>
            <CourseInfoForm id={uniqueId()} courseCode="" backgroundColour="#CEC3AB" meetingTimes={[generateEmptyMeetingTime(daysRange)]} existed={false} />
        </>
    )
}