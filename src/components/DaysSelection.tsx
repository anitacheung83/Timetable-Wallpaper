import React from "react";
import { capitalize } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup';
import { days } from "../data/course.model";

interface daysSelectionProps {
    days: days,
    handleChange: (name: string, value: days) => void;
}

export default function DaysSelection(props: daysSelectionProps) {
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
                {Object.keys(days).map((day: string) => (
                    <FormControlLabel
                        key={day}
                        control={<Checkbox onChange={handleDayChange} name={day} checked={days[day as keyof typeof days]} />}
                        label={capitalize(day)}
                        labelPlacement='bottom'
                        sx={{ m: 0 }}
                    />
                ))}
            </FormGroup>
        </>
    )
}