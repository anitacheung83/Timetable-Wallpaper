import React, { useState, useRef } from "react";
import Timetable from "../../Timetable/Timetable";
import 'swiper/css';
import 'swiper/css/navigation';
import PaginationDots from "../PaginationDots/PaginationDots";
import FinalTimetableBackground from "../../Timetable/FinalTimetableBackground/FinalTimetableBackground";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from 'swiper';
import IconButton from "@mui/material/IconButton";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function Carousel() {
    const [currPage, setCurrPage] = useState(1)
    const swiperRef = useRef<SwiperType>();
    const isPhone = window.innerWidth < 600;
    const numberOfPages = useSelector((state: RootState) => state.pages.numberOfPages)

    console.log("numberOfPages", numberOfPages)

    function handleSlideChange(swiper: any) {
        const { activeIndex } = swiper;
        setCurrPage(activeIndex + 1)

    }
    return (
        <>


            {
                !isPhone &&

                <IconButton
                    onClick={() => swiperRef.current?.slidePrev()}
                    sx={{ height: "40px", width: "40px" }}
                    className="swiper-navigate-prev"
                    color="info">
                    <NavigateBeforeIcon />
                </IconButton>
            }
            <Swiper
                className="mySwiper"
                navigation={{
                    prevEl: 'swiper-navigate-prev',
                    nextEl: 'swiper-navigate-next',
                }}
                onSlideChange={handleSlideChange}
                onBeforeInit={(swiper: SwiperType) => {
                    swiperRef.current = swiper;
                }}
            >
                {
                    Array.from({ length: numberOfPages }, (_, i) => i + 1).map((page) => {
                        return (
                            <SwiperSlide key={page}>
                                <div className="centerR">
                                    <FinalTimetableBackground id={page}>
                                        {page !== numberOfPages && <Timetable key={page} currPage={page} />}
                                        {/* <Timetable currPage={page} /> */}
                                    </FinalTimetableBackground>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }


                <PaginationDots numberOfPages={numberOfPages} currPage={currPage} />

            </Swiper>


            {
                !isPhone &&
                <IconButton
                    onClick={() => swiperRef.current?.slideNext()}
                    sx={{ height: "40px", width: "40px" }}
                    className="swiper-navigate-prev"
                    color="info">
                    <NavigateNextIcon />
                </IconButton>
            }


        </>
    )
}