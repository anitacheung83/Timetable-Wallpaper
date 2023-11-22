import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { getDeviceConstant } from "../../utils/getDeviceConstant";
import Timetable from "../Timetable/Timetable";
import TimetableBackground from "../Timetable/TimetableBackground/TimetableBackground";
import style from "./device.module.css"


export default function Device2() {
    const currPage = useSelector((state: RootState) => state.pages.currPage)
    const numberOfPages = useSelector((state: RootState) => state.pages.numberOfPages)
    const device = useSelector((state: RootState) => state.settings.device)
    // const device = "letter"
    const widgets = useSelector((state: RootState) => state.settings.widgets)
    const backgroundColor = useSelector((state: RootState) => state.settings.backgroundColor)
    const { DEVICE_IMAGES, BORDER_RADIUS, SCALE } = getDeviceConstant(device, widgets)

    function getScale() {
        const width = window.innerWidth

        console.log("width :", width)

        console.log(width < 600)

        if (width < 600) {
            console.log("phone")
            return SCALE.phone
        } else if (width < 1200) {
            console.log("tablet")
            return SCALE.tablet
        } else {
            return 1
        }

    }

    console.log(getScale())

    const divStyle = {
        backgroundColor: backgroundColor,
        borderRadius: BORDER_RADIUS,
        border: "solid 1px",
        borderColor: "info.main",
        transform: `scale(${getScale()})`
    }

    return (
        <>
            {/* <div> */}

            <div className={`center ${style.background}`}
                style={divStyle}
            // style={{ backgroundColor: backgroundColor, borderRadius: BORDER_RADIUS, border: "solid 1px", borderColor: "info.main", transform: `scale(${getScale})` }}
            >

                {
                    DEVICE_IMAGES &&
                    <>
                        <img
                            key={device}
                            className={style.dateTime}
                            src={DEVICE_IMAGES?.DATE_TIME.SRC}
                            style={DEVICE_IMAGES?.DATE_TIME.STYLE}
                            alt="iphone date time" />

                        <img
                            src={DEVICE_IMAGES?.DEVICE_MOCK.SRC}
                            className={style.img}
                            style={DEVICE_IMAGES?.DEVICE_MOCK.STYLE}
                            alt="iphone" />
                    </>
                }

                <TimetableBackground>

                    {currPage !== numberOfPages && <Timetable key={device} />}

                </TimetableBackground>

            </div>
            {/* </div> */}
        </>
    )
}