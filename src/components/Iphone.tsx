import React from "react";
import IphoneImg from '../assets/iphone-14-lock-screen.png'
import TimetableBackground from "./TimetableBackground";
import IphoneCSS from '../assets/iphone.module.css'


export default function Iphone() {
    return (
        <>
            <div className={IphoneCSS.wallpaperDesigner}>

                <TimetableBackground />

                <img className={IphoneCSS.iphoneImg} src={IphoneImg} />
            </div>
        </>
    )
}