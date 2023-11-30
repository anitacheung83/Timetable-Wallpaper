import React from "react";
import { render, screen } from "@testing-library/react";
import DarkModeToggle from "./DarkModeToggle";
import { DarkModeContext } from "../../../context/DarkModeContext";

describe("DarkModeToggle", () => {
    test("renders light mode component", () => {
        // Arrange (set up the test) - render the component with the context provider
        const darkMode = true;
        const setDarkMode = jest.fn();

        render(
            <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
                <DarkModeToggle />
            </DarkModeContext.Provider>
        );

        expect(screen.getByTestId("light-mode")).toBeInTheDocument();
        expect(screen.queryByTestId("dark-mode")).not.toBeInTheDocument();
    });

    test("renders dark mode component", () => {
        const darkMode = false;
        const setDarkMode = jest.fn();

        render(
            <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
                <DarkModeToggle />
            </DarkModeContext.Provider>
        );

        expect(screen.getByTestId("dark-mode")).toBeInTheDocument();
        expect(screen.queryByTestId("light-mode")).not.toBeInTheDocument();
    });

    // test("clicking on light mode icon calls setDarkMode", () => {
    //     const darkMode = true;
    //     const setDarkMode = jest.fn();

    //     render(
    //         <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
    //             <DarkModeToggle />
    //         </DarkModeContext.Provider>
    //     );

    //     fireEvent.click(screen.getByTestId("light-mode")); // Simulate a click

    //     // Check if setDarkMode was called with the opposite value (toggling)
    //     expect(setDarkMode).toHaveBeenCalledWith(false);
    // });

    // test("clicking on dark mode icon calls setDarkMode", () => {
    //     const darkMode = false;
    //     const setDarkMode = jest.fn();

    //     render(
    //         <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
    //             <DarkModeToggle />
    //         </DarkModeContext.Provider>
    //     );

    //     fireEvent.click(screen.getByTestId("dark-mode")); // Simulate a click

    //     // Check if setDarkMode was called with the opposite value (toggling)
    //     expect(setDarkMode).toHaveBeenCalledWith(true);
    // });
});
