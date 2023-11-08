import { createContext, useContext } from 'react';

interface DarkModeContextType {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined)

export function useDarkModeContext() {
    const darkModeContext = useContext(DarkModeContext)

    if (darkModeContext === undefined) {
        throw new Error("useDarkModeContext must be used with a DarkModeContext")
    }

    return darkModeContext;

}