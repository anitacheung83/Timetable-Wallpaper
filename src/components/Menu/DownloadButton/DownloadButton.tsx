import IconButton from "@mui/material/IconButton";
import DownloadIcon from '@mui/icons-material/Download';
import Typography from "@mui/material/Typography";
import DownloadCSS from "./downloadButton.module.css"
import html2canvas from "html2canvas";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface DownloadButtonProps {
    backgroundColor: string
}

export default function DownloadButton(props: DownloadButtonProps) {
    const backgroundColor = useSelector((state: RootState) => state.settings.backgroundColor)
    const [buttonColor, setButtonColor] = useState("transparent")

    function handleDownload() {
        setButtonColor(props.backgroundColor)
        const input = document.getElementById("TimetableBackground")
        html2canvas(input!, { scale: 4, backgroundColor: backgroundColor }).then((canvas) => {
            const base64Image = canvas.toDataURL('img/png')

            var anchor = document.createElement("a")
            anchor.setAttribute("href", base64Image)
            anchor.setAttribute("download", "my-image.png")
            anchor.click();
            anchor.remove()
        })
        setButtonColor("transparent")
    }



    return (
        <>
            <div className={DownloadCSS.div} style={{}}>
                <IconButton color="info" onClick={handleDownload} sx={{ width: "100%" }}>
                    <Typography variant="h4">Download</Typography>
                    <DownloadIcon sx={{ position: "absolute", right: "4%" }} />

                </IconButton>

            </div>
        </>
    )
}