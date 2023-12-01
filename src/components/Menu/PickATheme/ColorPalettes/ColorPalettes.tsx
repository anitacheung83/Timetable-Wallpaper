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

interface ColorPalettesProps {
    theme: string
    handleChange: (value: string) => void
    checked: boolean
}

export default function ColorPalettes(props: ColorPalettesProps) {
    const checked = props.checked

    const { darkMode } = useDarkModeContext()

    function handleChecked() {
        // setChecked(!checked)
        props.handleChange(props.theme)
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
                                <td style={{ width: "40px", height: "40px", backgroundColor: "black", border: "none", padding: 0 }}>

                                </td>
                                <td style={{ width: "40px", height: "40px", backgroundColor: "#112D4E", border: "none", padding: 0 }}>

                                </td>
                                <td style={{ width: "40px", height: "40px", backgroundColor: "#3F72AF", border: "none", padding: 0 }}>

                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: "40px", height: "40px", backgroundColor: "#DBE2EF", border: "none", padding: 0 }}>

                                </td>
                                <td style={{ width: "40px", height: "40px", backgroundColor: "#C4DFDF", border: "none", padding: 0 }}>

                                </td>
                                <td style={{ width: "40px", height: "40px", backgroundColor: "#D2E9E9", border: "none", padding: 0 }}>

                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: "40px", height: "40px", backgroundColor: "#E3F4F4", border: "none", padding: 0 }}>

                                </td>
                                <td style={{ width: "40px", height: "40px", backgroundColor: "#F8F6F4", border: "none", padding: 0 }}>

                                </td>
                                <td style={{ width: "40px", height: "40px", backgroundColor: "white", border: "none", padding: 0 }}>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Typography variant="h6">
                        Fiji
                    </Typography>
                    <Typography variant="subtitle2">
                        Color of the Fiji water
                    </Typography>
                </CardContent>
            </CardActionArea>


        </Card>
        //</Button>
    )
}