import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import SettingCSS from "../assets/setting.module.css"
import GridSizing from "./GridSizing";
import ClockType from "./ClockType";
import DaysSelection from "./DaysSelection";
// import { SettingProps } from "../data/setting.model";
import dayjs, { Dayjs } from "dayjs";
import { days } from "../data/course.model";
import Typography from "@mui/material/Typography";
import { Stack, ToggleButton, ToggleButtonGroup, useTheme } from "@mui/material";
import { DaysRange, TimetableSettings } from "../context/settingsContext";
import Alert from "@mui/material/Alert"
import DisplayTime from "./DisplayTime";


export default function Setting(props: TimetableSettings) {

    const [daysRange, setDaysRange] = useState(props.daysRange)
    const [startTime, setStartTime] = useState(dayjs(props.startTime))
    const [endTime, setEndTime] = useState(dayjs(props.endTime))
    const [backgroundColor, setBackgroundColour] = useState(props.backgroundColor)
    const [headerColor, setHeaderColor] = useState(props.headerColor)
    const [courseGridWidth, setCourseGridWidth] = useState(props.courseGridWidth)
    const [courseGridHeight, setCourseGridHeight] = useState(props.courseGridHeight)
    const [clockType, setClockType] = useState(props.clockType)
    const [displayTime, setDisplayTime] = useState(props.displayTime)
    const [errorMessage, setErrorMessage] = useState<string>('')

    function handleDaysChange(name: string, value: DaysRange) {

        setDaysRange(value)
    }

    function handleBackgroundColorChange(event: React.ChangeEvent<HTMLInputElement>) {
        setBackgroundColour(event.target.value)
    }

    function handleHeaderColorChange(event: React.ChangeEvent<HTMLInputElement>) {
        setHeaderColor(event.target.value)
    }

    function resetToDefault() {
        setDaysRange({
            mon: true,
            tue: true,
            wed: true,
            thu: true,
            fri: true,
            sat: false,
            sun: false
        })

        setStartTime(dayjs('2022-04-17T09:00'))
        setEndTime(dayjs('2022-04-17T18:00'))
        setBackgroundColour("#E6DDC6")
        setHeaderColor("#C2B8A3")
        setCourseGridHeight(49)
        setCourseGridWidth(49)
        setClockType("12 Hour")
    }

    function settingTimeCheck() {
        if (startTime > endTime) {
            setErrorMessage("Start time is later than end time")
            return true
        }
        return false
    }

    function onSubmit() {
        if (settingTimeCheck()) {
            return
        }

        const newSetting: TimetableSettings = {
            daysRange: daysRange,
            startTime: startTime,
            endTime: endTime,
            backgroundColor: backgroundColor,
            headerColor: headerColor,
            courseGridWidth: courseGridWidth,
            courseGridHeight: courseGridHeight,
            clockType: clockType,
            displayTime: displayTime
        }
        localStorage.setItem("setting", JSON.stringify(newSetting))
        console.log(newSetting)
        window.dispatchEvent(new Event('setting'))
    }

    return (
        <>
            <div className={SettingCSS.center}>
                {errorMessage && <Alert severity="error" onClose={() => { setErrorMessage("") }}>{errorMessage}</Alert>}
                <DaysSelection days={daysRange} handleChange={handleDaysChange} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <TimePicker minutesStep={60} skipDisabled={true} label="Start Time" sx={{ m: 1 }} value={startTime} onChange={(newValue) => newValue !== null && setStartTime(newValue)} />

                    <TimePicker minutesStep={60} skipDisabled={true} label="End Time" sx={{ m: 1 }} value={endTime} onChange={(newValue) => newValue !== null && setEndTime(newValue)} />
                </LocalizationProvider>

                <Stack direction="row">

                    <label><Typography variant="body1">Background Color </Typography></label> <input type="color" className={SettingCSS.colorSelector} value={backgroundColor} onChange={handleBackgroundColorChange} />
                </Stack>

                <Stack direction="row">

                    <label><Typography variant="body1">Header Color </Typography></label> <input type="color" className={SettingCSS.colorSelector} value={headerColor} onChange={handleHeaderColorChange} />
                </Stack>


                <GridSizing title={"Course Grid Width"} value={courseGridWidth} handleChange={setCourseGridWidth} />


                <GridSizing title={"Course Grid Height"} value={courseGridHeight} handleChange={setCourseGridHeight} />


                <ClockType value={clockType} handleChange={setClockType} />

                <DisplayTime value={displayTime} handleChange={setDisplayTime} />




                <Button variant="outlined" color="info" onClick={resetToDefault}>Reset to default</Button>

                <Button type="submit" variant="outlined" color="info" onClick={onSubmit}>Submit</Button>
            </div>


        </>
    )
}