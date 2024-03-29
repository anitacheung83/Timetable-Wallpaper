import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import RedditIcon from '@mui/icons-material/Reddit';
import { useDarkModeContext } from "../../context/DarkModeContext";
import { CssBaseline } from "@mui/material";


export default function Footer() {
    const { darkMode } = useDarkModeContext()
    return (
        <>
            <Box
                className="center"
                sx={{
                    borderStyle: "solid none none none",
                    borderWidth: "1px",
                    borderColor: `${darkMode ? "#232323" : "#C2B8A3"}`,
                    p: 3,
                    flexShrink: 0
                }}
                component="footer"
            >
                <CssBaseline />

                <Container maxWidth="md">
                    <Typography
                        variant="h6"
                        align="center">
                        About Us
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center">
                        Welcome to Timetable Factory! <br />

                        At Timetable Factory, we're dedicated to keeping your life organized,
                        whether it's for your college schedule or daily routines.
                        We design stunning timetable wallpapers for your iPhone lock screen,
                        offering an easy-to-use timetable builder and customizable templates
                        to make your life simpler and more stylish, one wallpaper at a time.
                    </Typography>

                </Container>

                <div
                    className="centerR"
                    style={{
                        flexWrap: 'wrap',
                        marginTop: 4
                    }}>
                    <Typography variant="body2" color="text.primary" align="center">
                        Keep Updated With

                    </Typography>
                    <Link
                        href="https://youtu.be/EQz99Z4ZECY"
                        color="inherit"
                        align="center"
                        sx={{ pl: 1, pr: 1 }}
                    >
                        <YouTubeIcon />
                    </Link>
                    {/* <Link
                        href="https://www.instagram.com/timetablefactory/"
                        color="inherit"
                        align="center"
                        sx={{ pl: 1, pr: 1 }}
                    >
                        <InstagramIcon />
                    </Link> */}
                    {/* <Link
                        href="https://www.reddit.com/r/TheTimetableFactory/"
                        color="inherit"
                        align="center"
                        sx={{ pl: 1, pr: 1 }}
                    >
                        <RedditIcon />
                    </Link> */}
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