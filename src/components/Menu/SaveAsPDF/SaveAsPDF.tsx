import React, { useState } from "react";
import { motion } from "framer-motion"
import styles from "./SaveAsPDF.module.css";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { RootState, useDispatch } from "../../../store";
import { useSelector } from "react-redux";
import { jsPDF } from "jspdf";
import { pagesActions } from "../../../store/pages-slice";
import { getDeviceConstant } from "../../../utils/getDeviceConstant";
import { useDarkModeContext } from "../../../context/DarkModeContext";
import { generateBase64Image } from "../../../utils/saveAs";
import { getScale } from "../../../utils/getDeviceConstant";

interface SaveAsPDFProps {
    variants: {
        hidden: { opacity: number },
        visible: { opacity: number }
    }
}

export default function SaveAsPDF(props: SaveAsPDFProps) {
    const dispatch = useDispatch();
    const device = useSelector((state: RootState) => state.settings.device);
    const widgets = useSelector((state: RootState) => state.settings.widgets);
    const numberOfPages = useSelector((state: RootState) => state.pages.numberOfPages);
    const { darkMode } = useDarkModeContext();
    const { PDF_SETTINGS, SCALE, WIDTH } = getDeviceConstant(device, widgets);
    const [isHovered, setIsHovered] = useState(false)
    const backgroundColor = useSelector((state: RootState) => state.styling.backgroundColor);
    const isLaptop = window.innerWidth > 1024;

    const divStyle = {
        backgroundColor: "transparent",
        boxShadow: isHovered ? `2px 2px 20px ${backgroundColor}, -2px 2px 20px ${backgroundColor}` : "",
    }

    async function setDownloadState() {
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

    async function handleSaveAsPDF() {

        setDownloadState();

        const input = document.getElementById("TimetableBackground1")
        const doc = new jsPDF(PDF_SETTINGS.PAGE_ORIENTATION, "px", [input!.offsetWidth, input!.offsetHeight]);

        for (let i = 0; i < numberOfPages - 1; i++) {
            const scale = isLaptop ? 6 : 4
            if (input) {
                const base64Image = await generateBase64Image(device, scale, i + 1);
                await doc.addImage(base64Image, 'PNG', 0, 0, input.offsetWidth, input.offsetHeight);
            }

            if (i < numberOfPages - 2) {

                await dispatch(pagesActions.nextPage());
                doc.addPage();
            }
            await new Promise(resolve => setTimeout(resolve, 600));

        }
        // window.open(doc.output('bloburl'))

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
                className={`${styles.div} ${darkMode && styles.darkModeDiv}`}
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