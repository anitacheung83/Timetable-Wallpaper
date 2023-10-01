"use client"
import React from "react";
import TimetableTd from "./TimetableTd/TimetableTd";
import { timetableHours, timetableInfos } from "../../store/timetable-slice"
import TimetableCSS from "./timetable.module.css"
import { Typography, capitalize } from "@mui/material";
import { Dayjs } from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import FavoriteIcon from '@mui/icons-material/Favorite';

function generateHours(startTime: Dayjs, endTime: Dayjs) {
    // generate hour as key for rendering
    const hours = [];

    let tempTime = startTime;
    while (tempTime.hour() < endTime.hour()) {
        hours.push(tempTime);
        tempTime = tempTime.add(1, "hour")
    }

    return hours
}

export default function Timetable() {
    const timetable = useSelector((state: RootState) => state.timetable)
    const startTime = useSelector((state: RootState) => state.settings.startTime)
    const endTime = useSelector((state: RootState) => state.settings.endTime)
    const headerColor = useSelector((state: RootState) => state.settings.headerColor)
    const courseGridHeight = useSelector((state: RootState) => state.settings.courseGridHeight)
    const courseGridWidth = useSelector((state: RootState) => state.settings.courseGridWidth)
    const clockType = useSelector((state: RootState) => state.settings.clockType)
    const device = useSelector((state: RootState) => state.settings.device)

    const hours = generateHours(startTime, endTime)


    return (
        <>
            <div className={`${TimetableCSS.background} ${device === "iphone" ? TimetableCSS.iphone : TimetableCSS.ipad}`} id="TimetableBackground">
                <table className={TimetableCSS.table}>
                    <tbody>
                        <tr>
                            <th className={TimetableCSS.th} style={{ backgroundColor: headerColor }}>
                            </th>
                            {Object.keys(timetable).map((day) => (

                                <th className={TimetableCSS.th} key={day} style={{ backgroundColor: headerColor, width: courseGridWidth }}>
                                    {capitalize(day)}
                                </th>
                            ))
                            }
                        </tr>

                        {hours.map(time => (

                            <tr className={TimetableCSS.tr} key={time.hour()} style={{ height: courseGridHeight }}>
                                <th className={TimetableCSS.th} style={{ backgroundColor: headerColor, width: 32 }}>{clockType === "12 Hour" ? time.format("hh:mm \n A") : time.format("HH:mm")}</th>
                                {Object.keys(timetable).map((day) => {
                                    const timetableHour = timetable[day as keyof timetableInfos]![time.hour() as unknown as keyof timetableHours];
                                    return (
                                        timetableHour && <TimetableTd key={day} time={time} {...timetableHour.timetableTdProps} />
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <p className={TimetableCSS.name}>by thetimetablefactory.com</p>
            </div>
        </>
    )
}