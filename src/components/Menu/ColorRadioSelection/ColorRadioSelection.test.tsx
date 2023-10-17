import { render, screen } from '@testing-library/react';
import ColorRadioSelection from './ColorRadioSelection';
import { Color } from 'html2canvas/dist/types/css/types/color';

describe('ColorRadioSelection', () => {
    test('renders ColorRadioSelection component', () => {
        //Arrange
        const ColorRadioSelectionProps = {
            name: 'test',
            handleChange: jest.fn(),
            value: '#b2d7f7',
            options: ['#f00a0a', '#f0710a', '#f0d50a', '#30f00a', '#b2d7f7', '#900af0']
        }

        render(<ColorRadioSelection {...ColorRadioSelectionProps} />)

        //Act
        //...nothing

        //Assert
        const options = ColorRadioSelectionProps.options

        options.forEach((option: string) => {
            expect(screen.getByTestId(option)).toBeInTheDocument()
        })

        //Check whether the correct color is selected
    })

})