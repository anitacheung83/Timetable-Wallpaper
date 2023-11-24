import React from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { settingsActions } from "../../../store/settings-slice";
import { getTimetable } from "../../../store/timetable-action";
import { useDispatch, useTypedSelector } from '../../../store';
import PickADeviceCSS from "./pickADevice.module.css"
import { getPages } from "../../../store/pages-action";



export default function PickADevice() {
    const dispatch = useDispatch()

    const device = useTypedSelector((state) => state.settings.device)

    async function handleIpadClick() {
        await dispatch(settingsActions.fetchSettings("ipad"))
        await dispatch(getPages())
        await dispatch(getTimetable())
    }

    async function handleIphoneClick() {
        await dispatch(settingsActions.fetchSettings("iphone"))
        await dispatch(getPages())
        await dispatch(getTimetable())
    }

    async function handleLetterClick() {
        await dispatch(settingsActions.fetchSettings("letter"))
        await dispatch(getPages())
        await dispatch(getTimetable())
    }

    async function handleA4Click() {
        await dispatch(settingsActions.fetchSettings("a4"))
        await dispatch(getPages())
        await dispatch(getTimetable())
    }

    return (
        <>
            <div className={`centerR ${PickADeviceCSS.div}`}>

                {/* <Typography variant="body1">Device:</Typography> */}
                <div>
                    <ToggleButtonGroup aria-label="select device" color="info" value={device}>
                        <ToggleButton value="iphone" aria-label="iphone" onClick={handleIphoneClick}>Iphone</ToggleButton>
                        <ToggleButton value="ipad" aria-label="ipad" onClick={handleIpadClick}>Ipad</ToggleButton>
                        <ToggleButton value="letter" aria-label="letter" onClick={handleLetterClick}>Letter (paper)</ToggleButton>
                        <ToggleButton value="a4" aria-label="letter" onClick={handleA4Click}>A4 (paper)</ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>
        </>
    )

}

