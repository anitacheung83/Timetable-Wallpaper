import React from "react";
import CourseGrid, { CourseGridInfos } from "../CourseGrid/CourseGrid";
import TimetableTdCSS from "./timetableTd.module.css"
import { Dayjs } from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export interface haveCourseGrid {
    rowspan: number,
    courseGridInfos: CourseGridInfos[]
}

export interface timetableTdProps extends Partial<haveCourseGrid> {
    time: Dayjs
}

export default function TimetableTd(props: timetableTdProps) {
    const courseGridWidth = useSelector((state: RootState) => state.settings.courseGridWidth)
    const textColor = useSelector((state: RootState) => state.settings.textColor)

    function calculateTop(index: number) {
        const startTime = props.courseGridInfos![index].displayStartTime;
        const timeDiff = startTime.diff(props.time, 'hour', true)

        return timeDiff
    }

    console.log("courseGridWidth" + courseGridWidth)

    return (
        <>
            <td className={TimetableTdCSS.td} rowSpan={props.rowspan} style={{ width: courseGridWidth, borderColor: textColor }}>
                {props.courseGridInfos?.map((courseGridInfos, index) => {
                    return <CourseGrid {...courseGridInfos}
                        key={index}
                        top={calculateTop(index)}
                    />

                })}

            </td>
        </>
    )
}