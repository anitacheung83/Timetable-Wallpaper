import React, { useState, useContext } from "react";
import { courseInfo, meetingTime, emptyMeetingTime } from "../data/course.model";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button"
import MeetingTimeForm from "./MeetingTimeForm";
import CourseInfoFormCSS from "../assets/courseInfoForm.module.css"
import { useCollapseContext } from "../context/collapseContext";


export default function CourseInfoForm(props: courseInfo) {
    const { collapse, setCollapse } = useCollapseContext();
    const id = props.id;
    const [courseCode, setCourseCode] = useState<string>(props.courseCode);
    const [backgroundColour, setBackgroundColour] = useState<string>(props.backgroundColour);
    const [meetingTimeSchedules, setMeetingTimeSchedules] = useState<Array<meetingTime>>(props.meetingTimes)
    const existed = true;

    function handleCourseCodeChange(event: React.ChangeEvent<HTMLInputElement>) {
        setCourseCode(event.target.value)
    }

    function handleBackgroundColorChange(event: React.ChangeEvent<HTMLInputElement>) {
        setBackgroundColour(event.target.value)
    }

    const handleMeetingTimeSchedulesChange = (index: number, meetingTime: meetingTime) => {
        setMeetingTimeSchedules((prev) => {
            const updatedMeetingTime = [...prev]
            updatedMeetingTime[index] = meetingTime
            return updatedMeetingTime
        })
    };

    const handleRemoveMeetingTime = (index: number) => {
        setMeetingTimeSchedules((prev) => {
            const newMeetingTimeSchedules = prev.splice(index, 1)
            return newMeetingTimeSchedules
        })
    }

    function handleAddMeetingTime() {
        setMeetingTimeSchedules(prev => {
            const newMeetingTime = emptyMeetingTime;
            return [...prev, newMeetingTime]
        }
        )
    }

    function emptyData() {
        setCourseCode("");
        setBackgroundColour("");
        setMeetingTimeSchedules([emptyMeetingTime])
    }

    function handleSubmit() {
        const course: courseInfo = {
            id: id,
            courseCode: courseCode,
            backgroundColour: backgroundColour,
            meetingTimes: meetingTimeSchedules
        }

        let coursesInfoJSON = [];

        const coursesInfo = localStorage.getItem("coursesInfo");

        if (coursesInfo != null) {
            coursesInfoJSON = JSON.parse(coursesInfo);
        }

        if (existed) {
            const index = coursesInfoJSON.findIndex((oldCourse: courseInfo) => oldCourse.id === id)
            coursesInfoJSON[index] = course //use Object.assign

        } else {
            coursesInfoJSON.push(course)
        }



        // if add course
        //      push
        // else
        //      update the array


        console.log(coursesInfoJSON)
        localStorage.setItem("coursesInfo", JSON.stringify(coursesInfoJSON))

        emptyData()

        console.log(meetingTimeSchedules)

        setCollapse(true)

        // clear data
        // close

    }

    return (
        <>
            <div className={`${CourseInfoFormCSS.center} ${CourseInfoFormCSS.div}`}>
                <TextField label="Course Code" onChange={handleCourseCodeChange} value={courseCode}></TextField>
                <input type="color" value={backgroundColour} onChange={handleBackgroundColorChange} /><label>Background Color</label>

                {meetingTimeSchedules.map((meetingTime, index) => (
                    <MeetingTimeForm
                        key={index} // Add a key prop for each rendered element in the array
                        id={index}
                        meetingTime={meetingTime}
                        handleRemoveMeetingTime={() => handleRemoveMeetingTime(index)}
                        handleMeetingTimeSchedulesChange={(updatedMeetingTime: meetingTime) => handleMeetingTimeSchedulesChange(index, updatedMeetingTime)}
                    />
                ))}

                <Button variant='outlined' onClick={handleAddMeetingTime}>Add Another Meeting Time</Button>

                <Button type="submit" variant="outlined" onClick={handleSubmit}>Submit</Button>
            </div>
        </>
    )
}
