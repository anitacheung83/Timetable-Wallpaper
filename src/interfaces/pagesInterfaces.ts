import { Dayjs } from 'dayjs';

export interface Pages {
    pageNumber: number,
    startTime: Dayjs,
    endTime: Dayjs
}

export interface PagesState {
    numberOfPages: number,
    // currPage: number,
    pages: Pages[]
}

