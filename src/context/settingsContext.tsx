import React, { createContext, useState, useEffect } from 'react';
import { days } from "../data/course.model";
import dayjs, { Dayjs } from "dayjs";

export interface DaysRange {
    mon: boolean,
    tue: boolean,
    wed: boolean,
    thu: boolean,
    fri: boolean,
    sat: boolean,
    sun: boolean,
}

export interface TimetableSettings {
    daysRange: DaysRange,
    startTime: Dayjs,
    endTime: Dayjs,
    backgroundColor: string,
    headerColor: string,
    courseGridWidth: number,
    courseGridHeight: number,
    clockType: '12 Hour' | '24 Hour',
    displayTime: boolean
}

const initialDays = {
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: false,
    sun: false
}

const initialSettings: TimetableSettings = {
    daysRange: initialDays,
    startTime: dayjs('2022-04-17T09:00'),
    endTime: dayjs('2022-04-17T18:00'),
    backgroundColor: "#E6DDC6",
    headerColor: "#C2B8A3",
    courseGridWidth: 49,
    courseGridHeight: 49,
    clockType: '12 Hour',
    displayTime: true
}

// Create the context
const SettingsContext = createContext<TimetableSettings>(initialSettings);

// Create the context provider
const SettingsContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [settings, setSettings] = useState(getSettings())

    function getSettings() {

        let newSetting = initialSettings

        const localSetting = localStorage.getItem("setting")

        if (localSetting != null) {
            newSetting = JSON.parse(localSetting)
        }

        return newSetting
    }

    useEffect(() => {
        const handleSettingChange = () => {
            const newSetting = getSettings()
            setSettings(newSetting)
        };

        window.addEventListener('setting', handleSettingChange)

        return () => {
            window.removeEventListener('setting', handleSettingChange);
        }
    }, [])




    return (
        <SettingsContext.Provider value={settings}>
            {children}
        </SettingsContext.Provider>
    );
}

export { SettingsContext, SettingsContextProvider };
