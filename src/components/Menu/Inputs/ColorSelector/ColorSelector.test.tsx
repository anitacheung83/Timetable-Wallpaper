import { render, screen } from '@testing-library/react';
import ColorSelector from './ColorSelector';
import { ColorSelectorProps } from './ColorSelector'
import { DarkModeContext } from '../../../../context/DarkModeContext';


describe('ColorSelector', () => {
    test('renders ColorRadioSelection component', () => {
        //Arrange
        const ColorSelectorProps: ColorSelectorProps = {
            name: 'test',
            handleChange: jest.fn(),
            value: '#b2d7f7',
            options: ['#f00a0a', '#f0710a', '#f0d50a', '#30f00a', '#b2d7f7', '#900af0'],
            direction: "row"
        }

        render(
            <DarkModeContext.Provider value={{ darkMode: false, setDarkMode: () => { } }}>
                <ColorSelector {...ColorSelectorProps} />
            </DarkModeContext.Provider>
        )

        //Act
        //...nothing

        //Assert
        const options = ColorSelectorProps.options

        options.forEach((option: string) => {
            expect(screen.getByTestId(option)).toBeInTheDocument()
        })

        //Check whether the correct color is selected
    })

})