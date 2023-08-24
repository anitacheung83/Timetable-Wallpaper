import React from "react";
import IphoneImg from '../assets/iphone-14-lock-screen.png'
import TimetableBackground from "./TimetableBackground";
import IphoneCSS from '../assets/iphone.module.css'

interface IphoneProps {
    backgroundColor: string
}

export default function Iphone(props: IphoneProps) {
    return (
        <>
            <div className={IphoneCSS.wallpaperDesigner}>

                <TimetableBackground backgroundColor={props.backgroundColor} />

                <img className={IphoneCSS.iphoneImg} src={IphoneImg} />
            </div>
        </>
    )
}