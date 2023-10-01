import IconButton from "@mui/material/IconButton";
import DownloadIcon from '@mui/icons-material/Download';
import Typography from "@mui/material/Typography";
import DownloadCSS from "./downloadButton.module.css"
import html2canvas from "html2canvas";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { motion } from "framer-motion";

interface DownloadButtonProps {
    variants: {
        hidden: { opacity: number },
        visible: { opacity: number }
    }
}

export default function DownloadButton(props: DownloadButtonProps) {
    const backgroundColor = useSelector((state: RootState) => state.settings.backgroundColor)
    console.log(backgroundColor)

    function handleDownload() {
        const input = document.getElementById("TimetableBackground");

        if (input) {
            console.log(input)
            html2canvas(input!, {
                scale: 4,
                backgroundColor: backgroundColor,
                width: input.offsetWidth, // Set the canvas width to match the element's width
                height: input.offsetHeight
            }).then((canvas) => {
                const base64Image = canvas.toDataURL('image/png')

                var anchor = document.createElement("a")
                anchor.setAttribute("href", base64Image)
                anchor.setAttribute("download", "my-image.png")
                anchor.click();
                anchor.remove();
            })
        }
    }



    return (
        <>
            <motion.div className={DownloadCSS.div} variants={props.variants}>
                <IconButton color="info" onClick={handleDownload} sx={{ width: "100%" }}>
                    <Typography variant="h4">Download</Typography>
                    <DownloadIcon sx={{ position: "absolute", right: "4%" }} />

                </IconButton>

            </motion.div>
        </>
    )
}