import React, { useContext, useState } from "react";
import Setting from "./Setting";
import { initialSetting, SettingProps } from "../data/setting.model";
import { SettingsContext } from "../context/settingsContext";

export default function RenderSetting() {
    const timetableSettings = useContext(SettingsContext)

    return (
        <>
            <Setting {...timetableSettings} />
        </>
    )
}