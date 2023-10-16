import { render, screen } from '@testing-library/react';
import DaysSelection from './DaysSelection';

describe('DaysSelection', () => {
    test('renders DaysSelection component', () => {
        //Arrange
        const daysSelectionProps = {
            handleChange: jest.fn(),
            days: {
                mon: false,
                tue: false,
                wed: false,
                thu: false,
                fri: false,
                sat: false,
                sun: false
            }
        }

        render(<DaysSelection {...daysSelectionProps} />)

        //Act
        //...nothing

        //Assert
        expect(screen.getByText('Mon')).toBeInTheDocument()
        expect(screen.getByText('Tue')).toBeInTheDocument()
        expect(screen.getByText('Wed')).toBeInTheDocument()
        expect(screen.getByText('Thu')).toBeInTheDocument()
        expect(screen.getByText('Fri')).toBeInTheDocument()
        expect(screen.getByText('Sat')).toBeInTheDocument()
        expect(screen.getByText('Sun')).toBeInTheDocument()

    })

    test('calls handleChange when the "Mon" button is clicked', () => {
        //Arrange
        const daysSelectionProps = {
            handleChange: jest.fn(),
            days: {
                mon: false,
                tue: false,
                wed: false,
                thu: false,
                fri: false,
                sat: false,
                sun: false
            }
        }

        render(<DaysSelection {...daysSelectionProps} />)
        //Act
        screen.getByText('Mon').click()

        //Assert

        expect(daysSelectionProps.handleChange).toHaveBeenCalledWith("days", { mon: true, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false })
    })
})