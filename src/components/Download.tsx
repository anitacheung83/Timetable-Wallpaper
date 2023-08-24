import IconButton from "@mui/material/IconButton";
import DownloadIcon from '@mui/icons-material/Download';
import Typography from "@mui/material/Typography";
import DownloadCSS from "../assets/download.module.css"
import html2canvas from "html2canvas";
import React from "react";

interface DownloadProps {
    backgroundColor: string
}

export default function Download(props: DownloadProps) {

    function handleDownload() {
        const input = document.getElementById("TimetableBackground")
        html2canvas(input!, { scale: 4 }).then((canvas) => {
            const base64Image = canvas.toDataURL('img/png')

            var anchor = document.createElement("a")
            anchor.setAttribute("href", base64Image)
            anchor.setAttribute("download", "my-image.png")
            anchor.click();
            anchor.remove()
        })

    }

    return (
        <>
            <div className={DownloadCSS.div} style={{ backgroundColor: props.backgroundColor }}>
                <IconButton color="info" onClick={handleDownload} sx={{ width: "100%" }}>
                    <Typography variant="h4">Download</Typography>
                    <DownloadIcon sx={{ position: "absolute", right: "4%" }} />

                </IconButton>

            </div>
        </>
    )
}