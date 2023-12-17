import React from "react";
import ColorPalettes from "./ColorPalettes/ColorPalettes";
import { MILK_TEA, SESAME } from "../../../../data/themeConstants";
import { useSelector } from "react-redux";
import { RootState, useDispatch } from "../../../../store";
import { setThemeColor } from "../../../../store/theme-action";

export default function PickATheme() {
    const dispatch = useDispatch();
    const { TITLE } = useSelector((state: RootState) => state.theme)

    // console.log("Select A Theme Rendered")
    function handleChecked(value: string) {
        // console.log("Select A Theme Handle Checked")
        dispatch(setThemeColor(value))
    }
    return (
        <div className="center menuItemContainer" data-testid="selectATheme">
            <table>
                <tbody>
                    <tr>
                        <td>
                            <ColorPalettes
                                theme={MILK_TEA}
                                handleChange={handleChecked}
                                checked={TITLE === "Milk Tea"} />
                        </td>
                        <td>
                            <ColorPalettes
                                theme={SESAME}
                                handleChange={handleChecked}
                                checked={TITLE === "Sesame"} />
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