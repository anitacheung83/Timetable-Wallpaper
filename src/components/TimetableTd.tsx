import React, { useContext } from "react";
import CourseGrid, { CourseGridInfos } from "./CourseGrid";
import TimetableTdCSS from "../assets/timetableTd.module.css"
import { SettingsContext } from "../context/settingsContext";
import dayjs, { Dayjs } from "dayjs";

export interface haveCourseGrid {
    rowspan: number,
    // below should be a list, May be a list of courseGrid props and for each item in the list you render it
    // courseGrid: (props: CourseGridProps) => JSX.Element,
    courseGridInfos: CourseGridInfos[]
}

export interface timetableTdProps extends Partial<haveCourseGrid> {
    time: Dayjs
}

export default function TimetableTd(props: timetableTdProps) {
    const timetableSettings = useContext(SettingsContext)

    function calculateRowSpan() {
        // console.log(props.courseGridInfos)
        // console.log(props.courseGridInfos![0])
        // console.log(props.courseGridInfos![props.courseGridInfos!.length - 1])
        const startTime = props.courseGridInfos![0].startTime;
        const endTime = props.courseGridInfos![props.courseGridInfos!.length - 1].endTime;
        const duration = endTime.diff(startTime, 'hour', true)

        const rowspan = Math.ceil(startTime.minute() / 60 + duration)

        console.log("calculate row span")
        console.log(rowspan)

        return rowspan
    }

    function calculateTop(index: number) {
        const startTime = props.courseGridInfos![index].startTime;
        const timeDiff = startTime.diff(props.time, 'hour', true)
        console.log("Calculate Top")
        console.log(timeDiff)
        return timeDiff
    }

    if (props.courseGridInfos) {
        calculateTop(1)
    }


    return (
        <>
            <td className={TimetableTdCSS.td} rowSpan={props.courseGridInfos && calculateRowSpan()} style={{ width: timetableSettings.courseGridWidth }}>
                {props.courseGridInfos?.map((courseGridInfos, index) => {
                    return <CourseGrid {...courseGridInfos}
                        courseGridHeight={timetableSettings.courseGridHeight}
                        courseGridWidth={timetableSettings.courseGridWidth}
                        displayTime={timetableSettings.displayTime}
                        clockType={timetableSettings.clockType}
                        top1={calculateTop(index)}
                    />

                })}

            </td>
        </>
    )
}