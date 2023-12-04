import React, { useState } from "react";

import ColorPalettes from "./ColorPalettes/ColorPalettes";
import { FIJI, SESAME } from "../../../data/themeConstants";

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
                                theme={SESAME}
                                handleChange={handleChecked}
                                checked={theme === "Sesame"} />
                        </td>
                        <td>
                            <ColorPalettes
                                theme={FIJI}
                                handleChange={handleChecked}
                                checked={theme === "Fiji"} />
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