import React, { PropsWithChildren } from 'react'
import TimetableBackgroundCSS from './TimetableBackground.module.css'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { isColorDark } from '../../../utils/color'
import { getDeviceConstant } from '../../../utils/getDeviceConstant'

export default function TimetableBackground(props: PropsWithChildren) {
    const device = useSelector((state: RootState) => state.settings.device)
    // const device = "letter"
    const widgets = useSelector((state: RootState) => state.settings.widgets)
    const backgroundColor = useSelector((state: RootState) => state.settings.backgroundColor)

    const deviceConstant = getDeviceConstant(device, widgets)
    const { ASPECT_RATIO, HEIGHT, WATERMARK_POSITION } = deviceConstant


    return (
        <div
            className={`${TimetableBackgroundCSS.background}`}
            style={{ aspectRatio: ASPECT_RATIO, height: HEIGHT }}
            id="TimetableBackground">
            {props.children}
            <p
                className={TimetableBackgroundCSS.name}
                style={{ color: isColorDark(backgroundColor) ? "#FFFFFF" : "#000000", bottom: WATERMARK_POSITION }}>
                by thetimetablefactory.com
            </p>
        </div>
    )
}