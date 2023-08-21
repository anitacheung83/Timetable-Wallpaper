import React, { useEffect, useState } from "react";
import { courseInfo } from "../data/course.model";
import { formatTimetableInfos } from "../utils/formatTimetable";
import TimetableTd from "./TimetableTd";
import { timetableHours, timetableInfos } from "../data/timetable.model";
import TimetableCSS from "../assets/timetable.module.css"
import { capitalize } from "@mui/material";

export default function Timetable() {
    const [timetableInfos, setTimetableInfos] = useState(getCoursesData())

    function getCoursesData() {
        let newCoursesData = [];

        const localCoursesData = localStorage.getItem("coursesInfo");

        if (localCoursesData != null) {
            newCoursesData = JSON.parse(localCoursesData)
        }

        console.log(formatTimetableInfos(newCoursesData))

        return formatTimetableInfos(newCoursesData)

    }

    useEffect(() => {
        const handleStorageChange = () => {
            const newCoursesData = getCoursesData();
            setTimetableInfos(newCoursesData);
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        }
    }, [])



    return (
        <>

            <table className={TimetableCSS.table}>
                <tr className={TimetableCSS.th}>
                    <th>

                    </th>
                    {

                        Object.keys(timetableInfos).map((day) => (

                            <th className={TimetableCSS.th}>
                                {capitalize(day)}

                            </th>

                        ))
                    }
                </tr>

                {
                    Object.keys(timetableInfos.mon).map((time) => (

                        <tr className={TimetableCSS.tr} key={time}>
                            <th className={TimetableCSS.th}>{time + ":00"}</th>
                            {Object.keys(timetableInfos).map((day) => {
                                const timetableHour = timetableInfos[day as keyof timetableInfos][time as unknown as keyof timetableHours];
                                return (
                                    timetableHour && <TimetableTd key={day} {...timetableHour.timetableTdProps} />
                                );
                            })}
                        </tr>
                    ))
                }
            </table>

        </>
    )
}