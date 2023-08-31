import React, { useContext, useEffect, useState } from "react";
import { courseInfo, meetingTime } from "../data/course.model";
import CourseInfoForm from "./CourseInfoForm";
import Collapsible from "./Collapsible";
import EditIcon from '@mui/icons-material/Edit';
import { SettingsContext } from "../context/settingsContext";
import { days } from "../data/course.model";
import dayjs from "dayjs";

export default function CourseList() {

    // Pull data from local storage

    const [coursesData, setCoursesData] = useState(getCoursesData())
    const setting = useContext(SettingsContext)

    function formatDaysSelection(meetingTime: meetingTime) {
        const newDaysSelection: days = {};
        if (setting.daysRange.mon) {
            newDaysSelection.mon = meetingTime.days.mon ? meetingTime.days.mon : false;
        }
        if (setting.daysRange.tue) {
            newDaysSelection.tue = meetingTime.days.tue ? meetingTime.days.tue : false;
        }
        if (setting.daysRange.wed) {
            newDaysSelection.wed = meetingTime.days.wed ? meetingTime.days.wed : false;
        }
        if (setting.daysRange.thu) {
            newDaysSelection.thu = meetingTime.days.thu ? meetingTime.days.thu : false;
        }
        if (setting.daysRange.fri) {
            newDaysSelection.fri = meetingTime.days.fri ? meetingTime.days.fri : false;
        }
        if (setting.daysRange.sat) {
            newDaysSelection.sat = meetingTime.days.sat ? meetingTime.days.sat : false;
        }
        if (setting.daysRange.sun) {
            newDaysSelection.sun = meetingTime.days.sun ? meetingTime.days.sun : false;
        }

        return newDaysSelection
    }

    function formatMeetingTimes(meetingTimes: meetingTime[]) {
        let newMeetingTimes = []
        for (const meetingTime of meetingTimes) {
            meetingTime.days = formatDaysSelection(meetingTime)
            meetingTime.startTime = dayjs(meetingTime.startTime)
            meetingTime.endTime = dayjs(meetingTime.endTime)
            newMeetingTimes.push(meetingTime)
        }
        return newMeetingTimes
    }

    function getCoursesData() {
        let newCoursesData = [];

        const localCoursesData = localStorage.getItem("coursesInfo");

        if (localCoursesData != null) {
            newCoursesData = JSON.parse(localCoursesData)
        }

        return newCoursesData

    }

    useEffect(() => {
        const handleStorageChange = () => {
            const newCoursesData = getCoursesData();
            setCoursesData(newCoursesData);
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        }
    }, [])



    return (
        <>
            {
                coursesData.map((course: courseInfo) => {
                    return (
                        <Collapsible
                            key={course.id}
                            title={course.courseCode}
                            component={<CourseInfoForm key={course.id} id={course.id} courseCode={course.courseCode} backgroundColour={course.backgroundColour} meetingTimes={formatMeetingTimes(course.meetingTimes)} existed={true} />}
                            icon={<EditIcon sx={{ position: "absolute", right: "4%" }} />}
                            backgroundColor={course.backgroundColour}
                        />)

                })}
        </>
    )
}