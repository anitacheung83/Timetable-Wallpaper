import React, { useContext } from "react";
import CourseGrid, { CourseGridProps } from "./CourseGrid";
import TimetableTdCSS from "../assets/timetableTd.module.css"
import { SettingsContext } from "../context/settingsContext";

export interface haveCourseGrid {
    rowspan: number,
    // below should be a list, May be a list of courseGrid props and for each item in the list you render it
    // courseGrid: (props: CourseGridProps) => JSX.Element,
    courseGridProps: CourseGridProps[]
}

export interface timetableTdProps extends Partial<haveCourseGrid> {

}

export default function TimetableTd(props: timetableTdProps) {
    const timetableSettings = useContext(SettingsContext)
    return (
        <>
            <td className={TimetableTdCSS.td} rowSpan={props.rowspan} style={{ width: timetableSettings.courseGridWidth }}>
                {props.courseGridProps?.map((courseGridProp) => {
                    return <CourseGrid {...courseGridProp} />

                })}

            </td>
        </>
    )
}