import React, { useState } from "react";

// import MUI components
import IconButton from "@mui/material/IconButton";
import DownloadIcon from '@mui/icons-material/Download';
import Typography from "@mui/material/Typography";

// import styles
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { motion } from "framer-motion";
import ImgPopUp from "./ImgPopUp/ImgPopUp";
import { useDarkModeContext } from "../../../../context/DarkModeContext";
import { generateBase64Image } from "../../../../utils/saveAs";
import { getDeviceConstant } from "../../../../utils/getDeviceConstant";
import { getScale } from "../../../../utils/getDeviceConstant";
import { UAParser } from "ua-parser-js"

// Props interface for the DownloadButton component
interface DownloadButtonProps {
    variants: {
        hidden: { opacity: number },
        visible: { opacity: number }
    }
}

// DownloadButton Component
export default function DownloadImage(props: DownloadButtonProps) {
    const device = useSelector((state: RootState) => state.settings.device);
    const widgets = useSelector((state: RootState) => state.settings.widgets);
    const numberOfPages = useSelector((state: RootState) => state.pages.numberOfPages);
    const backgroundColor = useSelector((state: RootState) => state.styling.backgroundColor);
    const { darkMode } = useDarkModeContext()
    const { SCALE, WIDTH } = getDeviceConstant(device, widgets);
    // State for the image popup
    const [open, setOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false)
    const [timetableImgs, setTimetableImgs] = useState<Array<string>>([]);

    const divStyle = {
        boxShadow: isHovered ? `2px 2px 20px #C2B8A3, -2px 2px 20px #C2B8A3` : "",
    }

    // Function to handle the download based on device type
    async function handleDownload() {
        const parser = new UAParser(window.navigator.userAgent);

        const isLaptop = parser.getDevice().type !== "mobile" && parser.getDevice().type !== "tablet";
        // const isLaptop = window.innerWidth > 1024;
        const downloadFunction = isLaptop ? handleLaptopDownload : handleMobileDownload;
        downloadFunction();
    }

    // Function to handle download on mobile devices
    async function handleMobileDownload() {
        setOpen(true)
        setDownloadState();
        await generateTimetableImages();
        revertDownloadState();
    }

    // Function to handle download on laptops
    async function handleLaptopDownload() {
        for (let i = 0; i < numberOfPages; i++) {
            const base64Image = await generateBase64Image(device, i + 1, 6, backgroundColor);
            downloadImage(base64Image);
            await new Promise(resolve => setTimeout(resolve, 600));
        }
    }

    // Function to set the initial state for the download process
    function setDownloadState() {
        setTimetableImgs([]);
        for (let i = 0; i < numberOfPages; i++) {
            const deviceDiv = document.getElementById(`${device}${i + 1}`);
            deviceDiv!.style.transform = "scale(1)";
        }
    }

    function revertDownloadState() {

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
            await new Promise(resolve => setTimeout(resolve, 600));
        }
        setTimetableImgs(timetableImages);
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
                className={`downloadContainer ${darkMode && 'downloadContainerDarkMode'}`}
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
