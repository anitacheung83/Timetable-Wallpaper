import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { settingsActions } from "../../../store/settings-slice";
import { getTimetable } from "../../../store/timetable-action";
import { useDispatch, useTypedSelector } from '../../../store';



export default function PickADevice() {
    const dispatch = useDispatch()

    function handleIpadClick() {
        dispatch(settingsActions.fetchSettings("ipad"))
        dispatch(getTimetable())

    }

    function handleIphoneClick() {
        dispatch(settingsActions.fetchSettings("iphone"))
        dispatch(getTimetable())
    }

    return (
        <>
            <div>
                <button onClick={handleIphoneClick}>Iphone</button>
                <button onClick={handleIpadClick}>Ipad</button>
            </div>
        </>
    )

}

