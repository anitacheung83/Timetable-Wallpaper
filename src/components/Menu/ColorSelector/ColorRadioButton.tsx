import React from "react";
import styles from "./colorRadioButton.module.css";

interface ColorRadioButtonProps {
    name: string,
    id: string,
    color: string,
    checked?: boolean,
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
                checked={props.checked}
                onClick={() => props.handleChecked(props.color)}
            />
            <label htmlFor={props.id} className={styles.customRadio} style={{ backgroundColor: props.color }} data-testId={props.color}></label>
        </>
    );
}
