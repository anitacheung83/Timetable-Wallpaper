import React, { useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import GridSizingCSS from "../assets/gridSizing.module.css"

interface GridSizingProps {
    title: string
}

export default function GridSizing(props: GridSizingProps) {
    const [size, setSize] = useState(64)

    function incrementSize() {

    }

    function decrementSize() {

    }

    return (
        <>
            <div className={GridSizingCSS.div}>
                <h3>{props.title}</h3>

                <IconButton>
                    <RemoveIcon />
                </IconButton>
                <div>{size}</div>

                <IconButton>
                    <AddIcon />
                </IconButton>
            </div>

        </>
    )

}