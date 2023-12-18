import React, { useState, useCallback, useEffect } from "react";

// import context
import { useCollapseContext } from "../../../../context/collapseContext";

// import interfaces
import { courseInfo, meetingTime, generateEmptyMeetingTime } from "../../../../interfaces/coursesInterfaces";

// import MUI components
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert"

// import components
import MeetingTimeForm from "./MeetingTimeForm/MeetingTimeForm";

// import styles
import style from "./courseInfoForm.module.css"

// import redux
import { coursesActions } from "../../../../store/courses-slice";
import { getTimetable } from "../../../../store/timetable-action";
import { RootState, useDispatch } from "../../../../store/index"
import { useSelector } from "react-redux";
import { stylingActions } from "../../../../store/styling-slice";
import { getPages } from "../../../../store/pages-action";
import { themeActions } from "../../../../store/theme-slice";
import ColorRadioSelection from "../ColorSelector/ColorSelector";

import { getAvaliableColors } from "../../../../utils/stylingTheme";


export default function CourseInfoForm(props: courseInfo) {
    const dispatch = useDispatch()
    // get the collapse state and the setCollapse function from the context
    const { setCollapse } = useCollapseContext();
    // get the id of the course
    const id = props.id;
    // get the existed state of the course
    const existed = props.existed;
    // get the start time and end time from the redux store
    const settingsStartTime = useSelector((state: RootState) => state.styling.startTime)
    const settingsEndTime = useSelector((state: RootState) => state.styling.endTime)
    // state to keep track of the course code
    const [courseCode, setCourseCode] = useState<string>(props.courseCode);
    // state to keep track of the background color
    const [backgroundColor, setBackgroundColor] = useState<string>(props.backgroundColour);
    // state to keep track of the meeting time schedules
    const [meetingTimeSchedules, setMeetingTimeSchedules] = useState<Array<meetingTime>>(props.meetingTimes)
    // state to keep track of the error message
    const [errorMessage, setErrorMessage] = useState<string>('')

    const { COLORS, USED_COLORS } = useSelector((state: RootState) => state.theme)

    // console.log("Course Info Form Rendered")

    // Need to figure out how to optimize this
    useEffect(() => {
        if (backgroundColor === "") {
            const newColors = getAvaliableColors(COLORS, USED_COLORS)
            setBackgroundColor(newColors)
        }
    }, [backgroundColor, setBackgroundColor, COLORS, USED_COLORS])



    // handle the change event for the course code
    function handleCourseCodeChange(event: React.ChangeEvent<HTMLInputElement>) {
        setCourseCode(event.target.value)
    }
    // handle the change event for the background color
    function handleBackgroundColorChange(value: string) {
        if (USED_COLORS.includes(backgroundColor)) {
            dispatch(themeActions.removeUsedColor(backgroundColor))
        }
        setBackgroundColor(value)
    }

    // handle the change event for the meeting time schedules
    const handleMeetingTimeSchedulesChange = useCallback((index: number, meetingTime: meetingTime) => {
        setMeetingTimeSchedules((prev) => {
            const updatedMeetingTime = [...prev]
            updatedMeetingTime[index] = meetingTime
            return updatedMeetingTime
        })
    }, []);

    // handle the remove event for the meeting time schedules
    const handleRemoveMeetingTime = useCallback((index: number) => {
        setMeetingTimeSchedules(prev => {
            const newMeetingTimeSchedules = [...prev]
            newMeetingTimeSchedules.splice(index, 1)
            return newMeetingTimeSchedules
        })
    }, []);

    // handle the add event for the meeting time schedules
    function handleAddMeetingTime() {
        setMeetingTimeSchedules(prev => {
            const newMeetingTime = generateEmptyMeetingTime();
            return [...prev, newMeetingTime]
        }
        )
    }

    // empty the data
    function emptyData() {
        setCourseCode("");
        setBackgroundColor("");
        const emptyMeetingTime = generateEmptyMeetingTime()
        setMeetingTimeSchedules([emptyMeetingTime])
    }

    // handle the remove course event
    function handleRemoveCourse() {
        dispatch(coursesActions.removeCourse(id))
        dispatch(getPages())
        dispatch(getTimetable())
    }

    // check if the form is valid
    function formCheck(meetingTimes: meetingTime[]) {

        if (courseCode === "") {
            setErrorMessage("Course Code cannot be empty")
        }

        if (backgroundColor === "") {
            setErrorMessage("Background color cannot be empty ")
        }

        for (const meetingTime of meetingTimes) {
            if (meetingTime.endTime.hour() === 0) {
                if (meetingTime.endTime.minute() !== 0) {
                    setErrorMessage("Course end time must be earlier than 12: 00 AM")
                }
                if (!existed) {
                    meetingTime.endTime = meetingTime.endTime.add(1, 'day')
                }
            }

            if (meetingTime.startTime.isAfter(meetingTime.endTime)) {
                setErrorMessage("Course start time is later than course end time")
                return true
            }

            if (meetingTime.startTime.isSame(meetingTime.endTime)) {
                setErrorMessage("Course start time is equal to course end time")
                return true
            }

            if (meetingTime.startTime.isBefore(settingsStartTime)) {
                dispatch(stylingActions.setStartTime(meetingTime.startTime))
            }

            if (meetingTime.endTime.isAfter(settingsEndTime)) {
                const newSettingsEndTime = meetingTime.endTime.subtract(1, 'hour')
                dispatch(stylingActions.setEndTime(newSettingsEndTime))
            }
        }
    }

    // handle the submit event
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
        // console.log("Colors includes background color" + COLORS.includes(backgroundColor))
        if (COLORS.includes(backgroundColor)) {

            dispatch(themeActions.addUsedColor(backgroundColor))
        }

        dispatch(coursesActions.addCourse(course))
        dispatch(getPages())
        dispatch(getTimetable())
        emptyData()
        setCollapse(true)
    }

    return (
        <>
            <div className={`center ${style.div}`} style={{ boxShadow: `2px 2px 20px ${backgroundColor}, -2px 2px 20px ${backgroundColor}` }}>
                {errorMessage && <Alert severity="error" onClose={() => { setErrorMessage("") }}>{errorMessage}</Alert>}
                <table>
                    <tbody>

                        <tr>
                            <td>
                                <Typography variant="body1">Course Code : </Typography>
                            </td>
                            <td>
                                <TextField onChange={handleCourseCodeChange} value={courseCode} required sx={{ m: "8px", maxWidth: "160px" }} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Typography variant="body1">Grid Colour : </Typography>

                            </td>
                            <td>
                                <ColorRadioSelection name={props.id} options={COLORS} handleChange={handleBackgroundColorChange} value={backgroundColor} direction="row" />
                            </td>
                        </tr>
                    </tbody>

                </table>

                {meetingTimeSchedules.map((meetingTime, index) => (
                    <MeetingTimeForm
                        key={index} // Add a key prop for each rendered element in the array
                        id={index}
                        length={meetingTimeSchedules.length}
                        meetingTime={meetingTime}
                        handleRemoveMeetingTime={handleRemoveMeetingTime}
                        handleMeetingTimeSchedulesChange={handleMeetingTimeSchedulesChange}
                    />
                ))}

                <Button variant='outlined' color="info" onClick={handleAddMeetingTime} sx={{ margin: '4px' }}>Add Another Meeting Time</Button>

                {existed && <Button color="error" variant="outlined" onClick={handleRemoveCourse} sx={{ margin: '4px' }}>Remove Course</Button>}

                <Button type="submit" variant="outlined" color="info" onClick={handleSubmit} sx={{ margin: '4px' }}>Submit</Button>
            </div>
        </>
    )
}
