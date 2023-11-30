
import React, { useState, useRef, useEffect } from "react";
// import redux and required redux hooks
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from 'swiper';
import { useDispatch } from "../../../store/index"
import { settingsActions } from "../../../store/settings-slice";

// import Swiper and required modules
import 'swiper/css';
import 'swiper/css/navigation';

// import components
import Timetable from "../../Timetable/Timetable";
import PaginationDots from "../PaginationDots/PaginationDots";
import FinalTimetableBackground from "../../Timetable/FinalTimetableBackground/FinalTimetableBackground";

//import MUI component and icon
import IconButton from "@mui/material/IconButton";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function Carousel() {
    const dispatch = useDispatch();
    const numberOfPages = useSelector((state: RootState) => state.pages.numberOfPages)
    const device = useSelector((state: RootState) => state.settings.device)

    const swiperRef = useRef<SwiperType>();
    const [currPage, setCurrPage] = useState(1)

    const isPhone = window.innerWidth < 600;

    useEffect(() => {
        // fetch settings when the device changes
        dispatch(settingsActions.fetchSettings(device))
    }, [dispatch, device])

    // handle slide change event
    function handleSlideChange(swiper: any) {
        const { activeIndex } = swiper;
        setCurrPage(activeIndex + 1)

    }
    return (
        <>
            {/* Previous Button */}
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
            {/* Swipper Component */}
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
                                <div className="center">
                                    <FinalTimetableBackground id={page}>
                                        {page !== numberOfPages && <Timetable key={page} currPage={page} />}
                                    </FinalTimetableBackground>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
                <PaginationDots numberOfPages={numberOfPages} currPage={currPage} />

            </Swiper>
            {/* Next Button */}

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