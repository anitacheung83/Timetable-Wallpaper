import React, { useEffect, useState } from "react";
import CourseGrid, { CourseGridProps } from "./CourseGrid";
import { meetingTime } from "../data/course.model";
import { courseInfo } from "../data/course.model";
import { generateCourseGridProps } from "../utils/formatTimetable";

export default function CourseGridRender() {

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
        console.log("Local storage changed!");
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
            {/* <table>
                <tr>
                    <td>
                        Null
                    </td>
                    <td style={{ position: "relative", width: "49px", height: "216px" }} rowSpan={3}>

                        <CourseGrid courseCode="CSC209" backgroundColor="123456" format="Lecture" location="BA 1889" startHour={9} startMinute={0} endHour={11} endMinute={0} height={2} position="top" />

                        <CourseGrid courseCode="CSC239" backgroundColor="123456" format="Lecture" location="BA 1889" startHour={11} startMinute={0} endHour={1} endMinute={0} height={1} position="bottom" />

                    </td>
                    <td>
                        Null
                    </td>
                </tr>
                <tr>
                    <td>Null</td>
                    <td>Null</td>
                </tr>

                <tr>
                    <td>Null</td>
                    <td>Null</td>
                </tr>

            </table> */}


            I am Course Grid Render
            {coursesData.map((course: courseInfo) => {
                return course.meetingTimes.map((meetingTime: meetingTime) => {
                    const courseGridProps = generateCourseGridProps(course.courseCode, course.backgroundColour, meetingTime)
                    return <CourseGrid {...courseGridProps} />
                })
            })}

        </>
    )

}