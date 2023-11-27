import React, { useEffect } from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { settingsActions } from "../../../store/settings-slice";
import { getTimetable } from "../../../store/timetable-action";
import { RootState, useDispatch } from '../../../store';
import PickADeviceCSS from "./pickADevice.module.css"
import { getPages } from "../../../store/pages-action";
import { useSelector } from "react-redux";



export default function PickADevice() {
    const dispatch = useDispatch()
    const device = useSelector((state: RootState) => state.settings.device)
    const devices = ["iphone", "ipad", "letter", "a4"]

    useEffect(() => {
        dispatch(getPages())
        dispatch(getTimetable())
        dispatch(settingsActions.fetchSettings(device))
    }, [dispatch, device])

    function handleDeviceChange(deviceType: string) {
        dispatch(settingsActions.fetchSettings(deviceType))
    }

    return (
        <>
            <div className={`centerR ${PickADeviceCSS.div}`}>

                <div>
                    <ToggleButtonGroup aria-label="select device" color="info" value={device}>
                        {
                            devices.map((deviceType) => {
                                return (
                                    <ToggleButton key={deviceType} value={deviceType} aria-label={deviceType} onClick={() => handleDeviceChange(deviceType)}>{deviceType}</ToggleButton>
                                )
                            })
                        }
                    </ToggleButtonGroup>
                </div>
            </div>
        </>
    )

}

