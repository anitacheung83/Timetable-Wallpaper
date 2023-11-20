import React, { useState } from "react";
import { motion } from "framer-motion"
import styles from "./SaveAsPDF.module.css";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { RootState, useDispatch } from "../../../store";
import { useSelector } from "react-redux";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { pagesActions } from "../../../store/pages-slice";
import { getDeviceConstant } from "../../../utils/getDeviceConstant";
import { useDarkModeContext } from "../../../context/DarkModeContext";

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
    const { PDF_SETTINGS } = getDeviceConstant(device, widgets);
    const [isHovered, setIsHovered] = useState(false)
    const backgroundColor = useSelector((state: RootState) => state.settings.backgroundColor);
    const { darkMode } = useDarkModeContext()

    const divStyle = {
        backgroundColor: "transparent",
        boxShadow: isHovered ? `2px 2px 20px ${backgroundColor}, -2px 2px 20px ${backgroundColor}` : "",
    }

    async function handleSaveAsPDF() {

        await dispatch(pagesActions.setCurrPage(1));
        const input = document.getElementById("TimetableBackground")

        const doc = new jsPDF(PDF_SETTINGS.PAGE_ORIENTATION, "px", [input!.offsetWidth, input!.offsetHeight]);
        for (let i = 0; i < numberOfPages - 1; i++) {

            if (input) {
                const canvas = await html2canvas(input!, { scale: 6, width: input.offsetWidth, height: input.offsetHeight });
                const base64Image = canvas.toDataURL('image/png');
                await doc.addImage(base64Image, 'PNG', 0, 0, input.offsetWidth, input.offsetHeight);
            }

            if (i < numberOfPages - 2) {

                await dispatch(pagesActions.nextPage());
                doc.addPage();
            }
            await new Promise(resolve => setTimeout(resolve, 600));

        }
        doc.save('timetable.pdf');
        dispatch(pagesActions.setCurrPage(1));
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