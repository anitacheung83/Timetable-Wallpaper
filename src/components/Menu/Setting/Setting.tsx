import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import SettingCSS from "./setting.module.css"
import GridSizing from "../Inputs/GridSizing/GridSizing";
import ClockType from "../Inputs/ClockType/ClockType";
import DaysSelection from "../Inputs/DaysSelection/DaysSelection";
import { Dayjs } from "dayjs";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { DaysRange } from "../../../interfaces/settingsInterfaces";
import Alert from "@mui/material/Alert"
import DisplayTime from "../Inputs/DisplayTime/DisplayTime";
import { settingsActions } from "../../../store/settings-slice";
import { RootState, useDispatch } from "../../../store/index"
import { getTimetable } from "../../../store/timetable-action";
import Widgets from "../Inputs/Widgets/Widgets";

import ColorRadioSelection from "../ColorRadioSelection/ColorRadioSelection";
import { getPages } from "../../../store/pages-action";


export default function Setting() {
    const dispatch = useDispatch();
    const device = useSelector((state: RootState) => state.settings.device)
    const daysRange = useSelector((state: RootState) => state.settings.daysRange)
    const startTime = useSelector((state: RootState) => state.settings.startTime)
    const endTime = useSelector((state: RootState) => state.settings.endTime)
    const backgroundColor = useSelector((state: RootState) => state.settings.backgroundColor)
    const headerColor = useSelector((state: RootState) => state.settings.headerColor)
    const textColor = useSelector((state: RootState) => state.settings.textColor)
    const courseGridWidth = useSelector((state: RootState) => state.settings.courseGridWidth)
    const courseGridHeight = useSelector((state: RootState) => state.settings.courseGridHeight)
    const clockType = useSelector((state: RootState) => state.settings.clockType)
    const displayTime = useSelector((state: RootState) => state.settings.displayTime)
    const widgets = useSelector((state: RootState) => state.settings.widgets)

    const [errorMessage, setErrorMessage] = useState<string>('')

    useEffect(() => {
        dispatch(settingsActions.fetchSettings(device))
    }, [dispatch, device])


    function handleDaysChange(name: string, value: DaysRange) {
        dispatch(settingsActions.setDaysRange(value))
    }

    function handleBackgroundColorChange(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch(settingsActions.setBackgroundColor(event.target.value))
    }

    function handleHeaderColorChange(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch(settingsActions.setHeaderColor(event.target.value))
    }

    function handleTextColorChange(value: string) {
        dispatch(settingsActions.setTextColor(value))
    }

    function handleStartTimeChange(value: Dayjs | null) {
        if (value === null) {
            return
        }
        dispatch(settingsActions.setStartTime(value))
    }

    function handleEndTimeChange(value: Dayjs | null) {
        if (value === null) {
            return
        }
        dispatch(settingsActions.setEndTime(value))
    }

    function handleCourseGridWidthChange(value: number) {
        dispatch(settingsActions.setCourseGridWidth(value))
    }

    function handleCourseGridHeightChange(value: number) {
        dispatch(settingsActions.setCourseGridHeight(value))
    }

    function handleClockTypeChange(value: "12 Hour" | "24 Hour") {
        dispatch(settingsActions.setClockType(value))
    }

    function handleDisplayTimeChange(value: boolean) {
        dispatch(settingsActions.setDisplayTime(value))
    }

    function handleWidgetsChange(value: boolean) {
        console.log('Widget value: ' + value)
        dispatch(settingsActions.setWidgets(value))
    }

    function resetToDefault() {
        dispatch(settingsActions.resetToDefault())
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
        dispatch(settingsActions.sendSettings())
        dispatch(getPages())
        dispatch(getTimetable())
    }

    return (
        <>
            <div className={`center ${SettingCSS.div}`} style={{ boxShadow: `2px 2px 20px #C2B8A3, -2px 2px 20px #C2B8A3` }}>
                {errorMessage && <Alert severity="error" onClose={() => { setErrorMessage("") }}>{errorMessage}</Alert>}
                <DaysSelection days={daysRange} handleChange={handleDaysChange} />

                <table className={SettingCSS.table}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <tr>
                            <th>
                                <Typography variant="body1">Start Time: </Typography>
                            </th>
                            <td>
                                <TimePicker minutesStep={60} skipDisabled={true} sx={{ m: 1 }} value={startTime} onChange={handleStartTimeChange} />

                            </td>
                        </tr>
                        <tr>
                            <th>
                                <Typography variant="body1">End Time:</Typography>
                            </th>
                            <td>

                                <TimePicker minutesStep={60} skipDisabled={true} sx={{ m: 1 }} value={endTime} onChange={handleEndTimeChange} />
                            </td>
                        </tr>
                    </LocalizationProvider>
                    <tr>
                        <th >
                            <Typography variant="body1">Background Color: </Typography>

                        </th>
                        <td>

                            <input type="color" className={SettingCSS.colorSelector} value={backgroundColor} onChange={handleBackgroundColorChange} />
                        </td>
                    </tr>

                    <tr>
                        <th>
                            <Typography variant="body1">Header Color: </Typography>

                        </th>
                        <td>

                            <input type="color" className={SettingCSS.colorSelector} value={headerColor} onChange={handleHeaderColorChange} />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <Typography variant="body1">Text Color: </Typography>
                        </th>
                        <td>

                            <ColorRadioSelection name="textColor" options={["#DBDBDB", "#000000"]} handleChange={handleTextColorChange} value={textColor} />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <Typography variant="body1">Grid Width: </Typography>
                        </th>
                        <td>

                            <GridSizing title={"Course Grid Width"} value={courseGridWidth} handleChange={handleCourseGridWidthChange} />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <Typography variant="body1">Grid Height: </Typography>
                        </th>
                        <td>
                            <GridSizing title={"Course Grid Height"} value={courseGridHeight} handleChange={handleCourseGridHeightChange} />

                        </td>
                    </tr>
                    <tr>
                        <th>
                            <Typography variant="body1">Clock Type: </Typography>
                        </th>
                        <td>
                            <ClockType value={clockType} handleChange={handleClockTypeChange} />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <Typography variant="body1">Display Time: </Typography>
                        </th>
                        <td>
                            <DisplayTime value={displayTime} handleChange={handleDisplayTimeChange} />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <Typography variant="body1">Widgets: </Typography>
                        </th>
                        <td>

                            <Widgets value={widgets} handleChange={handleWidgetsChange} />
                        </td>
                    </tr>
                </table>












                <Button variant="outlined" color="info" onClick={resetToDefault}>Reset to default</Button>

                <Button type="submit" variant="outlined" color="info" onClick={onSubmit}>Submit</Button>
            </div>
        </>
    )
}