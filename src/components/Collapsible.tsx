import React, { ReactNode, useState } from "react";
import IconButton from '@mui/material/IconButton';
import { CollapseContext } from "../context/collapseContext";

interface CollapsibleProps {
    title: string,
    component: JSX.Element,
    icon: unknown,
    backgroundColor: string
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
                <div style={{ display: "flex", flexDirection: "row", backgroundColor: backgroundColor }}>

                    <IconButton aria-label="collapse" onClick={handleClick}>
                        <h3> {props.title}</h3>
                        {props.icon as ReactNode}
                    </IconButton>

                </div>
                {!collapse && props.component}
            </CollapseContext.Provider>

        </>
    )
}