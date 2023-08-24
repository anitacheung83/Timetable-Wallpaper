import React from "react";
import Timetable from "./Timetable";
import TimetableBackgroundCSS from '../assets/timetableBackground.module.css'

interface TimetableBackgroundProps {
    backgroundColor: string
}

export default function TimetableBackground(props: TimetableBackgroundProps) {


    return (
        <>
            <div className={`${TimetableBackgroundCSS.background} ${TimetableBackgroundCSS.center}`} style={{ backgroundColor: props.backgroundColor }} id="TimetableBackground">
                <Timetable courseGridHeight={60} courseGridWidth={49} headerColor="#C2B8A3" />
            </div>
        </>
    )
}