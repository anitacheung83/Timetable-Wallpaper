import React, { useState } from "react"
import Modal from "@mui/material/Modal"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import CircularProgress from '@mui/material/CircularProgress';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, 0)',
    width: 490,
    height: 800,
    bgcolor: 'background.default',
    borderRadius: "20px",
    boxShadow: 24,
    py: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
};

interface ImgPopUpProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    contents: Array<string>
}

export default function ImgPopUp(props: ImgPopUpProps) {

    function handleClose() {
        props.setOpen(false)
    }

    return (
        <>
            <Modal open={props.open} onClose={handleClose} disableScrollLock={false} style={{ overflow: "scroll" }}>
                <Box sx={style}>

                    <Typography variant="h4" sx={{ marginBottom: "20px" }}>Here is your timetable!</Typography>

                    {
                        props.contents.length === 0 ?
                            <CircularProgress /> :

                            <div style={{ overflow: "auto", maxHeight: "800px" }}>

                                <div className="center">

                                    {props.contents.map((content, index) => (
                                        <img
                                            key={index} // It's a good practice to add a unique key when mapping over an array in React
                                            src={content}
                                            alt="timetable"
                                            height="800px"
                                            style={{
                                                boxShadow: `2px 2px 20px grey, -2px 2px 20px grey`,
                                                margin: "20px",
                                            }}
                                        />
                                    ))}

                                </div>
                            </div>
                    }
                </Box>
            </Modal>
        </>
    )
}