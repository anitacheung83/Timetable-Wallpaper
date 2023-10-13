import { render, screen } from '@testing-library/react';
import ColorRadioButton from './ColorRadioButton'

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

        render(<ColorRadioButton {...colorRadioButtonProps} />)

        //Act
        //...nothing

        //Assert

        expect(screen.getByRole('radio')).toBeInTheDocument();

        const label = screen.getByTestId(colorRadioButtonProps.color);
        expect(label).toBeInTheDocument();
        expect(label).toHaveStyle({ backgroundColor: '#000000' })

    })

    test('call handleChecked function when clicked', () => {
        const colorRadioButtonProps = {
            name: 'black',
            id: 'black',
            color: '#000000',
            checked: true,
            handleChecked: jest.fn() //mock function
        }

        render(<ColorRadioButton {...colorRadioButtonProps} />)
        const label = screen.getByTestId('label');
        label.click();

        expect(colorRadioButtonProps.handleChecked).toHaveBeenCalledTimes(1);
    })
})