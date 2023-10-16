import React from "react";
import { capitalize } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup';
import { daysSelection } from "../../../interfaces/coursesInterfaces";
import { DaysRange } from "../../../interfaces/settingsInterfaces";

interface daysSelectionProps<T extends daysSelection | DaysRange> {
    days: T,
    handleChange: (name: string, value: T) => void;
}

export default function DaysSelection<T extends daysSelection | DaysRange>(props: daysSelectionProps<T>) {
    const { days, handleChange } = props;

    const handleDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDays = {
            ...days,
            [event.target.name]: event.target.checked,
        }

        handleChange("days", newDays)
    }

    return (
        <>
            <FormGroup row>
                {Object.keys(days).map((day) => (
                    <FormControlLabel
                        key={day}
                        control={<Checkbox onChange={handleDayChange} name={day} checked={days[day as keyof T] as boolean} />}
                        label={capitalize(day)}
                        labelPlacement='bottom'
                        sx={{ m: 0 }}
                    />
                ))}
            </FormGroup>
        </>
    )
}