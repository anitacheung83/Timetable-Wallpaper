import React, { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useSelector } from "react-redux";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { RootState, useDispatch } from "../../../store";
import dayjs, { Dayjs } from "dayjs";
import { stylingActions } from "../../../store/styling-slice";
import Alert from "@mui/material/Alert"
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { getPages } from "../../../store/pages-action";
import { getTimetable } from "../../../store/timetable-action";
import ColorRadioSelection from "../ColorRadioSelection/ColorRadioSelection";
import ClockType from "../Inputs/ClockType/ClockType";
import DisplayTime from "../Inputs/DisplayTime/DisplayTime";
import style from "./styling.module.css"
import TextField from "@mui/material/TextField";
import { getTheme } from "../../../utils/stylingTheme";
import { ThemeColor } from "../../../interfaces/themeInterfaces"



export default function Styling() {
    const dispatch = useDispatch();
    const title = useSelector((state: RootState) => state.styling.title)
    const startTime = useSelector((state: RootState) => state.styling.startTime)
    const endTime = useSelector((state: RootState) => state.styling.endTime)
    const backgroundColor = useSelector((state: RootState) => state.styling.backgroundColor)
    const headerColor = useSelector((state: RootState) => state.styling.headerColor)
    const clockType = useSelector((state: RootState) => state.styling.clockType)
    const displayTime = useSelector((state: RootState) => state.styling.displayTime)
    const theme = useSelector((state: RootState) => state.theme)
    const { COLORS } = getTheme(theme)

    const colors = Object.values(COLORS).map((color: ThemeColor) => color.HEX)

    const [errorMessage, setErrorMessage] = useState<string>('')

    function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch(stylingActions.setTitle(event.target.value))
    }

    function handleStartTimeChange(value: Dayjs | null) {
        if (value === null) {
            return
        }
        // const formattedValue = value.toISOString()
        dispatch(stylingActions.setStartTime(value))
    }

    function handleEndTimeChange(value: Dayjs | null) {
        if (value === null) {
            return
        }
        dispatch(stylingActions.setEndTime(value))
    }

    function handleBackgroundColorChange(value: string) {
        dispatch(stylingActions.setBackgroundColor(value))
    }

    function handleHeaderColorChange(value: string) {
        dispatch(stylingActions.setHeaderColor(value))
    }

    function handleClockTypeChange(value: "12 Hour" | "24 Hour") {
        dispatch(stylingActions.setClockType(value))
    }

    function handleDisplayTimeChange(value: boolean) {
        dispatch(stylingActions.setDisplayTime(value))
    }

    function resetToDefault() {
        dispatch(stylingActions.resetToDefault())
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
        dispatch(stylingActions.sendStyling())
        dispatch(getPages())
        dispatch(getTimetable())
    }

    return (
        <>
            <>
                <div className={`center ${style.div}`} style={{ boxShadow: `2px 2px 20px #C2B8A3, -2px 2px 20px #C2B8A3` }} data-testid="styling">
                    {errorMessage && <Alert severity="error" onClose={() => { setErrorMessage("") }}>{errorMessage}</Alert>}

                    <table className={style.table}>
                        <tbody>

                            <tr>
                                <th>
                                    <Typography variant="body1">Title: </Typography>
                                </th>
                                <td>
                                    <TextField label="(optional)" onChange={handleTitleChange} value={title} sx={{ m: "8px", maxWidth: "160px" }} />
                                </td>
                            </tr>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>

                                <tr>
                                    <th>
                                        <Typography variant="body1">Start Time: </Typography>
                                    </th>
                                    <td>
                                        <DesktopTimePicker minutesStep={60} skipDisabled={true} sx={{ m: 1 }} value={startTime} onChange={handleStartTimeChange} />

                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <Typography variant="body1">End Time:</Typography>
                                    </th>
                                    <td>

                                        <DesktopTimePicker minutesStep={60} skipDisabled={true} sx={{ m: 1 }} value={endTime} onChange={handleEndTimeChange} />
                                    </td>
                                </tr>
                            </LocalizationProvider>
                            <tr>
                                <th >
                                    <Typography variant="body1">Background Color: </Typography>

                                </th>
                                <td>
                                    <ColorRadioSelection name="backgroundColor" options={colors} handleChange={handleBackgroundColorChange} value={backgroundColor} direction="row" />

                                </td>
                            </tr>

                            <tr>
                                <th>
                                    <Typography variant="body1">Header Color: </Typography>

                                </th>
                                <td >
                                    <ColorRadioSelection name="textColor" options={colors} handleChange={handleHeaderColorChange} value={headerColor} direction="row" />
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
                        </tbody>
                    </table>


                    <Button variant="outlined" color="info" onClick={resetToDefault} sx={{ margin: '4px' }}>Reset to default</Button>

                    <Button type="submit" variant="outlined" color="info" onClick={onSubmit} sx={{ margin: '4px' }}>Update</Button>
                </div>
            </>
        </>
    );
}