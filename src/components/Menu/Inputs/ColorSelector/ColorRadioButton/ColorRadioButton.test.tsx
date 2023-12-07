import { render, screen } from '@testing-library/react';
import ColorRadioButton from './ColorRadioButton'
import { DarkModeContext } from '../../../../../context/DarkModeContext';
import DarkMode from '@mui/icons-material/DarkMode';

describe('Color Radio Button Component', () => {
    test('renders color radio buton component', () => {
        //Arrange

        const colorRadioButtonProps = {
            name: 'black',
            id: 'black',
            color: '#000000',
            checked: true,
            handleChecked: jest.fn() //mock function
        }

        render(
            <DarkModeContext.Provider value={{ darkMode: false, setDarkMode: () => { } }}>

                <ColorRadioButton {...colorRadioButtonProps} />
            </DarkModeContext.Provider>
        )

        //Act
        //...nothing

        //Assert

        expect(screen.getByRole('radio')).toBeInTheDocument();

        const label = screen.getByTestId(colorRadioButtonProps.color);
        expect(label).toBeInTheDocument();
        expect(label).toHaveStyle({ boxShadow: `#000000 0px 0px 0px 3px inset, #00000066 0 0 .6vw 0` })

    })

    test('call handleChecked function when clicked', () => {
        const colorRadioButtonProps = {
            name: 'black',
            id: 'black',
            color: '#000000',
            checked: true,
            handleChecked: jest.fn() //mock function
        }

        render(
            <DarkModeContext.Provider value={{ darkMode: false, setDarkMode: () => { } }}>
                <ColorRadioButton {...colorRadioButtonProps} />
            </DarkModeContext.Provider>
        )
        const label = screen.getByTestId(colorRadioButtonProps.color);
        label.click();

        expect(colorRadioButtonProps.handleChecked).toHaveBeenCalledTimes(1);
    })
})