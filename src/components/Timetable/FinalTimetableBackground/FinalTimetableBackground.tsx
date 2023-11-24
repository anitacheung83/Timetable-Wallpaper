import React, { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { getDeviceConstant } from "../../../utils/getDeviceConstant";
import { getScale } from "../../../utils/getDeviceConstant";
import style from "./FinalTimetableBackground.module.css"
import { isColorDark } from "../../../utils/color";

interface FinalTimetableBackgroundProps extends PropsWithChildren {
    id: number
}

export default function FinalTimetableBackground(props: FinalTimetableBackgroundProps) {
    const device = useSelector((state: RootState) => state.settings.device)
    const widgets = useSelector((state: RootState) => state.settings.widgets)
    const backgroundColor = useSelector((state: RootState) => state.settings.backgroundColor)
    const { ASPECT_RATIO, BORDER_RADIUS, HEIGHT, SCALE, WATERMARK_POSITION, DEVICE_IMAGES } = getDeviceConstant(device, widgets)


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
                id={`${device}${props.id}`}
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

                <div
                    className={`${style.backgroundInvisible}`}
                    style={{ aspectRatio: ASPECT_RATIO, height: HEIGHT }}
                    id={`TimetableBackground${device}${props.id}`}>
                    {props.children}
                    <p
                        className={style.name}
                        style={{ color: isColorDark(backgroundColor) ? "#FFFFFF" : "#000000", bottom: WATERMARK_POSITION }}>
                        by thetimetablefactory.com
                    </p>
                </div>


            </div>

        </>
    )
}