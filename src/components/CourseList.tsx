import React from "react";
import { courseInfo } from "../data/course.model";
import CourseInfoForm from "./CourseInfoForm";
import Collapsible from "./Collapsible";
import EditIcon from '@mui/icons-material/Edit';

export default function CourseList() {
    // Pull data from local storage

    let coursesData = []

    const localCoursesData = localStorage.getItem("coursesInfo");

    if (localCoursesData != null) {
        coursesData = JSON.parse(localCoursesData)
    }

    return (
        <>
            {
                coursesData.map((course: courseInfo) => {
                    return (
                        <Collapsible
                            title={course.courseCode}
                            component={<CourseInfoForm id={course.id} courseCode={course.courseCode} backgroundColour={course.backgroundColour} meetingTimes={course.meetingTimes} />}
                            icon={<EditIcon />}
                        />)

                })}
        </>
    )
}