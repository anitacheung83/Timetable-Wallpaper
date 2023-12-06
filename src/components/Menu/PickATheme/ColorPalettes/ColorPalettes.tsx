import React, { useState } from "react";
//MUI import

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import CardActionArea from "@mui/material/CardActionArea";
import { useDarkModeContext } from "../../../../context/DarkModeContext";
import { ThemeState } from "../../../../interfaces/themeInterfaces";
import { createTheme } from "@mui/material/styles";

interface ColorPalettesProps {
    theme: ThemeState
    handleChange: (value: string) => void
    checked: boolean
}

export default function ColorPalettes(props: ColorPalettesProps) {
    const checked = props.checked
    const { TITLE, SUBTITLE, COLORS } = props.theme

    const { darkMode } = useDarkModeContext()

    const theme = createTheme({
        components: {
            MuiPaper: {
                styleOverrides: {
                    root: {
                        // backgroundColor: "transparent",
                        borderColor: darkMode ? "#DAD6CE" : "black",
                        boxShadow: "none",

                    }
                }
            },
            MuiCardContent: {
                styleOverrides: {
                    root: {
                        padding: "10px"
                    }
                }
            }
        }
    });

    function handleChecked() {
        // setChecked(!checked)
        props.handleChange(props.theme.TITLE)
    }


    return (
        // <Button>


        <Card variant="outlined" sx={{
            backgroundColor: checked
                ? (darkMode ? "#DDDDDD66" : "#00000034")
                : undefined, // If not checked, use default background color
            "& .MuiPaper-root": {
                backgroundColor: "transparent"
            }
        }} >
            <CardActionArea onClick={handleChecked}>

                <CardContent>
                    <table style={{ borderSpacing: 0 }}>
                        <tbody>
                            <tr>
                                <td style={{ width: "40px", height: "40px", backgroundColor: COLORS[0], border: "none", padding: 0 }}>

                                </td>
                                <td style={{ width: "40px", height: "40px", backgroundColor: COLORS[1], border: "none", padding: 0 }}>

                                </td>
                                <td style={{ width: "40px", height: "40px", backgroundColor: COLORS[2], border: "none", padding: 0 }}>

                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: "40px", height: "40px", backgroundColor: COLORS[3], border: "none", padding: 0 }}>

                                </td>
                                <td style={{ width: "40px", height: "40px", backgroundColor: COLORS[4], border: "none", padding: 0 }}>

                                </td>
                                <td style={{ width: "40px", height: "40px", backgroundColor: COLORS[5], border: "none", padding: 0 }}>

                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: "40px", height: "40px", backgroundColor: COLORS[6], border: "none", padding: 0 }}>

                                </td>
                                <td style={{ width: "40px", height: "40px", backgroundColor: COLORS[7], border: "none", padding: 0 }}>

                                </td>
                                <td style={{ width: "40px", height: "40px", backgroundColor: COLORS[8], border: "none", padding: 0 }}>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Typography variant="h6">
                        {TITLE}
                    </Typography>
                    <Typography variant="subtitle2">
                        {SUBTITLE}
                    </Typography>
                </CardContent>
            </CardActionArea>


        </Card>
        //</Button>
    )
}