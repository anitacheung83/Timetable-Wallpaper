import React, { ReactNode, useState } from "react";
import IconButton from '@mui/material/IconButton';
import { CollapseContext } from "../../../context/collapseContext";
import { Typography } from "@mui/material";
import CollapsibleCSS from "./collapsible.module.css"
import { motion } from "framer-motion"
import { useDarkModeContext } from "../../../context/DarkModeContext";

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
    const [isHovered, setIsHovered] = useState(false)
    const { darkMode, setDarkMode } = useDarkModeContext()

    const divStyle = {
        background: props.isCourse && !darkMode ? backgroundColor : "transparent",
        boxShadow: isHovered ? `2px 2px 20px ${backgroundColor}, -2px 2px 20px ${backgroundColor}` : "",
    }

    function handleClick() {
        setCollapse(prev => !prev)
    }

    function handleMouseEnter() {
        setIsHovered(true)

    }

    function handleMouseLeave() {
        setIsHovered(false)
    }

    return (
        <>
            <CollapseContext.Provider value={{ collapse, setCollapse }}>
                <motion.div
                    className={`${CollapsibleCSS.div} ${darkMode && CollapsibleCSS.darkModeDiv}`}
                    style={divStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    variants={props.variants}>
                    <IconButton
                        aria-label="collapse"
                        color="info"
                        onClick={handleClick}
                        sx={{ width: "100%" }}>
                        <Typography variant="h4" sx={{ color: `${darkMode && backgroundColor}` }}>{props.title}</Typography>

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
        // backgroundColor: props.isCourse || (!collapse && !darkMode) ? backgroundColor : 'transparent' 
    )
}