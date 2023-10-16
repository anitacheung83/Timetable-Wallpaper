import { render, screen } from '@testing-library/react';
import ClockType from './ClockType';

describe('ClockType', () => {
    test('renders ClockType component', () => {
        //Arrange
        const clockTypeProps = {
            value: "12 Hour" as "12 Hour" | "24 Hour",
            handleChange: jest.fn()
        }

        render(<ClockType {...clockTypeProps} />)

        //Act
        //...nothing

        //Assert
        expect(screen.getByText('12 Hour')).toBeInTheDocument()
        expect(screen.getByText('24 Hour')).toBeInTheDocument()
    })

    test('calls handleChange when the "12 Hour" button is clicked', () => {
        //Arrange

        const clockTypeProps = {
            value: "24 Hour" as "12 Hour" | "24 Hour",
            handleChange: jest.fn()
        }

        render(<ClockType {...clockTypeProps} />)

        //Act

        screen.getByText('12 Hour').click()

        //Assert
        expect(clockTypeProps.handleChange).toHaveBeenCalledWith("12 Hour")
    })

    test('calls handleChange when the "24 Hour" button is clicked', () => {
        //Arrange
        const clockTypeProps = {
            value: "12 Hour" as "12 Hour" | "24 Hour",
            handleChange: jest.fn()
        }

        render(<ClockType {...clockTypeProps} />)

        //Act
        screen.getByText('24 Hour').click()

        //Assert
        expect(clockTypeProps.handleChange).toHaveBeenCalledWith("24 Hour")
    })
})