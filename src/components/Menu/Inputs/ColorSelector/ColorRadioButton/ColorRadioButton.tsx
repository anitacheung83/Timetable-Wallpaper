import React from "react";
import styles from "./colorRadioButton.module.css";
import { useDarkModeContext } from "../../../../../context/DarkModeContext";

interface ColorRadioButtonProps {
    // name of the radio button
    name: string,
    // id of the radio button
    id: string,
    // color of the radio button
    color: string,
    // whether the radio button is checked or not
    checked?: boolean,
    // function to handle the change event
    handleChecked: (value: string) => void
}

export default function ColorRadioButton(props: ColorRadioButtonProps) {
    const { darkMode } = useDarkModeContext();

    const shadowColor = darkMode ? "#DAD6CE66" : "#00000066"

    const style = {
        boxShadow: `${props.color} 0px 0px 0px 14px inset, ${shadowColor} 0 0 .6vw 0`
    }

    const styleChecked = {
        boxShadow: `${props.color} 0px 0px 0px 3px inset, ${shadowColor} 0 0 .6vw 0`
    }
    return (
        <>
            <input
                className={styles.radio}
                id={props.id}
                type="radio"
                name={props.name}
                value={props.color}
                defaultChecked={props.checked}
                onClick={() => props.handleChecked(props.color)}
            />
            <label htmlFor={props.id} className={styles.customRadio} style={props.checked ? styleChecked : style} data-testid={props.color}></label>
        </>
    );
}
