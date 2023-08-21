import React from "react";
import Button from "@mui/material/Button";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import SettingCSS from "../assets/setting.module.css"
import GridSizing from "./GridSizing";
import ClockType from "./ClockType";
import DaysSelection from "./DaysSelection";

export default function Setting() {
    const days = {
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true
    }

    function handleDayChange() {

    }

    function onSubmit() {

    }

    return (
        <>
            <div className={SettingCSS.center}>
                <DaysSelection days={days} handleChange={handleDayChange} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <TimePicker minutesStep={60} skipDisabled={true} label="Start Time" sx={{ m: 1 }} />

                    <TimePicker minutesStep={60} skipDisabled={true} label="End Time" sx={{ m: 1 }} />
                </LocalizationProvider>

                <input type="color" /><label>Background Color</label>


                <GridSizing title={"Course Grid Width"} />


                <GridSizing title={"Course Grid Height"} />


                <ClockType />

                <Button type="submit" variant="outlined" onClick={onSubmit}>Submit</Button>
            </div>

        </>
    )
}