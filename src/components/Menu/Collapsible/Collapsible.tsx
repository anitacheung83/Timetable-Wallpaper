import React, { ReactNode, useState } from "react";
import IconButton from '@mui/material/IconButton';

//import context
import { CollapseContext } from "../../../context/collapseContext";
import { useDarkModeContext } from "../../../context/DarkModeContext";

//import MUI component
import Typography from "@mui/material/Typography";
//import framer motion
import { motion } from "framer-motion"
// import style
import style from "./collapsible.module.css"

interface CollapsibleProps {
    // Title of the collapsible button
    title: string,
    // Component to be displayed when the collapsible button is clicked
    component: JSX.Element,
    // Icon to be displayed beside the title
    icon: unknown,
    // Background color of the collapsible button
    backgroundColor: string
    // Whether the collapsible button is for course or not
    isCourse: boolean
    // Variants of the animation for the collapsible button
    variants: {
        hidden: { opacity: number },
        visible: { opacity: number }
    }
}


export default function Collapsible(props: CollapsibleProps) {
    // get the dark mode state
    const { darkMode } = useDarkModeContext()
    // get the background color of the collapsible button
    const backgroundColor = props.backgroundColor
    // state to keep track of the collapse state
    const [collapse, setCollapse] = useState(true)
    // state to keep track of the hover state
    const [isHovered, setIsHovered] = useState(false)

    // style of the collapsible button
    const divStyle = {
        background: props.isCourse && !darkMode ? backgroundColor : "transparent",
        boxShadow: isHovered ? `2px 2px 20px ${props.isCourse ? backgroundColor : '#C2B8A3'}, -2px 2px 20px ${props.isCourse ? backgroundColor : '#C2B8A3'}` : "",
    }

    // handle the click event
    function handleClick() {
        setCollapse(prev => !prev)
    }

    // handle the mouse enter event
    function handleMouseEnter() {
        setIsHovered(true)

    }
    // handle the mouse leave event
    function handleMouseLeave() {
        setIsHovered(false)
    }

    return (
        <>
            <CollapseContext.Provider value={{ collapse, setCollapse }}>

                {/* Collapsible Button */}
                <motion.div
                    className={`${style.div} ${darkMode && style.darkModeDiv}`}
                    style={divStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    variants={props.variants}
                    data-testid="collapsible">
                    <IconButton
                        aria-label="collapse"
                        color="info"
                        onClick={handleClick}
                        sx={{ width: "100%" }}
                        data-testid="collapsibleButton">
                        <Typography variant="h4" sx={{ color: `${darkMode && backgroundColor}` }}>{props.title}</Typography>

                        {props.icon as ReactNode}
                    </IconButton>
                </motion.div>

                {/* Collapsible Component */}
                {!collapse &&
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        data-testid="collapsibleContent">
                        {props.component}
                    </motion.div>}
            </CollapseContext.Provider>

        </>

    )
}