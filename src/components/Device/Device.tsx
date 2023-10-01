'use client'
import React from "react";
import IphoneDateTime from "../../assets/iphoneDateTime.png"
import Timetable from "../Timetable/Timetable";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import DeviceCSS from "./device.module.css"
import IpadImg from "../../assets/ipad-pro-13.png"
import IphoneImg from "../../assets/iphone-14-lock-screen.png"
import { motion } from "framer-motion"

export default function Device() {
    const device = useSelector((state: RootState) => state.settings.device)
    const backgroundColor = useSelector((state: RootState) => state.settings.backgroundColor)

    return (
        <>
            <motion.div
                key={device}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 60 }}
                transition={{ duration: 1 }}

                style={{ borderRadius: "18px", backgroundColor: "#f2f2f299", boxShadow: "2px 4px 12px rgba(0, 0, 0, .08)", padding: "6px 60px 20px 60px", margin: "20px" }}>

                <div className={`${DeviceCSS.wallpaperDesigner} ${device === "iphone" ? DeviceCSS.iphone : DeviceCSS.ipad}`}>

                    <div key={device} className={`${DeviceCSS.background} ${DeviceCSS.center}`} style={{ backgroundColor: backgroundColor }}>

                        <img key={device} className={DeviceCSS.dateTime} src={IphoneDateTime} alt="iphone date time" />

                        <Timetable key={device} />

                        {device === 'iphone' ?
                            <img className={DeviceCSS.img} src={IphoneImg} alt="iphone" /> :
                            <img className={DeviceCSS.img} src={IpadImg} alt="ipad" />}
                    </div>
                </div>
            </motion.div>
        </>
    )
}