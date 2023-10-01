import React, { useState, useCallback } from "react";
import { courseInfo, meetingTime, generateEmptyMeetingTime } from "../../../data/course.model";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button"
import MeetingTimeForm from "../MeetingTimeForm/MeetingTimeForm";
import CourseInfoFormCSS from "./courseInfoForm.module.css"
import { useCollapseContext } from "../../../context/collapseContext";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert"
// import { useDispatch } from "react-redux";
import { coursesActions } from "../../../store/courses-slice";
import { getTimetable } from "../../../store/timetable-action";
import { RootState, useDispatch } from "../../../store/index"
import { useSelector } from "react-redux";


export default function CourseInfoForm(props: courseInfo) {
    const dispatch = useDispatch()
    const daysRange = useSelector((state: RootState) => state.settings.daysRange)
    const startTime = useSelector((state: RootState) => state.settings.startTime)
    const endTime = useSelector((state: RootState) => state.settings.endTime)
    const { setCollapse } = useCollapseContext();
    const id = props.id;
    const [courseCode, setCourseCode] = useState<string>(props.courseCode);
    const [backgroundColor, setBackgroundColor] = useState<string>(props.backgroundColour);
    const [meetingTimeSchedules, setMeetingTimeSchedules] = useState<Array<meetingTime>>(props.meetingTimes)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const existed = props.existed;

    // console.log("CourseInfoRender")

    function handleCourseCodeChange(event: React.ChangeEvent<HTMLInputElement>) {

        setCourseCode(event.target.value)
    }

    function handleBackgroundColorChange(event: React.ChangeEvent<HTMLInputElement>) {
        // console.log("BackgroundColor Render")
        setBackgroundColor(event.target.value)
    }

    const handleMeetingTimeSchedulesChange = useCallback((index: number, meetingTime: meetingTime) => {
        // console.log("Handle MeetingTime Render")
        setMeetingTimeSchedules((prev) => {
            const updatedMeetingTime = [...prev]
            updatedMeetingTime[index] = meetingTime
            return updatedMeetingTime
        })
    }, []);


    const handleRemoveMeetingTime = useCallback((index: number) => {
        setMeetingTimeSchedules(prev => {
            const newMeetingTimeSchedules = [...prev]
            newMeetingTimeSchedules.splice(index, 1)
            return newMeetingTimeSchedules
        })
    }, []);


    function handleAddMeetingTime() {
        console.log("Add MeetingTime Render")
        setMeetingTimeSchedules(prev => {
            const newMeetingTime = generateEmptyMeetingTime(daysRange);
            return [...prev, newMeetingTime]
        }
        )
    }

    function emptyData() {
        setCourseCode("");
        setBackgroundColor("");
        const emptyMeetingTime = generateEmptyMeetingTime(daysRange)
        setMeetingTimeSchedules([emptyMeetingTime])
    }

    function handleRemoveCourse() {
        dispatch(coursesActions.removeCourse(id))
        dispatch(getTimetable())
    }

    function formCheck(meetingTimes: meetingTime[]) {

        if (courseCode === "") {
            setErrorMessage("Course Code must not be empty")
        }

        if (backgroundColor === "") {
            setErrorMessage("Background color must not be empty ")
        }

        for (const meetingTime of meetingTimes) {

            if (meetingTime.startTime < startTime) {
                setErrorMessage("Course start time is earlier than timetable start time")
                return true
            }

            if (meetingTime.startTime > meetingTime.endTime) {
                setErrorMessage("Course start time is earlier than course end time")
                return true
            }

            if (meetingTime.startTime > endTime) {
                setErrorMessage("Course start time is later than timetable end time")
                return true
            }

            if (meetingTime.endTime > endTime) {
                setErrorMessage("Course end time is later than timetable end time")
                return true
            }

            if (meetingTime.endTime < startTime) {
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
        const error = formCheck(meetingTimeSchedules)
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

        dispatch(coursesActions.addCourse(course))
        dispatch(getTimetable())
        emptyData()
        setCollapse(true)
    }

    return (
        <>
            <div className={`${CourseInfoFormCSS.center} ${CourseInfoFormCSS.div}`} style={{ boxShadow: `2px 2px 20px ${backgroundColor}, -2px 2px 20px ${backgroundColor}` }}>
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
                        handleRemoveMeetingTime={handleRemoveMeetingTime}
                        handleMeetingTimeSchedulesChange={handleMeetingTimeSchedulesChange}
                    />
                ))}

                <Button variant='outlined' color="info" onClick={handleAddMeetingTime}>Add Another Meeting Time</Button>

                {existed && <Button color="error" variant="outlined" onClick={handleRemoveCourse}>Remove Course</Button>}

                <Button type="submit" variant="outlined" color="info" onClick={handleSubmit}>Submit</Button>
            </div>
        </>
    )
}
