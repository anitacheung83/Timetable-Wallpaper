import React from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import GridSizingCSS from "./gridSizing.module.css"
import Typography from "@mui/material/Typography";

interface GridSizingProps {
    title: string,
    value: number,
    handleChange: (value: number) => void
}

export default function GridSizing(props: GridSizingProps) {

    function incrementSize() {
        props.handleChange(props.value + 1)
    }

    function decrementSize() {
        props.handleChange(props.value - 1)
    }

    return (
        <>
            <div className="centerR">

                <Typography variant="body1">{props.title}</Typography>


                <IconButton onClick={decrementSize}>
                    <RemoveIcon />
                </IconButton>

                <Typography variant="body1">{props.value}</Typography>

                <IconButton onClick={incrementSize}>
                    <AddIcon />
                </IconButton>
            </div>

        </>
    )

}