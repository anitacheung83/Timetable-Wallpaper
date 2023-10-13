import { render, screen } from '@testing-library/react';
import GridSizing from './GridSizing';

describe('GridSizing', () => {
    test('renders GridSizing component', () => {
        //Arrange
        const GridSizingProps = {
            title: 'Course Grid Height',
            value: 49,
            handleChange: jest.fn(),
        }

        render(<GridSizing {...GridSizingProps} />)

        //Act
        //...nothing

        //Assert
        expect(screen.getByText('Course Grid Height')).toBeInTheDocument()
        expect(screen.getByText('49')).toBeInTheDocument()
    })

    test('increment value when the add button is clicked', () => {
        //Arrange
        const GridSizingProps = {
            title: 'Course Grid Height',
            value: 49,
            handleChange: jest.fn(),
        }

        render(<GridSizing {...GridSizingProps} />)

        //Act
        screen.getByTestId('add-button').click()

        //Assert
        expect(GridSizingProps.handleChange).toHaveBeenCalledWith(50)
    })

    test('decrement value when the remove button is clicked', () => {
        //Arrange
        const GridSizingProps = {
            title: 'Course Grid Height',
            value: 49,
            handleChange: jest.fn(),
        }

        render(<GridSizing {...GridSizingProps} />)

        //Act
        screen.getByTestId('remove-button').click()

        //Assert
        expect(GridSizingProps.handleChange).toHaveBeenCalledWith(48)
    })
})
