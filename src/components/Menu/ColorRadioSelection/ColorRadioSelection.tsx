import React from "react";
import ColorRadioButton from "../ColorSelector/ColorRadioButton";

export interface ColorRadioSelectionProps {
    // name of the radio button
    name: string,
    // function to handle the change event
    handleChange: (value: string) => void
    // value of the radio button
    value: string,
    // list of options
    options: string[]
    // direction of the radio button
    direction: "row" | "column"
}

export default function ColorRadioSelection(props: ColorRadioSelectionProps) {
    // handle the change event
    function handleChecked(value: string) {
        props.handleChange(value)
    }

    return (
        <>
            <div style={{ display: "flex", flexDirection: props.direction }} >
                {
                    props.options.map(color => {
                        return (
                            <ColorRadioButton
                                key={color}
                                name={props.name}
                                id={props.name + color}
                                color={color}
                                handleChecked={handleChecked}
                                checked={props.value === color} />
                        )
                    })
                }
            </div>

        </>
    )
}