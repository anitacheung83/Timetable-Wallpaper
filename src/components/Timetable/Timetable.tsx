import React from "react";
import TimetableTd from "./TimetableTd/TimetableTd";
import { timetableHours, timetableInfos } from "../../interfaces/timetableInterfaces"
import TimetableCSS from "./timetable.module.css"
import { capitalize } from "@mui/material";
import { Dayjs } from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { IPHONE_TOP_WITH_WIDGETS, IPHONE_TOP_WITHOUT_WIDGETS, IPAD_TOP } from "../../data/constants";

function generateHours(startTime: Dayjs, endTime: Dayjs) {
    // generate hour as key for rendering
    const hours = [];

    let tempTime = startTime;
    while (tempTime.isBefore(endTime) || tempTime.isSame(endTime)) {
        hours.push(tempTime);
        tempTime = tempTime.add(1, "hour")
    }

    return hours
}

export default function Timetable() {
    const currPage = useSelector((state: RootState) => state.pages.currPage)

    const startTime = useSelector((state: RootState) => state.pages.pages[currPage - 1].startTime)
    const endTime = useSelector((state: RootState) => state.pages.pages[currPage - 1].endTime)
    const timetable = useSelector((state: RootState) => state.timetable[currPage - 1])
    const headerColor = useSelector((state: RootState) => state.settings.headerColor)
    const textColor = useSelector((state: RootState) => state.settings.textColor)
    const courseGridHeight = useSelector((state: RootState) => state.settings.courseGridHeight)
    const courseGridWidth = useSelector((state: RootState) => state.settings.courseGridWidth)
    const clockType = useSelector((state: RootState) => state.settings.clockType)
    const device = useSelector((state: RootState) => state.settings.device)
    const widgets = useSelector((state: RootState) => state.settings.widgets)

    const hours = generateHours(startTime, endTime)

    const top = device === "iphone" ? widgets ? IPHONE_TOP_WITH_WIDGETS : IPHONE_TOP_WITHOUT_WIDGETS : IPAD_TOP

    return (
        <>
            <table className={`${TimetableCSS.table}`} style={{ color: textColor, borderColor: textColor, top: top }}>
                <tbody>
                    <tr>
                        <th className={TimetableCSS.th} style={{ backgroundColor: headerColor, borderColor: textColor }}>
                        </th>
                        {Object.keys(timetable).map((day) => (

                            <th className={TimetableCSS.th} key={day} style={{ backgroundColor: headerColor, width: courseGridWidth, borderColor: textColor }}>
                                {capitalize(day)}
                            </th>
                        ))
                        }
                    </tr>

                    {hours.map(time => (
                        <tr className={TimetableCSS.tr} key={time.hour()} style={{ height: courseGridHeight, borderColor: textColor }}>
                            <th className={TimetableCSS.th} style={{ backgroundColor: headerColor, width: 32, borderColor: textColor }}>{clockType === "12 Hour" ? time.format("hh:mm \n A") : time.format("HH:mm")}</th>
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
        </>
    )
}