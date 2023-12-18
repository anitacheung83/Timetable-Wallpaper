import React, { useState } from "react";
import { motion } from "framer-motion"
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { RootState, useDispatch } from "../../../../store";
import { useSelector } from "react-redux";
import { jsPDF } from "jspdf";
import { getDeviceConstant } from "../../../../utils/getDeviceConstant";
import { useDarkModeContext } from "../../../../context/DarkModeContext";
import { generateBase64Image } from "../../../../utils/saveAs";
import { getScale } from "../../../../utils/getDeviceConstant";

interface SaveAsPDFProps {
    variants: {
        hidden: { opacity: number },
        visible: { opacity: number }
    }
}

export default function SaveAsPDF(props: SaveAsPDFProps) {
    const device = useSelector((state: RootState) => state.settings.device);
    const widgets = useSelector((state: RootState) => state.settings.widgets);
    const numberOfPages = useSelector((state: RootState) => state.pages.numberOfPages);
    const { darkMode } = useDarkModeContext();
    const { PDF_SETTINGS, SCALE, WIDTH } = getDeviceConstant(device, widgets);
    const [isHovered, setIsHovered] = useState(false)
    const isLaptop = window.innerWidth > 1024;

    const divStyle = {
        boxShadow: isHovered ? `2px 2px 20px #C2B8A3, -2px 2px 20px #C2B8A3` : "",
    }

    async function setDownloadState() {
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

    async function handleSaveAsPDF() {

        setDownloadState();

        const input = document.getElementById(`TimetableBackground${device}1`)
        const doc = new jsPDF(PDF_SETTINGS.PAGE_ORIENTATION, "px", [input!.offsetWidth, input!.offsetHeight]);

        for (let i = 0; i < numberOfPages - 1; i++) {
            const scale = isLaptop ? 6 : 4
            if (input) {
                const base64Image = await generateBase64Image(device, i + 1, scale);
                await doc.addImage(base64Image, 'PNG', 0, 0, input.offsetWidth, input.offsetHeight);
            }

            if (i < numberOfPages - 2) {
                doc.addPage();
            }
            await new Promise(resolve => setTimeout(resolve, 600));

        }

        doc.save('timetable.pdf');
        revertDownloadState();

    }

    function handleMouseEnter() {
        setIsHovered(true)

    }

    function handleMouseLeave() {
        setIsHovered(false)
    }

    return (
        <>
            <motion.div
                className={`downloadContainer ${darkMode && 'downloadContainerDarkMode'}`}
                variants={props.variants}
                style={divStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <IconButton color="info" onClick={handleSaveAsPDF} sx={{ width: "100%" }}>
                    <Typography variant="h4">Save As PDF</Typography>
                    <PictureAsPdfIcon sx={{ position: "absolute", right: "4%" }} />
                </IconButton>

            </motion.div>

        </>
    )
}