import React, { ReactNode, useState } from "react";
import IconButton from '@mui/material/IconButton';
import { CollapseContext } from "../context/collapseContext";

interface CollapsibleProps {
    title: string,
    component: JSX.Element,
    icon: unknown
}


export default function Collapsible(props: CollapsibleProps) {
    const [collapse, setCollapse] = useState(true)

    function handleClick() {
        setCollapse(prev => !prev)
    }

    return (
        <>
            <CollapseContext.Provider value={{ collapse, setCollapse }}>
                <div style={{ display: "flex", flexDirection: "row" }}>

                    {/* <h2> Add a Course</h2> */}
                    {/* <button onClick={handleClick}>
            <h2> Add a Course {props.icon as ReactNode} </h2>
            
        </button> */}
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