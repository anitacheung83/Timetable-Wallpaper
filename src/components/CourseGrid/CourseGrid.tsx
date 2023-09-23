import React from "react";
import CourseGridCSS from "./courseGrid.module.css"
import { Dayjs } from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export interface CourseGridInfos {
    courseCode: string;
    backgroundColor: string;
    format: string;
    location: string;
    startTime: Dayjs;
    endTime: Dayjs;
    height: number;
}

export interface CourseGridProps extends CourseGridInfos {
    top: number
}

export default function CourseGrid(props: CourseGridProps) {
    const courseGridWidth = useSelector((state: RootState) => state.settings.courseGridWidth)
    const courseGridHeight = useSelector((state: RootState) => state.settings.courseGridHeight)
    const clockType = useSelector((state: RootState) => state.settings.clockType)
    const displayTime = useSelector((state: RootState) => state.settings.displayTime)

    function calculateHeight() {
        return courseGridHeight * props.height - 0.2
    }

    let courseGridClassName = `${CourseGridCSS.courseGrid} ${CourseGridCSS.center}`;

    return (
        <div className={courseGridClassName}
            style={{
                backgroundColor: props.backgroundColor,
                height: calculateHeight(),
                width: courseGridWidth,
                top: props.top * courseGridHeight
            }}>
            <p className={`${CourseGridCSS.courseInput} ${CourseGridCSS.courseCode}`}>{props.courseCode}</p>
            <p className={`${CourseGridCSS.courseInput}`}>{props.format}</p>
            <p className={`${CourseGridCSS.courseInput}`}>{props.location}</p>
            <p className={`${CourseGridCSS.courseInput}`}>{displayTime && props.startTime.format(`${clockType === "12 Hour" ? "hh:mm A" : "HH:mm"}`)}</p>
            <p className={`${CourseGridCSS.courseInput} ${CourseGridCSS.label}`}> {displayTime && "-"} </p>
            <p className={`${CourseGridCSS.courseInput}`}>{displayTime && props.endTime.format(`${clockType === "12 Hour" ? "hh:mm A" : "HH:mm"}`)}</p>

        </div>

    )

}


