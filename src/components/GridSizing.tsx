import React from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import GridSizingCSS from "../assets/gridSizing.module.css"
import Typography from "@mui/material/Typography";

interface GridSizingProps {
    title: string,
    value: number,
    handleChange: React.Dispatch<React.SetStateAction<number>>
}

export default function GridSizing(props: GridSizingProps) {

    function incrementSize() {
        props.handleChange((prevValue) => prevValue + 1)
    }

    function decrementSize() {
        props.handleChange((prevValue) => prevValue - 1)
    }

    return (
        <>
            <div className={GridSizingCSS.div}>

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