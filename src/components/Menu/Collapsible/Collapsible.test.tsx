import { render, screen, fireEvent } from '@testing-library/react';
import Collapsible from './Collapsible';
import ScienceIcon from '@mui/icons-material/Science';
import { DarkModeContext } from '../../../context/DarkModeContext';

describe('Collapsible', () => {
    test('renders Collapsible component', () => {
        //Arrange
        const collapsibleProps = {
            title: 'Test',
            component: <div>Test</div>,
            icon: <ScienceIcon data-testid="scienceIcon" />,
            backgroundColor: "#123123",
            isCourse: false,
            variants: {
                hidden: { opacity: 0 },
                visible: { opacity: 1 }
            }

        }
        render(
            <DarkModeContext.Provider value={{ darkMode: false, setDarkMode: () => { } }}>
                <Collapsible {...collapsibleProps} />
            </DarkModeContext.Provider>
        )
        //Act
        //... nothing

        //Assert
        expect(screen.getByText('Test')).toBeInTheDocument()
        expect(screen.getByTestId('collapsible')).toHaveStyle('background: transparent')
        expect(screen.queryByTestId('collapsibleContent')).not.toBeInTheDocument()
        expect(screen.getByTestId('scienceIcon')).toBeInTheDocument()

    })

    test('clicking on the collapsible button should show the collapsible content', () => {
        //Arrange
        const collapsibleProps = {
            title: 'Test',
            component: <div>Test</div>,
            icon: <ScienceIcon />,
            backgroundColor: "#123123",
            isCourse: false,
            variants: {
                hidden: { opacity: 0 },
                visible: { opacity: 1 }
            }

        }
        render(
            <DarkModeContext.Provider value={{ darkMode: false, setDarkMode: () => { } }}>
                <Collapsible {...collapsibleProps} />
            </DarkModeContext.Provider>
        )
        //Act
        const collapsibleButton = screen.getByTestId('collapsibleButton');
        fireEvent.click(collapsibleButton);

        //Assert
        const collapsibleContent = screen.getByTestId('collapsibleContent');
        expect(collapsibleContent).toBeInTheDocument();

        //Act
        fireEvent.click(collapsibleButton);

        //Assert
        expect(collapsibleContent).not.toBeInTheDocument();
    })


})