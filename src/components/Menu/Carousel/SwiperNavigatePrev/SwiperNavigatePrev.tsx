import React from "react";
import { useSwiper } from 'swiper/react';
import IconButton from "@mui/material/IconButton";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import 'swiper/css';
import 'swiper/css/navigation';

interface SwiperNavigateBeforeProps {
    className: string

}

export default function SwiperNavigateBefore(props: SwiperNavigateBeforeProps) {
    const swiper = useSwiper();
    return (
        <>
            <IconButton onClick={() => swiper.slidePrev()} sx={{ height: "40px", width: "40px" }} className="swiper-navigate-prev">
                <NavigateBeforeIcon />
            </IconButton>
        </>
    )
}