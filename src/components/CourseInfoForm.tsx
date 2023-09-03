import React, { useState, useContext } from "react";
import { courseInfo, meetingTime, generateEmptyMeetingTime } from "../data/course.model";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button"
import MeetingTimeForm from "./MeetingTimeForm";
import CourseInfoFormCSS from "../assets/courseInfoForm.module.css"
import { useCollapseContext } from "../context/collapseContext";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SettingsContext } from "../context/settingsContext";
import Alert from "@mui/material/Alert"
import { type } from "@testing-library/user-event/dist/type";


export default function CourseInfoForm(props: courseInfo) {
    const timetableSettings = useContext(SettingsContext)
    const { collapse, setCollapse } = useCollapseContext();
    const id = props.id;
    const [courseCode, setCourseCode] = useState<string>(props.courseCode);
    const [backgroundColor, setBackgroundColor] = useState<string>(props.backgroundColour);
    const [meetingTimeSchedules, setMeetingTimeSchedules] = useState<Array<meetingTime>>(props.meetingTimes)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const existed = props.existed;

    function handleCourseCodeChange(event: React.ChangeEvent<HTMLInputElement>) {
        setCourseCode(event.target.value)
    }

    function handleBackgroundColorChange(event: React.ChangeEvent<HTMLInputElement>) {
        setBackgroundColor(event.target.value)
    }

    const handleMeetingTimeSchedulesChange = (index: number, meetingTime: meetingTime) => {
        setMeetingTimeSchedules((prev) => {
            const updatedMeetingTime = [...prev]
            updatedMeetingTime[index] = meetingTime
            return updatedMeetingTime
        })
    };

    function handleRemoveMeetingTime(index: number) {
        setMeetingTimeSchedules(prev => {
            const newMeetingTimeSchedules = [...prev]
            newMeetingTimeSchedules.splice(index, 1)
            return newMeetingTimeSchedules
        })
    }

    function handleAddMeetingTime() {
        setMeetingTimeSchedules(prev => {
            const newMeetingTime = generateEmptyMeetingTime(timetableSettings.daysRange);
            return [...prev, newMeetingTime]
        }
        )
    }

    function emptyData() {
        setCourseCode("");
        setBackgroundColor("");
        const emptyMeetingTime = generateEmptyMeetingTime(timetableSettings.daysRange)
        setMeetingTimeSchedules([emptyMeetingTime])
    }

    function handleRemoveCourse() {
        let coursesInfoJSON = [];

        const coursesInfo = localStorage.getItem("coursesInfo");

        if (coursesInfo != null) {
            coursesInfoJSON = JSON.parse(coursesInfo);
        }


        const index = coursesInfoJSON.findIndex((oldCourse: courseInfo) => oldCourse.id === id)
        coursesInfoJSON.splice(index, 1)

        localStorage.setItem("coursesInfo", JSON.stringify(coursesInfoJSON))
        window.dispatchEvent(new Event('storage'))

    }

    function meetingTimesTimeCheck(meetingTimes: meetingTime[]) {

        for (const meetingTime of meetingTimes) {


            if (meetingTime.startTime < timetableSettings.startTime) {
                setErrorMessage("Course start time is earlier than timetable start time")
                return true
            }

            if (meetingTime.startTime > meetingTime.endTime) {
                setErrorMessage("Course start time is earlier than course end time")
                return true
            }

            if (meetingTime.startTime > timetableSettings.endTime) {
                setErrorMessage("Course start time is later than timetable end time")
                return true
            }

            if (meetingTime.endTime > timetableSettings.endTime) {
                setErrorMessage("Course end time is later than timetable end time")
                return true
            }

            if (meetingTime.endTime < timetableSettings.startTime) {
                setErrorMessage("Course end time is earlier than timetable start time")
                return true
            }

            if (meetingTime.startTime.isSame(meetingTime.endTime)) {
                setErrorMessage("Course start time is equal to course end time")
                return true
            }
        }

    }

    function handleSubmit() {
        const error = meetingTimesTimeCheck(meetingTimeSchedules)

        if (error) {
            return
        }

        const course: courseInfo = {
            id: id,
            courseCode: courseCode,
            backgroundColour: backgroundColor,
            meetingTimes: meetingTimeSchedules,
            existed: existed
        }

        let coursesInfoJSON = [];

        const coursesInfo = localStorage.getItem("coursesInfo");

        if (coursesInfo != null) {
            coursesInfoJSON = JSON.parse(coursesInfo);


            if (existed) {
                const index = coursesInfoJSON.findIndex((oldCourse: courseInfo) => oldCourse.id === id)
                coursesInfoJSON[index] = Object.assign({}, coursesInfoJSON[index], course)

            } else {
                coursesInfoJSON.push(course)
            }
        } else {
            coursesInfoJSON.push(course)
        }


        console.log(coursesInfoJSON)
        localStorage.setItem("coursesInfo", JSON.stringify(coursesInfoJSON))
        window.dispatchEvent(new Event('storage'))

        // if add event 

        emptyData()

        setCollapse(true)

    }

    return (
        <>
            <div className={`${CourseInfoFormCSS.center} ${CourseInfoFormCSS.div}`}>
                {errorMessage && <Alert severity="error" onClose={() => { setErrorMessage("") }}>{errorMessage}</Alert>}

                <TextField label="Course Code" onChange={handleCourseCodeChange} value={courseCode} required></TextField>
                <Stack direction="row">

                    <label><Typography variant="body1">Background Color </Typography></label> <input type="color" className={CourseInfoFormCSS.colorSelector} value={backgroundColor} onChange={handleBackgroundColorChange} />
                </Stack>

                {meetingTimeSchedules.map((meetingTime, index) => (
                    <MeetingTimeForm
                        key={index} // Add a key prop for each rendered element in the array
                        id={index}
                        meetingTime={meetingTime}
                        handleRemoveMeetingTime={() => handleRemoveMeetingTime(index)}
                        handleMeetingTimeSchedulesChange={(updatedMeetingTime: meetingTime) => handleMeetingTimeSchedulesChange(index, updatedMeetingTime)}
                    />
                ))}

                <Button variant='outlined' color="info" onClick={handleAddMeetingTime}>Add Another Meeting Time</Button>

                {existed && <Button color="error" variant="outlined" onClick={handleRemoveCourse}>Remove Course</Button>}

                <Button type="submit" variant="outlined" color="info" onClick={handleSubmit}>Submit</Button>
            </div>
        </>
    )
}
