import React, { ReactNode, useState } from "react";
import CourseGridCSS from "../assets/courseGrid.module.css"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { CardContent } from "@mui/material";



export interface CourseGridProps {
    courseCode: string;
    backgroundColor: string;
    format: string;
    location: string;
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
    height: number;
    position?: 'top' | 'bottom';
}

export default function CourseGrid(props: CourseGridProps) {

    function calculateHeight() {
        if (props.height > 1) {
            return 1 * 49 + (props.height - 1) * 40
        } else {
            return 49
        }
        // return props.height * 49
    }

    // const height = props.height * 50

    let courseGridClassName = `${CourseGridCSS.courseGrid} ${CourseGridCSS.center}`;

    if (props.position === 'top') {
        courseGridClassName += ` ${CourseGridCSS.top}`;
    } else if (props.position === 'bottom') {
        courseGridClassName += ` ${CourseGridCSS.bottom}`;
    }

    return (
        <div className={courseGridClassName}
            style={{
                backgroundColor: props.backgroundColor,
                height: calculateHeight()
            }}>
            <p className={`${CourseGridCSS.courseInput} ${CourseGridCSS.courseCode}`}>{props.courseCode}</p>
            <p className={`${CourseGridCSS.courseInput}`}>{props.format}</p>
            <p className={`${CourseGridCSS.courseInput}`}>{props.location}</p>
            <p className={`${CourseGridCSS.courseInput}`}>{props.startHour}:{props.startMinute}0</p>
            <p className={`${CourseGridCSS.courseInput} ${CourseGridCSS.label}`}> - </p>
            <p className={`${CourseGridCSS.courseInput}`}>{props.endHour}:{props.endMinute}0</p>

        </div>

    )

}


