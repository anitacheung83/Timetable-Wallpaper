import React from "react";
import ColorRadioButton from "./ColorRadioButton/ColorRadioButton";
import ColorPicker from "./ColorPicker";

export interface ColorSelectorProps {
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

function ColorSelector(props: ColorSelectorProps) {

    // handle the change event
    function handleChecked(value: string) {
        props.handleChange(value)
    }

    return (
        <>
            <div style={{ display: "flex", flexDirection: props.direction }} >

                {
                    props.options.slice(0, 5).map(color => {
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
            <div style={{ display: "flex", flexDirection: props.direction }} >

                {
                    props.options.slice(5, 9).map(color => {
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


                <ColorPicker name={props.name} value={props.value} handleChange={props.handleChange} />
            </div>

        </>
    )
}

export default React.memo(ColorSelector)