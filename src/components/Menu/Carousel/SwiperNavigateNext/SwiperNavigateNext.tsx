import React from "react";
import { useSwiper } from 'swiper/react';
import IconButton from "@mui/material/IconButton";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface SwiperNavigateNextProps {
    className: string

}

export default function SwiperNavigateNext(props: SwiperNavigateNextProps) {
    const swiper = useSwiper();
    return (
        <>
            <IconButton onClick={() => swiper.slideNext()} sx={{ height: "40px", width: "40px" }} className="swiper-navigate-next">
                <NavigateNextIcon />
            </IconButton>
        </>
    )
}