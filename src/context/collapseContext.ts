import { createContext, useContext } from "react";

interface CollapseContextType {
    collapse: boolean;
    setCollapse: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CollapseContext = createContext<CollapseContextType | undefined>(undefined);

export function useCollapseContext() {
    const collapseContext = useContext(CollapseContext)

    if (collapseContext === undefined) {
        throw new Error("useCollapseContext must be used with a CollapseContext")
    }

    return collapseContext;

}