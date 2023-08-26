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
    startTime: string;
    endTime: string;
    height: number;
    position?: 'top' | 'bottom';
}

export default function CourseGrid(props: CourseGridProps) {

    function calculateHeight() {
        if (props.height > 1) {
            return 1 * 48 + (props.height - 1) * 49 - 0.6
        } else {
            return 48 - 0.6
        }
    }


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
            <p className={`${CourseGridCSS.courseInput}`}>{props.startTime}</p>
            <p className={`${CourseGridCSS.courseInput} ${CourseGridCSS.label}`}> - </p>
            <p className={`${CourseGridCSS.courseInput}`}>{props.endTime}</p>

        </div>

    )

}


