import React, { ReactNode } from "react";
import Collapsible from "../components/Collapsible";
import AddACourse from "../components/AddACourse";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CourseList from "../components/CourseList";


export default function Home() {
    return (
        <>
            <CourseList />
            <Collapsible title={"Add A Course"} component={<AddACourse />} icon={<AddCircleIcon />} />

        </>
    )
}