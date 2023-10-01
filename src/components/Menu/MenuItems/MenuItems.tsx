import React, { useEffect } from "react";
import Collapsible from "../Collapsible/Collapsible";
import CourseInfoForm from "../CourseInfoForm/CourseInfoForm";

import DownloadButton from "../DownloadButton/DownloadButton";
import AddACourse from "../AddACourse";
import Setting from "../Setting/Setting";

import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DevicesIcon from '@mui/icons-material/Devices';

import { useDispatch, useSelector } from "react-redux";
import { RootState, courseInfo } from "../../../store";
import { coursesActions } from "../../../store/courses-slice";
import PickADevice from "../PickADevice/PickADevice";
import { motion } from "framer-motion"

import MenuItemCSS from "./menuItems.module.css"



export default function MenuItems() {
    const dispatch = useDispatch()
    const coursesData: courseInfo[] = useSelector((state: RootState) => state.courses)

    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    }

    useEffect(() => {
        dispatch(coursesActions.fetchCourses())
        console.log("dispatch")
    }, [dispatch])


    return (
        <motion.div
            className={MenuItemCSS.menu}
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
        >

            <Collapsible
                title={"Pick A Device"}
                component={<PickADevice />}
                icon={<DevicesIcon sx={{ position: "absolute", right: "4%" }} />}
                backgroundColor="#C2B8A3"
                isCourse={false}
                variants={variants} />

            <Collapsible
                title={"Add A Course"}
                component={<AddACourse />}
                icon={<AddCircleIcon sx={{ position: "absolute", right: "4%" }} />}
                backgroundColor="transparent"
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
                title={"Setting"}
                component={<Setting />}
                icon={<SettingsIcon sx={{ position: "absolute", right: "4%" }} />}
                backgroundColor="#C2B8A3"
                isCourse={false}
                variants={variants} />
            <DownloadButton variants={variants} />
        </motion.div>

    )
}