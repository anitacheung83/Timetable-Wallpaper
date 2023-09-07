import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { CssBaseline } from "@mui/material";
import FooterCSS from "../assets/footer.module.css"


export default function Footer() {
    return (
        <>
            <Box
                className="center"
                sx={{
                    backgroundColor: "#E6DDC6",
                    p: 3,
                }}
                component="footer"
            >
                <CssBaseline />

                <Container maxWidth="md">


                    <Typography variant="h6" color="text.primary" align="center">
                        About Us
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                        Welcome to Timetable Factory! <br />

                        At Timetable Factory, we're dedicated to keeping your life organized,
                        whether it's for your college schedule or daily routines.
                        We design stunning timetable wallpapers for your iPhone lock screen,
                        offering an easy-to-use timetable builder and customizable templates
                        to make your life simpler and more stylish, one wallpaper at a time.
                    </Typography>

                </Container>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    marginTop: 4
                }}>
                    <Typography variant="body2" color="text.primary" align="center">
                        Follow Us On

                    </Typography>
                    <Link
                        href="https://www.instagram.com/timetablefactory/"
                        color="inherit"
                        align="center"
                        sx={{ pl: 1, pr: 1 }}
                    >
                        <InstagramIcon />
                    </Link>
                </div>

                <Box mt={1}>
                    <Typography variant="body2" color="text.secondary" align="center">
                        {"Copyright © "}
                        <Link color="inherit" href="https://www.thetimetablefactory.com/">
                            School Is Factory
                        </Link>{" "}
                        {new Date().getFullYear()}
                        {"."} All right reserved.
                    </Typography>
                </Box>
            </Box>

        </>
    )
}