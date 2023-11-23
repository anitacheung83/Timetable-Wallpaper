import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getDeviceConstant } from "../../utils/getDeviceConstant";
import Timetable from "../Timetable/Timetable";
import TimetableBackground from "../Timetable/TimetableBackground/TimetableBackground";
import { getScale } from "../../utils/getDeviceConstant";
import style from "./device.module.css"


export default function TimetableVisibleBackground() {
    const currPage = useSelector((state: RootState) => state.pages.currPage)
    const numberOfPages = useSelector((state: RootState) => state.pages.numberOfPages)
    const device = useSelector((state: RootState) => state.settings.device)
    // const device = "letter"
    const widgets = useSelector((state: RootState) => state.settings.widgets)
    const backgroundColor = useSelector((state: RootState) => state.settings.backgroundColor)
    const { BORDER_RADIUS, SCALE } = getDeviceConstant(device, widgets)

    const divStyle = {
        backgroundColor: backgroundColor,
        borderRadius: BORDER_RADIUS,
        border: "solid 1px",
        borderColor: "info.main",
        transform: `scale(${getScale(SCALE)})`
    }

    return (
        <>
            <div className={`center ${style.background}`}
                style={divStyle}
                id="device"
            >

                <TimetableBackground>

                    {currPage !== numberOfPages && <Timetable key={device} currPage={2} />}

                </TimetableBackground>


            </div>

        </>
    )
}