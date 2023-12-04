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
import { ThemeState, ThemeColors } from "../../../../interfaces/themeInterfaces";

interface ColorPalettesProps {
    theme: ThemeState
    handleChange: (value: string) => void
    checked: boolean
}

export default function ColorPalettes(props: ColorPalettesProps) {
    const checked = props.checked
    const { TITLE, SUBTITLE, COLORS } = props.theme

    const { darkMode } = useDarkModeContext()

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
        }} >
            <CardActionArea onClick={handleChecked}>

                <CardContent>
                    <table style={{ borderSpacing: 0 }}>
                        <tbody>
                            <tr>
                                <td style={{ width: "40px", height: "40px", backgroundColor: COLORS[1].HEX, border: "none", padding: 0 }}>

                                </td>
                                <td style={{ width: "40px", height: "40px", backgroundColor: COLORS[2].HEX, border: "none", padding: 0 }}>

                                </td>
                                <td style={{ width: "40px", height: "40px", backgroundColor: COLORS[3].HEX, border: "none", padding: 0 }}>

                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: "40px", height: "40px", backgroundColor: COLORS[4].HEX, border: "none", padding: 0 }}>

                                </td>
                                <td style={{ width: "40px", height: "40px", backgroundColor: COLORS[5].HEX, border: "none", padding: 0 }}>

                                </td>
                                <td style={{ width: "40px", height: "40px", backgroundColor: COLORS[6].HEX, border: "none", padding: 0 }}>

                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: "40px", height: "40px", backgroundColor: COLORS[7].HEX, border: "none", padding: 0 }}>

                                </td>
                                <td style={{ width: "40px", height: "40px", backgroundColor: COLORS[8].HEX, border: "none", padding: 0 }}>

                                </td>
                                <td style={{ width: "40px", height: "40px", backgroundColor: COLORS[9].HEX, border: "none", padding: 0 }}>

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