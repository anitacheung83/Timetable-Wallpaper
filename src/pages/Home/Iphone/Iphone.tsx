import React from "react";
import IphoneImg from '../../../assets/iphone-14-lock-screen.png'
import IphoneCSS from './iphone.module.css'
import IphoneDateTime from "../../../assets/iphoneDateTime.png"
import Timetable from "../../../components/Timetable/Timetable";

export default function Iphone() {
    return (
        <>
            <div className={IphoneCSS.wallpaperDesigner}>
                <img className={IphoneCSS.iphoneDateTime} src={IphoneDateTime} alt="iphone date time" />

                <Timetable />

                <img className={IphoneCSS.iphoneImg} src={IphoneImg} alt="iphone" />
            </div>
        </>
    )
}