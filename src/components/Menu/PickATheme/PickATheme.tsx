import React, { useState } from "react";
// MUI import
import Card from "@mui/material/Card";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

import ColorPalettes from "./ColorPalettes/ColorPalettes";

import style from "./PickATheme.module.css"

export default function PickATheme() {
    const [theme, setTheme] = useState("fiji")

    function handleChecked(value: string) {
        setTheme(value)
    }
    return (
        <div className={`center ${style.div}`}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <ColorPalettes
                                theme="fiji"
                                handleChange={handleChecked}
                                checked={theme === "fiji"} />
                        </td>
                        <td>
                            <ColorPalettes
                                theme="seaseme"
                                handleChange={handleChecked}
                                checked={theme === "seaseme"} />
                        </td>
                    </tr>

                    <tr>
                        <td>

                        </td>
                        <td>

                        </td>
                    </tr>

                    <tr>
                        <td>

                        </td>
                        <td>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}