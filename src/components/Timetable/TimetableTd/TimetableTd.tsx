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
    // time: the starting time of the td
    time: Dayjs
}

export default function TimetableTd(props: timetableTdProps) {
    const courseGridWidth = useSelector((state: RootState) => state.settings.courseGridWidth)

    function calculateTop(index: number) {
        const startTime = props.courseGridInfos![index].displayStartTime;
        const timeDiff = startTime.diff(props.time, 'hour', true)

        return timeDiff
    }

    return (
        <>
            <td className={TimetableTdCSS.td} rowSpan={props.rowspan} style={{ width: courseGridWidth }}>
                {props.courseGridInfos?.map((courseGridInfos, index) => {
                    return <CourseGrid {...courseGridInfos}
                        key={index}
                        top={calculateTop(index)}
                        rowspan={props.rowspan}
                    />

                })}

            </td>
        </>
    )
}