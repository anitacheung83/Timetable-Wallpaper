import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import LandingPageIphone from "../assets/LandingPageIphone.png"
import LandingPageIpad from "../assets/LandingPageIpad.png"
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { motion } from "framer-motion"

interface LandingPageProps {
    handleCreateNow: () => void
}

export default function LandingPage(props: LandingPageProps) {
    function handleCreateNow() {
        props.handleCreateNow()
    }
    const variants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 }
    }

    return (
        <>
            <div>
                <Navbar />
                <Grid container direction="row" sx={{ minHeight: "90vh", overflow: "hidden" }}>
                    <Grid item xs={12} md={6} direction="column" className="center">
                        <div style={{ padding: "0vw 4vw 10vw 8vw" }}>
                            <Typography variant="h3" sx={{ py: "10vh" }}> Timetables That Perfectly Fit Your Iphone and Ipad Lockscreen</Typography>
                            <Button variant="contained" color="info" size="large" onClick={handleCreateNow}> Create Now</Button>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} style={{ display: "flex", alignItems: "center" }}>
                        <motion.div
                            initial="initial"
                            animate="animate"
                            transition={{ staggerChildren: 1 }}
                            style={{ position: "relative" }}>

                            <motion.img
                                variants={variants}
                                src={LandingPageIpad}
                                alt="Landing Page Ipad"
                                height="820px" />
                            <motion.img
                                variants={variants}
                                src={LandingPageIphone}
                                alt="Landing Page Iphone"
                                height="600px"
                                style={{ position: "absolute", left: "-320px", top: "190px" }} />

                        </motion.div>
                    </Grid>
                </Grid>
                <Footer />

            </div>
        </>
    )
}