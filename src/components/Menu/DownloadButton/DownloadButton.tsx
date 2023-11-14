import IconButton from "@mui/material/IconButton";
import DownloadIcon from '@mui/icons-material/Download';
import Typography from "@mui/material/Typography";
import DownloadCSS from "./downloadButton.module.css"
import html2canvas from "html2canvas";
import React, { useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { motion } from "framer-motion";
import ImgPopUp from "../ImgPopUp/ImgPopUp";
import { useDispatch } from "../../../store";
import { pagesActions } from "../../../store/pages-slice";
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';

interface DownloadButtonProps {
    variants: {
        hidden: { opacity: number },
        visible: { opacity: number }
    }
}

// function reducer(state, action) {

// }

export default function DownloadButton(props: DownloadButtonProps) {
    const dispatch = useDispatch()
    // const [localState, dispatchLocal] = useReducer(reducer, { open: false, loading: false, timetableImgs: [] })

    const numberOfPages = useSelector((state: RootState) => state.pages.numberOfPages)
    const backgroundColor = useSelector((state: RootState) => state.settings.backgroundColor)

    const [open, setOpen] = React.useState(false);
    const [timetableImgs, setTimetableImgs] = useState<Array<string>>([])
    const [loading, setLoading] = useState(false)

    async function handleDownload() {
        console.log("Handle Download")
        setTimetableImgs([])
        setLoading(true)
        setOpen(true)

        const timetableImages: string[] = []
        await dispatch(pagesActions.setCurrPage(1))
        await new Promise(resolve => setTimeout(resolve, 600));

        for (let i = 0; i < numberOfPages; i++) {
            console.log("i: ", i)
            const input = document.getElementById("TimetableBackground");

            if (input) {
                html2canvas(input!, {
                    scale: 6,
                    backgroundColor: backgroundColor,
                    width: input.offsetWidth, // Set the canvas width to match the element's width
                    height: input.offsetHeight
                }).then((canvas) => {
                    const base64Image = canvas.toDataURL('image/png')
                    timetableImages.push(base64Image)

                })
            }
            await dispatch(pagesActions.nextPage())
            await new Promise(resolve => setTimeout(resolve, 600));
        }

        setTimetableImgs(timetableImages)
        setLoading(false)
        await dispatch(pagesActions.setCurrPage(1))

    }

    return (
        <>
            <motion.div className={DownloadCSS.div} variants={props.variants}>
                <IconButton color="info" onClick={handleDownload} sx={{ width: "100%" }}>
                    <Typography variant="h4">Download</Typography>
                    <DownloadIcon sx={{ position: "absolute", right: "4%" }} />

                </IconButton>

            </motion.div>
            <ImgPopUp open={open} setOpen={setOpen} contents={timetableImgs} />
        </>
    )
}



// const input = document.getElementById("TimetableBackground");

// if (input) {
//     html2canvas(input!, {
//         scale: 4,
//         backgroundColor: backgroundColor,
//         width: input.offsetWidth, // Set the canvas width to match the element's width
//         height: input.offsetHeight
//     }).then(async (canvas) => {
//         const timetableImgs = []
//         dispatch(pagesActions.setCurrPage(1))

//         for (let i = 0; i < numberOfPages; i++) {
//             const base64Image = canvas.toDataURL('image/png')
//             timetableImgs.push(base64Image)
//             await dispatch(pagesActions.nextPage())
//             await new Promise(resolve => setTimeout(resolve, 1000));

//         }

//         setTimetableImgs(timetableImgs)

// setTimetableImg(base64Image)

// var anchor = document.createElement("a")


// anchor.setAttribute("href", base64Image)
// anchor.setAttribute("download", "my-image.png")
// anchor.click();
// anchor.remove();