import React, { ReactNode, useState } from "react";
import IconButton from '@mui/material/IconButton';
import { CollapseContext } from "../../../context/collapseContext";
import { Typography } from "@mui/material";
import CollapsibleCSS from "./collapsible.module.css"
import { motion } from "framer-motion"

interface CollapsibleProps {
    title: string,
    component: JSX.Element,
    icon: unknown,
    backgroundColor: string
    isCourse: boolean
    variants: {
        hidden: { opacity: number },
        visible: { opacity: number }
    }
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
                <motion.div className={CollapsibleCSS.div} style={{ backgroundColor: props.isCourse || !collapse ? backgroundColor : 'transparent' }} variants={props.variants}>

                    <IconButton aria-label="collapse" color="info" onClick={handleClick} sx={{ width: "100%" }}>
                        <Typography variant="h4">{props.title}</Typography>

                        {props.icon as ReactNode}
                    </IconButton>

                </motion.div>
                {!collapse && <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}>
                    {props.component}
                </motion.div>}
            </CollapseContext.Provider>

        </>
    )
}