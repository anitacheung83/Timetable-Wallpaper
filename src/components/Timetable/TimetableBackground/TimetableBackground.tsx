import React, { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { getDeviceConstant } from "../../../utils/getDeviceConstant";
import { getScale } from "../../../utils/getDeviceConstant";
import style from "./TimetableBackground.module.css"
import { isColorDark } from "../../../utils/color";
import iPhoneDateTimeWhite from "../../../assets/iPhoneDateTimeWhite.svg"
import iPhoneDateTimeBlack from "../../../assets/iPhoneDateTimeBlack.svg"


interface TimetableBackgroundProps extends PropsWithChildren {
    id: number
}

export default function TimetableBackground(props: TimetableBackgroundProps) {
    const device = useSelector((state: RootState) => state.settings.device)
    const widgets = useSelector((state: RootState) => state.settings.widgets)
    const backgroundColor = useSelector((state: RootState) => state.styling.backgroundColor)
    const { ASPECT_RATIO, BORDER_RADIUS, HEIGHT, WIDTH, SCALE, WATERMARK_POSITION, DEVICE_IMAGES } = getDeviceConstant(device, widgets)


    const divStyle = {
        backgroundColor: backgroundColor,
        borderRadius: BORDER_RADIUS,
        border: "solid 1px",
        borderColor: "info.main",
        transform: `scale(${getScale(SCALE, WIDTH)})`
    }

    return (
        <>
            <div
                key={`${device}${props.id}`}
                className={`center ${style.background}`}
                style={divStyle}
                id={`${device}${props.id}`}
            >
                {
                    DEVICE_IMAGES &&
                    <>
                        <img
                            key={device}
                            className={style.dateTime}
                            src={isColorDark(backgroundColor) ? DEVICE_IMAGES.DATE_TIME.SRC.WHITE : DEVICE_IMAGES.DATE_TIME.SRC.BLACK}
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