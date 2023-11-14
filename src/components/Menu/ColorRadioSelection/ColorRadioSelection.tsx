import React from "react";
import ColorRadioButton from "../ColorSelector/ColorRadioButton";

interface ColorRadioSelectionProps {
    name: string,
    handleChange: (value: string) => void
    value: string,
    options: string[]
    direction: "row" | "column"
}

export default function ColorRadioSelection(props: ColorRadioSelectionProps) {

    function handleChecked(value: string) {
        props.handleChange(value)
    }

    return (
        <>
            <div style={{ display: "flex", flexDirection: props.direction }} >
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