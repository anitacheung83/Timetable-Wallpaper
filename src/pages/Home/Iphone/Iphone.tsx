import React from "react";
import IphoneImg from '../../../assets/iphone-14-lock-screen.png'
import IphoneCSS from './iphone.module.css'
import IphoneDateTime from "../../../assets/iphoneDateTime.png"
import Timetable from "../../../components/Timetable/Timetable";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export default function Iphone() {
    const backgroundColor = useSelector((state: RootState) => state.settings.backgroundColor)
    return (
        <>
            <div className={IphoneCSS.wallpaperDesigner}>
                <div className={`${IphoneCSS.background} ${IphoneCSS.center}`} style={{ backgroundColor: backgroundColor }}>

                    <img className={IphoneCSS.iphoneDateTime} src={IphoneDateTime} alt="iphone date time" />

                    <Timetable />

                    <img className={IphoneCSS.iphoneImg} src={IphoneImg} alt="iphone" />
                </div>
            </div>
        </>
    )
}