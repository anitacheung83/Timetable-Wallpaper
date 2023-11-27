import IconButton from "@mui/material/IconButton";
import DownloadIcon from '@mui/icons-material/Download';
import Typography from "@mui/material/Typography";
import DownloadCSS from "./downloadButton.module.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { motion } from "framer-motion";
import ImgPopUp from "../ImgPopUp/ImgPopUp";
import { useDispatch } from "../../../store";
import { pagesActions } from "../../../store/pages-slice";
import { useDarkModeContext } from "../../../context/DarkModeContext";
import { generateBase64Image } from "../../../utils/saveAs";
import { getDeviceConstant } from "../../../utils/getDeviceConstant";
import { getScale } from "../../../utils/getDeviceConstant";

// Props interface for the DownloadButton component
interface DownloadButtonProps {
    variants: {
        hidden: { opacity: number },
        visible: { opacity: number }
    }
}

// DownloadButton Component
export default function DownloadButton(props: DownloadButtonProps) {
    const dispatch = useDispatch();
    const device = useSelector((state: RootState) => state.settings.device);
    const widgets = useSelector((state: RootState) => state.settings.widgets);
    const numberOfPages = useSelector((state: RootState) => state.pages.numberOfPages);
    const backgroundColor = useSelector((state: RootState) => state.styling.backgroundColor);
    const { darkMode } = useDarkModeContext()
    const { SCALE, WIDTH } = getDeviceConstant(device, widgets);
    // State for the image popup
    const [open, setOpen] = React.useState(false);
    const [isHovered, setIsHovered] = useState(false)
    const [timetableImgs, setTimetableImgs] = useState<Array<string>>([]);

    const divStyle = {
        backgroundColor: "transparent",
        boxShadow: isHovered ? `2px 2px 20px ${backgroundColor}, -2px 2px 20px ${backgroundColor}` : "",
    }

    // Function to handle the download based on device type
    async function handleDownload() {
        const isLaptop = window.innerWidth > 1024;
        const downloadFunction = isLaptop ? handleLaptopDownload : handleMobileDownload;
        downloadFunction();
    }

    // Function to handle download on mobile devices
    async function handleMobileDownload() {
        setDownloadState();
        await generateTimetableImages();
        revertDownloadState();
    }

    // Function to handle download on laptops
    async function handleLaptopDownload() {
        for (let i = 0; i < numberOfPages; i++) {
            const base64Image = await generateBase64Image(device, i + 1, 6, backgroundColor);
            downloadImage(base64Image);
            await dispatch(pagesActions.nextPage());
            await new Promise(resolve => setTimeout(resolve, 600));
        }
        await dispatch(pagesActions.setCurrPage(1));
    }

    // Function to set the initial state for the download process
    function setDownloadState() {
        setTimetableImgs([]);
        setOpen(true);
        dispatch(pagesActions.setCurrPage(1));
        for (let i = 0; i < numberOfPages; i++) {
            const deviceDiv = document.getElementById(`${device}${i + 1}`);
            deviceDiv!.style.transform = "scale(1)";
        }
    }

    function revertDownloadState() {
        dispatch(pagesActions.setCurrPage(1));
        for (let i = 0; i < numberOfPages; i++) {
            const deviceDiv = document.getElementById(`${device}${i + 1}`);
            deviceDiv!.style.transform = `scale(${getScale(SCALE, WIDTH)})`;
        }
    }

    // Function to generate timetable images for download
    async function generateTimetableImages() {
        const timetableImages: string[] = [];
        for (let i = 0; i < numberOfPages; i++) {
            const base64Image = await generateBase64Image(device, i + 1, 4, backgroundColor);
            timetableImages.push(base64Image);
            await dispatch(pagesActions.nextPage());
            await new Promise(resolve => setTimeout(resolve, 600));
        }
        setTimetableImgs(timetableImages);
        await dispatch(pagesActions.setCurrPage(1));
    }


    // Function to initiate the download of a base64-encoded image
    function downloadImage(base64Image: string) {
        const anchor = document.createElement("a");
        anchor.setAttribute("href", base64Image);
        anchor.setAttribute("download", "Timetable-Wallpaper.png");
        anchor.click();
        anchor.remove();
    }



    function handleMouseEnter() {
        setIsHovered(true)

    }

    function handleMouseLeave() {
        setIsHovered(false)
    }

    // JSX rendering of the DownloadButton component
    return (
        <>
            <motion.div
                className={`${DownloadCSS.div} ${darkMode && DownloadCSS.darkModeDiv}`}
                style={divStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                variants={props.variants}>
                <IconButton color="info" onClick={handleDownload} sx={{ width: "100%" }}>
                    <Typography variant="h4">Download Image</Typography>
                    <DownloadIcon sx={{ position: "absolute", right: "4%" }} />
                </IconButton>
            </motion.div>
            <ImgPopUp open={open} setOpen={setOpen} contents={timetableImgs} />
        </>
    )
}
