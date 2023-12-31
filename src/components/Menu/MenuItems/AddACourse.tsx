import React from "react";
import CourseInfoForm from "../Inputs/CourseInfoForm/CourseInfoForm";
import { generateEmptyMeetingTime } from "../../../interfaces/coursesInterfaces";
import { v4 } from "uuid";

export default function AddACourse() {

    //generate unique id here
    function uniqueId() {
        return v4()
    }

    return (
        <>
            <CourseInfoForm id={uniqueId()} courseCode="" backgroundColour="" meetingTimes={[generateEmptyMeetingTime()]} existed={false} />
        </>
    )
}