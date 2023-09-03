import React from "react";
import IphoneImg from '../assets/iphone-14-lock-screen.png'
import TimetableBackground from "./TimetableBackground";
import IphoneCSS from '../assets/iphone.module.css'
import IphoneDateTime from "../assets/iphoneDateTime.png"


export default function Iphone() {
    return (
        <>
            <div className={IphoneCSS.wallpaperDesigner}>
                <img className={IphoneCSS.iphoneDateTime} src={IphoneDateTime} alt="iphone date time" />

                <TimetableBackground />

                <img className={IphoneCSS.iphoneImg} src={IphoneImg} alt="iphone" />
            </div>
        </>
    )
}