import { createSlice } from "@reduxjs/toolkit"
import dayjs from 'dayjs';
import { courseInfo } from "../interfaces/coursesInterfaces";


// const initialCourses = localStorage.getItem("courses")
// const initialState = [] as courseInfo[];

const coursesSlice = createSlice({
    name: 'courses',
    initialState: [] as courseInfo[],
    reducers: {
        addCourse(state, action) {
            const newCourse = action.payload

            if (newCourse.existed) {
                const index = state.findIndex((oldCourse: courseInfo) => oldCourse.id === newCourse.id)
                state[index] = Object.assign({}, state[index], newCourse)
            } else {
                state.push(newCourse)
            }

            localStorage.setItem("courses", JSON.stringify(state))
        },
        removeCourse(state, action) {
            const index = state.findIndex((course: courseInfo) => course.id === action.payload)
            state.splice(index, 1)
            localStorage.setItem("courses", JSON.stringify(state))
        },
        fetchCourses(state) {
            const localCourses = localStorage.getItem("courses")
            if (localCourses) {
                const courses: courseInfo[] = JSON.parse(localCourses)
                for (const course of courses) {
                    for (const meetingTime of course.meetingTimes) {
                        meetingTime.startTime = dayjs(meetingTime.startTime)
                        meetingTime.endTime = dayjs(meetingTime.endTime)
                    }
                }
                return courses
            }
        },
    }
})

export const coursesActions = coursesSlice.actions;

export default coursesSlice.reducer

// [] as courseInfo[] || localStorage.getItem("courses")
