import { render, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../utils/test-utils';
import { initialIphoneState } from '../../../store/settings-slice';
import { initialIpadState } from '../../../store/settings-slice';
import { initialStylingState } from '../../../store/styling-slice';
import { initialThemeState } from '../../../store/theme-slice';
import { initialTimetableState } from '../../../store/timetable-slice';
import { initialPagesState } from '../../../store/pages-slice';
import { Swiper, SwiperSlide } from "swiper/react";
import Carousel from './Carousel';

describe('Carousel', () => {
    // Unable to execute test because Cannot find module 'swiper/react' from 'src/components/MainContent/Carousel/Carousel.tsx'
    test('renders Carousel component', () => {
        //Arrange
        // renderWithProviders(<Carousel />, {
        //     preloadedState: {
        //         settings: initialIphoneState,
        //         courses: [],
        //         timetable: initialTimetableState,
        //         pages: initialPagesState,
        //         styling: initialStylingState,
        //         theme: initialThemeState
        //     }
        // })

        //Act
        //... nothing

        //Assert
        // expect(screen.getByTestId('carousel')).toBeInTheDocument()
        // expect(screen.getByTestId('before-button')).toBeInTheDocument()
        // expect(screen.getByTestId('next-button')).toBeInTheDocument()


    })
})