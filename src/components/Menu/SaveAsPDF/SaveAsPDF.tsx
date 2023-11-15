import React from "react";
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

interface SaveAsPDFProps {
    variants: {
        hidden: { opacity: number },
        visible: { opacity: number }
    }
}

export default function SaveAsPDF(props: SaveAsPDFProps) {
    const dispatch = useDispatch();
    const numberOfPages = useSelector((state: RootState) => state.pages.numberOfPages);
    const backgroundColor = useSelector((state: RootState) => state.settings.backgroundColor);



    async function handleSaveAsPDF() {

        await dispatch(pagesActions.setCurrPage(1));

        const doc = new jsPDF('p', 'px', [document.getElementById("TimetableBackground")!.offsetWidth, document.getElementById("TimetableBackground")!.offsetHeight]);
        for (let i = 0; i < numberOfPages; i++) {
            const input = document.getElementById("TimetableBackground");

            if (input) {
                html2canvas(input!, {
                    scale: 6,
                    backgroundColor: backgroundColor,
                    width: input.offsetWidth,
                    height: input.offsetHeight
                }).then((canvas) => {
                    const base64Image = canvas.toDataURL('image/png');
                    // const imageWidth = 210; // Adjust as needed
                    // const imageHeight = (input.offsetHeight / input.offsetWidth) * imageWidth;

                    doc.addImage(base64Image, 'PNG', 0, 0, input.offsetWidth, input.offsetHeight);
                })
            }

            doc.addPage();

            await dispatch(pagesActions.nextPage());
            await new Promise(resolve => setTimeout(resolve, 600));

        }
        doc.save('timetable.pdf');
        dispatch(pagesActions.setCurrPage(1));
    }

    return (
        <>
            <motion.div
                className={styles.div}
                variants={props.variants}
            >
                <IconButton color="info" onClick={handleSaveAsPDF} sx={{ width: "100%" }}>
                    <Typography variant="h4">Save As PDF</Typography>
                    <PictureAsPdfIcon sx={{ position: "absolute", right: "4%" }} />
                </IconButton>

            </motion.div>

        </>
    )
}