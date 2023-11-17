import React from "react";
import Timetable from "../Timetable/Timetable";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import DeviceCSS from "./device.module.css"
import { motion } from "framer-motion"
import TimetableBackground from "../Timetable/TimetableBackground/TimetableBackground";
import { getDeviceConstant } from "../../utils/getDeviceConstant";

export default function Device() {
    const currPage = useSelector((state: RootState) => state.pages.currPage)
    const numberOfPages = useSelector((state: RootState) => state.pages.numberOfPages)
    const device = useSelector((state: RootState) => state.settings.device)
    const widgets = useSelector((state: RootState) => state.settings.widgets)
    const backgroundColor = useSelector((state: RootState) => state.settings.backgroundColor)
    const deviceConstant = getDeviceConstant(device, widgets)
    const { ASPECT_RATIO, HEIGHT, DEVICE_IMAGES } = deviceConstant


    return (
        <>
            <motion.div
                key={device}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: -1 }}
                exit={{ opacity: 0, y: 60 }}
                transition={{ duration: 1 }}
            // className="centerR"
            // style={{ borderRadius: "18px", backgroundColor: "#f2f2f299", boxShadow: "2px 4px 12px rgba(0, 0, 0, .08)", padding: "10px 10px 20px 10px", margin: "10px" }}
            >

                <div className={`${DeviceCSS.wallpaperDesigner}`} style={{ aspectRatio: ASPECT_RATIO, height: HEIGHT }}>


                    <div key={device} className={`${DeviceCSS.background} ${DeviceCSS.center}`} style={{ backgroundColor: backgroundColor }}>

                        <img
                            key={device}
                            className={DeviceCSS.dateTime}
                            src={DEVICE_IMAGES?.DATE_TIME.SRC}
                            style={DEVICE_IMAGES?.DATE_TIME.STYLE}
                            alt="iphone date time" />


                        <TimetableBackground>
                            {currPage !== numberOfPages && <Timetable key={device} />}
                        </TimetableBackground>
                        <img
                            className={DeviceCSS.img}
                            src={DEVICE_IMAGES?.DEVICE_MOCK.SRC}
                            style={DEVICE_IMAGES?.DEVICE_MOCK.STYLE}
                            alt="iphone"
                        />
                    </div>
                </div>




            </motion.div>
        </>
    )
}