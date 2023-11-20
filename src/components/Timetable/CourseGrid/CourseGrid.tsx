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
}

export default function CourseGrid(props: CourseGridProps) {
    const device = useSelector((state: RootState) => state.settings.device)
    const courseGridWidth = useSelector((state: RootState) => state.settings.courseGridWidth)
    const courseGridHeight = useSelector((state: RootState) => state.settings.courseGridHeight)
    const clockType = useSelector((state: RootState) => state.settings.clockType)
    const displayTime = useSelector((state: RootState) => state.settings.displayTime)

    function calculateHeight() {
        return courseGridHeight * props.height - 0.2
        // return 
    }

    let courseGridClassName = `${CourseGridCSS.courseGrid} ${CourseGridCSS.center}`;

    return (
        <motion.div className={courseGridClassName}
            data-testid="course-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
                backgroundColor: props.backgroundColor,
                height: calculateHeight(),
                // width: courseGridWidth,
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


