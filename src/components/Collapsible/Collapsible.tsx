import React, { ReactNode, useState } from "react";
import IconButton from '@mui/material/IconButton';
import { CollapseContext } from "../../context/collapseContext";
import { Typography } from "@mui/material";
import CollapsibleCSS from "./collapsible.module.css"

interface CollapsibleProps {
    title: string,
    component: JSX.Element,
    icon: unknown,
    backgroundColor: string
    isCourse: boolean
}


export default function Collapsible(props: CollapsibleProps) {
    const [collapse, setCollapse] = useState(true)
    const backgroundColor = props.backgroundColor

    function handleClick() {
        setCollapse(prev => !prev)
    }

    return (
        <>
            <CollapseContext.Provider value={{ collapse, setCollapse }}>
                <div className={CollapsibleCSS.div} style={{ backgroundColor: props.isCourse || !collapse ? backgroundColor : 'transparent' }}>

                    <IconButton aria-label="collapse" color="info" onClick={handleClick} sx={{ width: "100%" }}>
                        <Typography variant="h4">{props.title}</Typography>

                        {props.icon as ReactNode}
                    </IconButton>

                </div>
                {!collapse && props.component}
            </CollapseContext.Provider>

        </>
    )
}