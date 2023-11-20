import IconButton from "@mui/material/IconButton";
import DownloadIcon from '@mui/icons-material/Download';
import Typography from "@mui/material/Typography";
import DownloadCSS from "./downloadButton.module.css";
import html2canvas from "html2canvas";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { motion } from "framer-motion";
import ImgPopUp from "../ImgPopUp/ImgPopUp";
import { useDispatch } from "../../../store";
import { pagesActions } from "../../../store/pages-slice";
import { useDarkModeContext } from "../../../context/DarkModeContext";

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
    const numberOfPages = useSelector((state: RootState) => state.pages.numberOfPages);
    const backgroundColor = useSelector((state: RootState) => state.settings.backgroundColor);
    const { darkMode } = useDarkModeContext()
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
    }

    // Function to handle download on laptops
    async function handleLaptopDownload() {
        for (let i = 0; i < numberOfPages; i++) {
            const base64Image = await generateBase64Image();
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
    }

    // Function to generate timetable images for download
    async function generateTimetableImages() {
        const timetableImages: string[] = [];
        for (let i = 0; i < numberOfPages; i++) {
            const base64Image = await generateBase64Image();
            timetableImages.push(base64Image);
            await dispatch(pagesActions.nextPage());
            await new Promise(resolve => setTimeout(resolve, 600));
        }
        setTimetableImgs(timetableImages);
        await dispatch(pagesActions.setCurrPage(1));
    }

    // Function to generate a base64 representation of a timetable image
    async function generateBase64Image() {
        const input = document.getElementById("TimetableBackground");
        const canvas = await html2canvas(input!, {
            scale: 6,
            backgroundColor: backgroundColor,
            width: input!.offsetWidth,
            height: input!.offsetHeight
        });
        return canvas.toDataURL('image/png');
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
                    <Typography variant="h4">Download</Typography>
                    <DownloadIcon sx={{ position: "absolute", right: "4%" }} />
                </IconButton>
            </motion.div>
            <ImgPopUp open={open} setOpen={setOpen} contents={timetableImgs} />
        </>
    )
}
