import React, { useContext } from "react";
import Timetable from "./Timetable";
import TimetableBackgroundCSS from '../assets/timetableBackground.module.css'
import { SettingsContext } from "../context/settingsContext";

export default function TimetableBackground() {
    const timetableSettings = useContext(SettingsContext)

    return (
        <>
            <div className={`${TimetableBackgroundCSS.background} ${TimetableBackgroundCSS.center}`} style={{ backgroundColor: timetableSettings.backgroundColor }} id="TimetableBackground">
                <Timetable courseGridHeight={timetableSettings.courseGridHeight} courseGridWidth={timetableSettings.courseGridWidth} headerColor={timetableSettings.headerColor} daysSelection={timetableSettings.daysSelection} startTime={timetableSettings.startTime} endTime={timetableSettings.endTime} />
            </div>
        </>
    )
}