import { render, screen } from '@testing-library/react';
import DisplayTime from './DisplayTime';

describe('DisplayTime', () => {
    test('renders DisplayTime component', () => {
        //Arrange

        const displayTimeProps = {
            value: true,
            handleChange: jest.fn()
        }

        render(<DisplayTime {...displayTimeProps} />)

        //Act
        //...nothing

        //Assert
        expect(screen.getByText('Yes')).toBeInTheDocument()
        expect(screen.getByText('No')).toBeInTheDocument()

    })

    test('calls handleChange when the "Yes" button is clicked', () => {
        //Arrange
        const displayTimeProps = {
            value: false,
            handleChange: jest.fn()
        }

        render(<DisplayTime {...displayTimeProps} />)

        //Act
        screen.getByText('Yes').click()

        //Assert
        expect(displayTimeProps.handleChange).toHaveBeenCalledWith(true)

    })

    test('calls handleChange when the "No" button is clicked', () => {
        //Arrange
        const displayTimeProps = {
            value: true,
            handleChange: jest.fn()
        }

        render(<DisplayTime {...displayTimeProps} />)

        //Act

        screen.getByText('No').click()

        //Assert
        expect(displayTimeProps.handleChange).toHaveBeenCalledWith(false)
    })
})