import React, { ReactNode, useState } from "react";
import CourseGridCSS from "../assets/courseGrid.module.css"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { CardContent } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

export interface CourseGridInfos {
    courseCode: string;
    backgroundColor: string;
    format: string;
    location: string;
    startTime: Dayjs;
    endTime: Dayjs;
    height: number;
    top: number;
    bottom: number;
}

export interface CourseGridProps extends CourseGridInfos {
    courseGridHeight: number;
    courseGridWidth: number;
    displayTime: boolean;
    clockType: "12 Hour" | "24 Hour";
    top1: number
}

export default function CourseGrid(props: CourseGridProps) {

    console.log(props)
    // console.log(props.top * props.height + "px")

    function calculateHeight() {
        if (props.height > 1) {
            return 1 * props.courseGridHeight + (props.height - 1) * props.courseGridHeight - 0.6
        } else {
            return props.courseGridHeight - 0.6
        }
    }


    let courseGridClassName = `${CourseGridCSS.courseGrid} ${CourseGridCSS.center}`;

    // if (props.position === 'top') {
    //     courseGridClassName += ` ${CourseGridCSS.top}`;
    // } else if (props.position === 'bottom') {
    //     courseGridClassName += ` ${CourseGridCSS.bottom}`;
    // }

    return (
        <div className={courseGridClassName}
            style={{
                backgroundColor: props.backgroundColor,
                height: calculateHeight(),
                width: props.courseGridWidth,
                top: props.top1 * props.courseGridHeight
            }}>
            <p className={`${CourseGridCSS.courseInput} ${CourseGridCSS.courseCode}`}>{props.courseCode}</p>
            <p className={`${CourseGridCSS.courseInput}`}>{props.format}</p>
            <p className={`${CourseGridCSS.courseInput}`}>{props.location}</p>
            <p className={`${CourseGridCSS.courseInput}`}>{props.displayTime && props.startTime.format(`${props.clockType === "12 Hour" ? "hh:mm A" : "HH:mm"}`)}</p>
            <p className={`${CourseGridCSS.courseInput} ${CourseGridCSS.label}`}> {props.displayTime && "-"} </p>
            <p className={`${CourseGridCSS.courseInput}`}>{props.displayTime && props.endTime.format(`${props.clockType === "12 Hour" ? "hh:mm A" : "HH:mm"}`)}</p>

        </div>

    )

}


