import React, { useState } from "react";

import ColorPalettes from "./ColorPalettes/ColorPalettes";
import { FIJI, SESAME } from "../../../data/themeConstants";

import style from "./PickATheme.module.css"

import { useSelector } from "react-redux";

import { RootState, useDispatch } from "../../../store";

import { themeActions } from "../../../store/theme-slice";


export default function PickATheme() {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.theme)

    function handleChecked(value: string) {
        dispatch(themeActions.setTheme(value))
        console.log("Theme: " + value)
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