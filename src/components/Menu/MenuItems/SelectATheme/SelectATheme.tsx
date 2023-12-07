import React from "react";
import ColorPalettes from "./ColorPalettes/ColorPalettes";
import { FIJI, SESAME } from "../../../../data/themeConstants";
import style from "./SelectATheme.module.css"
import { useSelector } from "react-redux";
import { RootState, useDispatch } from "../../../../store";
import { setThemeColor } from "../../../../store/theme-action";

export default function PickATheme() {
    const dispatch = useDispatch();
    const { TITLE } = useSelector((state: RootState) => state.theme)

    function handleChecked(value: string) {
        dispatch(setThemeColor(value))
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
                                checked={TITLE === "Sesame"} />
                        </td>
                        <td>
                            <ColorPalettes
                                theme={FIJI}
                                handleChange={handleChecked}
                                checked={TITLE === "Fiji"} />
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