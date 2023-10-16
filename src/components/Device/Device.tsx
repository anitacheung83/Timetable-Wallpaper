'use client'
import React from "react";
import IphoneDateTime from "../../assets/iphoneDateTime.png"
import Timetable from "../Timetable/Timetable";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import DeviceCSS from "./device.module.css"
import IpadImg from "../../assets/ipad-pro-13.png"
import IphoneImg from "../../assets/iphone-14-lock-screen.png"
import { motion } from "framer-motion"
import { pagesActions } from "../../store/pages-slice";
import IconButton from "@mui/material/IconButton";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';


export default function Device() {
    const dispatch = useDispatch()
    const currPage = useSelector((state: RootState) => state.pages.currPage)
    const numberOfPages = useSelector((state: RootState) => state.pages.numberOfPages)
    const device = useSelector((state: RootState) => state.settings.device)
    const backgroundColor = useSelector((state: RootState) => state.settings.backgroundColor)

    function handlePrevPage() {
        dispatch(pagesActions.prevPage())
    }

    function handleNextPage() {
        dispatch(pagesActions.nextPage())
    }

    return (
        <>
            <motion.div
                key={device}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 60 }}
                transition={{ duration: 1 }}
                className="centerR"
                style={{ borderRadius: "18px", backgroundColor: "#f2f2f299", boxShadow: "2px 4px 12px rgba(0, 0, 0, .08)", padding: "10px 10px 20px 10px", margin: "10px" }}>
                <IconButton onClick={handlePrevPage} sx={{ height: "40px", width: "40px" }}>
                    <NavigateBeforeIcon />
                </IconButton>

                <div className={`${DeviceCSS.wallpaperDesigner} ${device === "iphone" ? DeviceCSS.iphone : DeviceCSS.ipad}`}>

                    <div key={device} className={`${DeviceCSS.background} ${DeviceCSS.center}`} style={{ backgroundColor: backgroundColor }}>

                        <img key={device} className={DeviceCSS.dateTime} src={IphoneDateTime} alt="iphone date time" />


                        {currPage !== numberOfPages &&

                            <Timetable key={device} />}


                        {device === 'iphone' ?
                            <img className={DeviceCSS.img} src={IphoneImg} alt="iphone" /> :
                            <img className={DeviceCSS.img} src={IpadImg} alt="ipad" />}
                    </div>
                </div>
                <IconButton onClick={handleNextPage} sx={{ height: "40px", width: "40px" }}>
                    <NavigateNextIcon />

                </IconButton>
            </motion.div>
        </>
    )
}