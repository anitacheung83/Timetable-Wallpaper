import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import { useDarkModeContext } from "../../../../../context/DarkModeContext";

// Styles for the modal content
function getModalStyle(darkMode: boolean) {

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 490,
        height: 800,
        bgcolor: darkMode ? "#121212DD" : "#DAD6CEDD",
        borderRadius: "20px",
        boxShadow: 24,
        py: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "100%",
        maxHeight: "100%",
        my: 1
    };

    return style
}

// Props interface for ImgPopUp component
interface ImgPopUpProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    contents: Array<string>;
}

// ImgPopUp component
export default function ImgPopUp(props: ImgPopUpProps) {
    const { darkMode } = useDarkModeContext();
    // Function to close the modal
    function handleClose() {
        props.setOpen(false);
    }


    return (
        <>
            {/* Modal for displaying timetable images */}
            <Modal open={props.open} onClose={handleClose} disableScrollLock={false} style={{ overflow: "scroll", maxWidth: "100%" }}>
                {/* Modal content */}
                <Box sx={getModalStyle(darkMode)}>
                    {/* Close button */}
                    <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 10, right: 10 }}>
                        <CloseIcon />
                    </IconButton>
                    {/* Conditional rendering based on the contents */}
                    {
                        props.contents.length === 0 ?
                            /* Loading state */
                            <>
                                <Typography variant="h4" sx={{ marginBottom: "20px" }}>One Sec!</Typography>
                                <CircularProgress />
                            </>
                            :
                            /* Displaying timetable images */
                            <>
                                <Typography variant="h4" sx={{ marginBottom: "20px" }}>Voila!</Typography>
                                <Typography variant="h4" sx={{ marginBottom: "20px" }}>Here is your timetable!</Typography>

                                {/* Scrollable container for images */}
                                <div style={{ overflow: "auto", maxHeight: "800px" }}>
                                    <div className="center">
                                        {/* Mapping over contents to display images */}
                                        {props.contents.map((content, index) => (
                                            <img
                                                key={index}
                                                src={content}
                                                alt="timetable"
                                                // height="800px"
                                                style={{
                                                    maxWidth: "90%",
                                                    boxShadow: `2px 2px 20px grey, -2px 2px 20px grey`,
                                                    margin: "20px",
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </>
                    }
                </Box>
            </Modal>
        </>
    )
}
