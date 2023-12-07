import React from "react";
import TimetableTd from "./TimetableTd/TimetableTd";
import { timetableHours, timetableInfos } from "../../../interfaces/timetableInterfaces"
import TimetableCSS from "./timetable.module.css"
import { capitalize } from "@mui/material";
import { Dayjs } from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { getDeviceConstant } from "../../../utils/getDeviceConstant";

interface TimetableProps {
    currPage: number
}

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

export default function Timetable(props: TimetableProps) {
    const currPage = props.currPage
    const title = useSelector((state: RootState) => state.styling.title)
    const startTime = useSelector((state: RootState) => state.pages.pages[currPage - 1].startTime)
    const endTime = useSelector((state: RootState) => state.pages.pages[currPage - 1].endTime)
    const timetable = useSelector((state: RootState) => state.timetable[currPage - 1])
    const headerColor = useSelector((state: RootState) => state.styling.headerColor)
    const clockType = useSelector((state: RootState) => state.styling.clockType)

    const courseGridHeight = useSelector((state: RootState) => state.settings.courseGridHeight)
    const courseGridWidth = useSelector((state: RootState) => state.settings.courseGridWidth)
    const device = useSelector((state: RootState) => state.settings.device)
    const widgets = useSelector((state: RootState) => state.settings.widgets)

    const TOP = getDeviceConstant(device, widgets).TOP
    const hours = generateHours(startTime, endTime)

    return (
        <>
            <table className={`${TimetableCSS.table}`} style={{ top: TOP }} id="timetable">
                <tbody>
                    {
                        title &&
                        <tr>
                            <th className={TimetableCSS.th} colSpan={Object.keys(timetable).length + 1} style={{ backgroundColor: headerColor, fontSize: "10px" }}>
                                {title}
                            </th>
                        </tr>
                    }
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
        </>
    )
}