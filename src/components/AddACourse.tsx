import React from "react";
import CourseInfoForm from "../components/CourseInfoForm";
import { emptyMeetingTime } from "../data/course.model";
import { v4 } from "uuid";

export default function AddACourse() {

    //generate unique id here
    function uniqueId() {
        return v4()
    }

    return (
        <>
            <CourseInfoForm id={uniqueId()} courseCode="" backgroundColour="" meetingTimes={[emptyMeetingTime]} />
        </>
    )
}