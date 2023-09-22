import { createSlice } from "@reduxjs/toolkit"
import dayjs, { Dayjs } from 'dayjs';

export interface days {
    mon?: boolean,
    tue?: boolean,
    wed?: boolean,
    thu?: boolean,
    fri?: boolean,
    sat?: boolean,
    sun?: boolean
}

export interface meetingTime {
    courseType: string,
    location: string,
    startTime: Dayjs,
    endTime: Dayjs
    days: days
}

export interface courseInfo {
    id: string,
    courseCode: string,
    backgroundColour: string,
    meetingTimes: meetingTime[],
    existed: boolean
}

// const initialCourses = localStorage.getItem("courses")
// const initialState = [] as courseInfo[];

const coursesSlice = createSlice({
    name: 'courses',
    initialState: [] as courseInfo[],
    reducers: {
        addCourse(state, action) {
            const newCourse = action.payload
            console.log("addCourse")

            if (newCourse.existed) {
                const index = state.findIndex((oldCourse: courseInfo) => oldCourse.id === newCourse.id)
                state[index] = Object.assign({}, state[index], newCourse)
            } else {
                state.push(newCourse)
                console.log("after state")
            }

            localStorage.setItem("courses", JSON.stringify(state))
        },
        removeCourse(state, action) {
            const index = state.findIndex((course: courseInfo) => course.id === action.payload)
            state.splice(index, 1)
            localStorage.setItem("courses", JSON.stringify(state))
        },
        fetchCourses(state) {
            console.log("fetch courses")
            const localCourses = localStorage.getItem("courses")
            if (localCourses) {
                const courses: courseInfo[] = JSON.parse(localCourses)
                console.log("localCourses" + courses)
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
