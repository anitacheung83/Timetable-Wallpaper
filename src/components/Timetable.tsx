import React, { useEffect, useState, useContext, useCallback } from "react";
import { courseInfo, days } from "../data/course.model";
import { formatTimetableInfos } from "../utils/formatTimetable";
import TimetableTd from "./TimetableTd";
import { timetableHours, timetableInfos } from "../data/timetable.model";
import TimetableCSS from "../assets/timetable.module.css"
import { capitalize } from "@mui/material";
import { DaysRange, SettingsContext } from "../context/settingsContext";
import dayjs, { Dayjs } from "dayjs";

interface TimetableProps {
    courseGridWidth: number,
    courseGridHeight: number,
    headerColor: string,
    daysRange: DaysRange,
    startTime: Dayjs,
    endTime: Dayjs,
    clockType: '12 Hour' | '24 Hour'
}

function generateHours(startTime: Dayjs, endTime: Dayjs) {
    // generate hour as key for rendering
    const hours = [];

    let tempTime = startTime;
    // console.log("tempTime" + tempTime)
    while (tempTime.hour() < endTime.hour()) {
        hours.push(tempTime);
        tempTime = tempTime.add(1, "hour")
    }

    return hours
}

export default function Timetable(props: TimetableProps) {
    const [timetableInfos, setTimetableInfos] = useState(getCoursesData())
    const hours = generateHours(dayjs(props.startTime), dayjs(props.endTime))

    function getCoursesData() {
        let newCoursesData = [];

        const localCoursesData = localStorage.getItem("coursesInfo");

        if (localCoursesData != null) {
            newCoursesData = JSON.parse(localCoursesData)
        }
        console.log("Timetable" + dayjs(props.startTime).hour(), dayjs(props.endTime).hour())

        console.log(formatTimetableInfos(newCoursesData, props.daysRange, props.startTime, props.endTime))

        return formatTimetableInfos(newCoursesData, props.daysRange, props.startTime, props.endTime)

    }

    useEffect(() => {
        const handleStorageChange = () => {
            const newCoursesData = getCoursesData();
            setTimetableInfos(newCoursesData);
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('setting', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('setting', handleStorageChange);
        }
    }, [])

    return (
        <>
            <table className={TimetableCSS.table}>
                <tr >
                    <th className={TimetableCSS.th} style={{ backgroundColor: props.headerColor }}>

                    </th>
                    {Object.keys(timetableInfos).map((day) => (

                        <th className={TimetableCSS.th} style={{ backgroundColor: props.headerColor }}>
                            {capitalize(day)}

                        </th>

                    ))
                    }
                </tr>

                {hours.map(time => (
                    <tr className={TimetableCSS.tr} key={time.hour()} style={{ height: props.courseGridHeight }}>
                        <th className={TimetableCSS.th} style={{ backgroundColor: props.headerColor }}>{props.clockType === "12 Hour" ? time.format("hh:mm \n A") : time.format("HH:mm")}</th>
                        {Object.keys(timetableInfos).map((day) => {
                            const timetableHour = timetableInfos[day as keyof timetableInfos]![time.hour() as unknown as keyof timetableHours];
                            return (
                                timetableHour && <TimetableTd key={day} time={time} {...timetableHour.timetableTdProps} />
                            );
                        })}
                    </tr>
                ))}
            </table>

        </>
    )
}