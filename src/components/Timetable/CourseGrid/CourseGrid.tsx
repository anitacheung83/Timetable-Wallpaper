import React from "react";
import CourseGridCSS from "./courseGrid.module.css"
import { Dayjs } from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { motion } from "framer-motion"

export interface CourseGridInfos {
    courseCode: string;
    backgroundColor: string;
    format: string;
    location: string;
    startTime: Dayjs;
    endTime: Dayjs;
    displayStartTime: Dayjs;
    displayEndTime: Dayjs;
    height: number;
}

export interface CourseGridProps extends CourseGridInfos {
    top: number
    rowspan?: number | undefined
}

export default function CourseGrid(props: CourseGridProps) {
    const device = useSelector((state: RootState) => state.settings.device)
    const courseGridHeight = useSelector((state: RootState) => state.settings.courseGridHeight)
    const clockType = useSelector((state: RootState) => state.settings.clockType)
    const displayTime = useSelector((state: RootState) => state.settings.displayTime)

    function calculateHeight() {
        const rowspan = props.rowspan ? props.rowspan : 1
        return (props.height / rowspan) * 100 + "%"
    }

    return (
        <motion.div
            className={CourseGridCSS.center}
            data-testid="course-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
                backgroundColor: props.backgroundColor,
                height: calculateHeight(),
                width: "100%",
                top: props.top * courseGridHeight
            }}>
            <p className={`${CourseGridCSS.courseInput} ${CourseGridCSS.courseCode}`}>{props.courseCode}</p>
            <p className={`${CourseGridCSS.courseInput}`}>{props.format}</p>
            <p className={`${CourseGridCSS.courseInput}`}>{props.location}</p>
            {displayTime &&
                (device === "iphone" ?
                    <>
                        <p className={`${CourseGridCSS.courseInput}`}>{props.startTime.format(`${clockType === "12 Hour" ? "hh:mm A" : "HH:mm"}`)}</p>
                        <p className={`${CourseGridCSS.courseInput} ${CourseGridCSS.label}`}>  - </p>
                        <p className={`${CourseGridCSS.courseInput}`}> {props.endTime.format(`${clockType === "12 Hour" ? "hh:mm A" : "HH:mm"}`)}</p>
                    </> :
                    <>
                        <p className={`${CourseGridCSS.courseInput}`}>{props.startTime.format(`${clockType === "12 Hour" ? "hh:mm A" : "HH:mm"}`)} - {props.endTime.format(`${clockType === "12 Hour" ? "hh:mm A" : "HH:mm"}`)}</p>
                    </>)

            }

        </motion.div>

    )

}


