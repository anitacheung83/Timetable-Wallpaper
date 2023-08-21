import React, { useEffect, useState } from "react";
import { courseInfo } from "../data/course.model";
import CourseInfoForm from "./CourseInfoForm";
import Collapsible from "./Collapsible";
import EditIcon from '@mui/icons-material/Edit';

export default function CourseList() {

    // Pull data from local storage

    const [coursesData, setCoursesData] = useState(getCoursesData())


    function getCoursesData() {
        let newCoursesData = [];

        const localCoursesData = localStorage.getItem("coursesInfo");

        if (localCoursesData != null) {
            newCoursesData = JSON.parse(localCoursesData)
        }

        return newCoursesData

    }

    useEffect(() => {
        const handleStorageChange = () => {
            const newCoursesData = getCoursesData();
            setCoursesData(newCoursesData);
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        }
    }, [])

    return (
        <>
            {
                coursesData.map((course: courseInfo) => {
                    return (
                        <Collapsible
                            key={course.id}
                            title={course.courseCode}
                            component={<CourseInfoForm key={course.id} id={course.id} courseCode={course.courseCode} backgroundColour={course.backgroundColour} meetingTimes={course.meetingTimes} existed={true} />}
                            icon={<EditIcon />}
                            backgroundColor={course.backgroundColour}
                        />)

                })}
        </>
    )
}