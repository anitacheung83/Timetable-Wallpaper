import React from "react";
import { motion } from "framer-motion"
import styles from "./PrintButton.module.css"
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PrintIcon from '@mui/icons-material/Print';


interface PrintButtonProps {
    variants: {
        hidden: { opacity: number },
        visible: { opacity: number }
    }
}

export default function PrintButton(props: PrintButtonProps) {
    function handlePrint() {
        window.print();
    }

    return (
        <>
            <motion.div
                className={styles.div}
                variants={props.variants}
            >

                <IconButton color="info" onClick={handlePrint} sx={{ width: "100%" }}>
                    <Typography variant="h4">Print</Typography>
                    <PrintIcon sx={{ position: "absolute", right: "4%" }} />
                </IconButton>

            </motion.div>

        </>
    )
}