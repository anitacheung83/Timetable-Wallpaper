import React from "react";
import Timetable from "./Timetable";
import TimetableBackgroundCSS from '../assets/timetableBackground.module.css'

export default function TimetableBackground() {

    return (
        <>
            <div className={`${TimetableBackgroundCSS.background} ${TimetableBackgroundCSS.center}`}>
                <Timetable />
            </div>
        </>
    )
}