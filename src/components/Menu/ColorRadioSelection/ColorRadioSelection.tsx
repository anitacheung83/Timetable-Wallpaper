import React from "react";
import Typography from "@mui/material/Typography";
import ColorRadioButton from "../ColorSelector/ColorRadioButton";
import Stack from "@mui/material/Stack";

interface ColorRadioSelectionProps {
    name: string,
    handleChange: (value: string) => void
    value: string,
    options: string[]
}

export default function ColorRadioSelection(props: ColorRadioSelectionProps) {

    function handleChecked(value: string) {
        props.handleChange(value)
    }

    return (
        <>
            <div>
                <p>Text Color</p>
                {
                    props.options.map(color => {
                        return (
                            <ColorRadioButton name={props.name} id={props.name + color} color={color} handleChecked={handleChecked} checked={props.value === color} />
                        )
                    })
                }
            </div>

        </>
    )
}