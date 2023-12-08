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

    test('Hovering over the collapsible button should change the boxShadow', () => {
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
        const collapsible = screen.getByTestId('collapsible');
        fireEvent.mouseOver(collapsible);

        //Assert
        expect(collapsible).toHaveStyle('box-shadow: 2px 2px 20px #C2B8A3, -2px 2px 20px #C2B8A3')
        // isHovered ? `2px 2px 20px ${props.isCourse ? backgroundColor : '#C2B8A3'}, -2px 2px 20px ${backgroundColor}`
    })

    test('Hovering over isCourse collapsible button should change the boxShadow', () => {
        //Arrange
        const collapsibleProps = {
            title: 'Test',
            component: <div>Test</div>,
            icon: <ScienceIcon />,
            backgroundColor: "#123123",
            isCourse: true,
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
        const collapsible = screen.getByTestId('collapsible');
        fireEvent.mouseOver(collapsible);

        //Assert
        expect(collapsible).toHaveStyle('box-shadow: 2px 2px 20px #123123, -2px 2px 20px #123123')

    })

    test('Dark mode should have a transparent background color and darkModeDiv class', () => {
        // Arrange
        const collapsibleProps = {
            title: 'Test',
            component: <div>Test</div>,
            icon: <ScienceIcon />,
            backgroundColor: "#123123",
            isCourse: true,
            variants: {
                hidden: { opacity: 0 },
                visible: { opacity: 1 }
            }
        }

        render(
            <DarkModeContext.Provider value={{ darkMode: true, setDarkMode: () => { } }}>
                <Collapsible {...collapsibleProps} />
            </DarkModeContext.Provider>
        )

        // Act
        // ... nothing

        // Assert
        const collapsible = screen.getByTestId('collapsible');
        expect(collapsible).toHaveStyle('background: transparent')
        expect(collapsible).toHaveClass('darkModeDiv')
    })

    test('Hovering over dark mode collapsible button should change the boxShadow', () => {
        // Arrange

        const collapsibleProps = {
            title: 'Test',
            component: <div>Test</div>,
            icon: <ScienceIcon />,
            backgroundColor: "#123123",
            isCourse: true,
            variants: {
                hidden: { opacity: 0 },
                visible: { opacity: 1 }
            }
        }

        render(
            <DarkModeContext.Provider value={{ darkMode: true, setDarkMode: () => { } }}>
                <Collapsible {...collapsibleProps} />
            </DarkModeContext.Provider>
        )

        // Act
        fireEvent.mouseOver(screen.getByTestId('collapsible'));

        // Assert
        expect(screen.getByTestId('collapsible')).toHaveStyle('box-shadow: 2px 2px 20px #123123, -2px 2px 20px #123123')
    })




})