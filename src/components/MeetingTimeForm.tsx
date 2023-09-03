import React from "react";
import { meetingTime, days } from "../data/course.model";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';
import dayjs, { Dayjs } from "dayjs";
import MeetingTimeFormCSS from '../assets/meetingTimeForm.module.css'
import DaysSelection from "./DaysSelection";

interface meetingTimeFormProps {
    key: number,
    id: number,
    handleRemoveMeetingTime: () => void,
    meetingTime: meetingTime;
    handleMeetingTimeSchedulesChange: (meetingTime: meetingTime) => void
}

function MeetingTimeForm(props: meetingTimeFormProps) {
    const courseType = props.meetingTime.courseType;
    const location = props.meetingTime.location;
    const startTime = dayjs(props.meetingTime.startTime);
    const endTime = dayjs(props.meetingTime.endTime);
    const days = props.meetingTime.days;

    const handleChange = (name: string, value: string | Dayjs | days) => {
        const newMeetingTime: meetingTime = {
            courseType: courseType,
            location: location,
            startTime: startTime,
            endTime: endTime,
            days: days,
            [name]: value
        }
        props.handleMeetingTimeSchedulesChange(newMeetingTime)

    }

    return (
        <>
            <div className={`${MeetingTimeFormCSS.center} ${MeetingTimeFormCSS.div}`}>
                <h2> Meeting Time {props.id + 1}</h2>
                {props.id !== 0 &&
                    (<IconButton onClick={() => props.handleRemoveMeetingTime()}>
                        <CloseIcon />
                    </IconButton>)
                }

                <DaysSelection days={days} handleChange={handleChange} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <TimePicker minutesStep={5} skipDisabled={true} label="Start Time" value={startTime} onChange={(newValue) => newValue !== null && handleChange("startTime", newValue)} sx={{ m: 1 }} />

                    <TimePicker minutesStep={5} skipDisabled={true} label="End Time" value={endTime} onChange={(newValue) => newValue !== null && handleChange("endTime", newValue)} sx={{ m: 1 }} />
                </LocalizationProvider>
                <TextField label="Course Type (optional)" value={courseType} sx={{ m: "8px" }} fullWidth onChange={(event) => handleChange("courseType", event.target.value)} />
                <TextField label="Location (optional)" value={location} sx={{ m: "8px" }} fullWidth onChange={(event) => handleChange("location", event.target.value)} />
            </div>
        </>
    )
}

export default React.memo(MeetingTimeForm)