import React, { useContext } from "react";
import CourseGrid, { CourseGridInfos } from "./CourseGrid";
import TimetableTdCSS from "../assets/timetableTd.module.css"
import { SettingsContext } from "../context/settingsContext";
import { Dayjs } from "dayjs";

export interface haveCourseGrid {
    rowspan: number,
    courseGridInfos: CourseGridInfos[]
}

export interface timetableTdProps extends Partial<haveCourseGrid> {
    time: Dayjs
}

export default function TimetableTd(props: timetableTdProps) {
    const timetableSettings = useContext(SettingsContext)

    function calculateTop(index: number) {
        const startTime = props.courseGridInfos![index].startTime;
        const timeDiff = startTime.diff(props.time, 'hour', true)

        return timeDiff
    }

    // if (props.courseGridInfos) {
    //     calculateTop(1)
    // }


    return (
        <>
            <td className={TimetableTdCSS.td} rowSpan={props.rowspan} style={{ width: timetableSettings.courseGridWidth }}>
                {props.courseGridInfos?.map((courseGridInfos, index) => {
                    return <CourseGrid {...courseGridInfos}
                        courseGridHeight={timetableSettings.courseGridHeight}
                        courseGridWidth={timetableSettings.courseGridWidth}
                        displayTime={timetableSettings.displayTime}
                        clockType={timetableSettings.clockType}
                        top={calculateTop(index)}
                    />

                })}

            </td>
        </>
    )
}