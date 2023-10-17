import React, { PropsWithChildren } from 'react'
import TimetableBackgroundCSS from './TimetableBackground.module.css'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { isColorDark } from '../../../utils/color'

export default function TimetableBackground(props: PropsWithChildren) {
    const device = useSelector((state: RootState) => state.settings.device)
    const backgroundColor = useSelector((state: RootState) => state.settings.backgroundColor)

    return (
        <div className={`${TimetableBackgroundCSS.background} ${device === "iphone" ? TimetableBackgroundCSS.iphone : TimetableBackgroundCSS.ipad}`} id="TimetableBackground">
            {props.children}
            <p className={TimetableBackgroundCSS.name} style={{ color: isColorDark(backgroundColor) ? "#FFFFFF" : "#000000" }}>by thetimetablefactory.com</p>
        </div>
    )
}