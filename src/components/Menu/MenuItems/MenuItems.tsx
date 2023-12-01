import React, { useEffect } from "react";
import Collapsible from "../Collapsible/Collapsible";
import CourseInfoForm from "../CourseInfoForm/CourseInfoForm";

import DownloadButton from "../DownloadButton/DownloadButton";
import AddACourse from "../AddACourse";
import Setting from "../Setting/Setting";
import Styling from "../Styling/Styling";

import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DevicesIcon from '@mui/icons-material/Devices';
import StyleIcon from '@mui/icons-material/Style';
import ColorLensIcon from '@mui/icons-material/ColorLens';

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { courseInfo } from "../../../interfaces/coursesInterfaces";
import { coursesActions } from "../../../store/courses-slice";
import PickADevice from "../PickADevice/PickADevice";
import { motion } from "framer-motion"
import MenuItemCSS from "./menuItems.module.css"

import SaveAsPDF from "../SaveAsPDF/SaveAsPDF";
import PickATheme from "../PickATheme/PickATheme";


export default function MenuItems() {
    const dispatch = useDispatch()
    const coursesData: courseInfo[] = useSelector((state: RootState) => state.courses)

    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    }

    useEffect(() => {
        dispatch(coursesActions.fetchCourses())
    }, [dispatch])


    return (
        <motion.div
            className={MenuItemCSS.menu}
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
        >
            <Collapsible
                title={"Pick A Display"}
                component={<PickADevice />}
                icon={<DevicesIcon sx={{ position: "absolute", right: "4%" }} />}
                backgroundColor="#DAD6CE"
                isCourse={false}
                variants={variants} />

            <Collapsible
                title={"Pick A Theme"}
                component={<PickATheme />}
                icon={<ColorLensIcon sx={{ position: "absolute", right: "4%" }} />}
                backgroundColor="#DAD6CE"
                isCourse={false}
                variants={variants} />

            <Collapsible
                title={"Add A Course"}
                component={<AddACourse />}
                icon={<AddCircleIcon sx={{ position: "absolute", right: "4%" }} />}
                backgroundColor="#DAD6CE"
                isCourse={false}
                variants={variants} />
            {
                coursesData.map((course: courseInfo) => {
                    return (
                        <Collapsible
                            key={course.id}
                            title={course.courseCode}
                            component={<CourseInfoForm key={course.id} id={course.id} courseCode={course.courseCode} backgroundColour={course.backgroundColour} meetingTimes={course.meetingTimes} existed={true} />}
                            icon={<EditIcon sx={{ position: "absolute", right: "4%" }} />}
                            backgroundColor={course.backgroundColour}
                            isCourse={true}
                            variants={variants}
                        />
                    )
                })}

            <Collapsible
                title={"Styling"}
                component={<Styling />}
                icon={<StyleIcon sx={{ position: "absolute", right: "4%" }} />}
                backgroundColor="#DAD6CE"
                isCourse={false}
                variants={variants} />


            <Collapsible
                title={"Display Settings"}
                component={<Setting />}
                icon={<SettingsIcon sx={{ position: "absolute", right: "4%" }} />}
                backgroundColor="#DAD6CE"
                isCourse={false}
                variants={variants} />

            <DownloadButton variants={variants} />

            <SaveAsPDF variants={variants} />


        </motion.div>

    )
}