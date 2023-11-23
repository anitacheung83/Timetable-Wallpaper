import React, { useState } from "react";
import style from "./Carousel.module.css";
import TimetableBackground from "../../../Timetable/TimetableBackground/TimetableBackground";
import Timetable from "../../../Timetable/Timetable";
import 'swiper/css';
import 'swiper/css/navigation';
import Device2 from "../../../Device/Device2";
import PaginationDots from "../PaginationDots/PaginationDots";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';

export default function Carousel() {
    const [currPage, setCurrPage] = useState(1)

    function handleSlideChange(swiper: any) {
        const { activeIndex } = swiper;
        setCurrPage(activeIndex + 1)

    }
    return (
        <>


            <Swiper
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
                onSlideChange={handleSlideChange}
            >
                <SwiperSlide>
                    <div className="center">
                        <Device2 />
                    </div>

                </SwiperSlide>
                <SwiperSlide>
                    <div className="center">
                        <Device2 />
                    </div>
                </SwiperSlide>

                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide>
                <PaginationDots numberOfPages={9} currPage={currPage} />
            </Swiper>

        </>
    )
}