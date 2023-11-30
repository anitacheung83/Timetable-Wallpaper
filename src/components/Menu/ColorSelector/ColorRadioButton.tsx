import React from "react";
import styles from "./colorRadioButton.module.css";

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
            <label htmlFor={props.id} className={styles.customRadio} style={{ backgroundColor: props.color }} data-testid={props.color}></label>
        </>
    );
}
