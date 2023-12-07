import { render, screen } from '@testing-library/react';
import Widgets from './Widgets';

describe('Widgets', () => {
    test('renders Widget component', () => {

        //Arrange
        const WidgetsProps = {
            value: true,
            handleChange: jest.fn()
        }

        render(<Widgets {...WidgetsProps} />)

        //Act
        //...nothing

        //Assert
        expect(screen.getByText('Yes')).toBeInTheDocument()
        expect(screen.getByText('No')).toBeInTheDocument()
    })

    test('calls handleChange when the "Yes" button is clicked', () => {
        //Arrange
        const WidgetsProps = {
            value: false,
            handleChange: jest.fn()
        }

        render(<Widgets {...WidgetsProps} />)

        //Act
        screen.getByText('Yes').click()

        //Assert
        expect(WidgetsProps.handleChange).toHaveBeenCalledWith(true)
    })

    test('calls handleChange when the "No" button is clicked', () => {
        //Arrange
        const WidgetsProps = {
            value: true,
            handleChange: jest.fn()
        }

        render(<Widgets {...WidgetsProps} />)

        //Act
        screen.getByText('No').click()

        //Assert
        expect(WidgetsProps.handleChange).toHaveBeenCalledWith(false)
    })
})