import React, { useEffect } from "react";
import { courseInfo } from "../../data/course.model";
import CourseInfoForm from "../../components/Menu/CourseInfoForm/CourseInfoForm";
import Collapsible from "../../components/Menu/Collapsible/Collapsible";
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { coursesActions } from "../../store/courses-slice";

export default function CourseList() {
    // Pull data from local storage
    const dispatch = useDispatch()
    const coursesData: courseInfo[] = useSelector((state: RootState) => state.courses)

    useEffect(() => {
        dispatch(coursesActions.fetchCourses())
        console.log("dispatch")
    }, [dispatch])

    return (
        <>
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
                        />

                    )

                })}
        </>
    )
}


// function formatDaysSelection(meetingTime: meetingTime) {
//     const newDaysSelection: days = {};
//     if (daysRange.mon) {
//         newDaysSelection.mon = meetingTime.days.mon ? meetingTime.days.mon : false;
//     }
//     if (daysRange.tue) {
//         newDaysSelection.tue = meetingTime.days.tue ? meetingTime.days.tue : false;
//     }
//     if (daysRange.wed) {
//         newDaysSelection.wed = meetingTime.days.wed ? meetingTime.days.wed : false;
//     }
//     if (daysRange.thu) {
//         newDaysSelection.thu = meetingTime.days.thu ? meetingTime.days.thu : false;
//     }
//     if (daysRange.fri) {
//         newDaysSelection.fri = meetingTime.days.fri ? meetingTime.days.fri : false;
//     }
//     if (daysRange.sat) {
//         newDaysSelection.sat = meetingTime.days.sat ? meetingTime.days.sat : false;
//     }
//     if (daysRange.sun) {
//         newDaysSelection.sun = meetingTime.days.sun ? meetingTime.days.sun : false;
//     }

//     return newDaysSelection
// }