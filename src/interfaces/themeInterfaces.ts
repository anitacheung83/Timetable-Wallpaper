interface ThemeColor {
    COLOR: string
    USED: boolean
}

interface ThemeColors {
    COLOR1: ThemeColor,
    COLOR2: ThemeColor,
    COLOR3: ThemeColor,
    COLOR4: ThemeColor,
    COLOR5: ThemeColor,
    COLOR6: ThemeColor,
    COLOR7: ThemeColor,
    COLOR8: ThemeColor,
    COLOR9: ThemeColor,

}

export interface ThemeState {
    TITLE: string,
    COLORS: ThemeColors
}

export interface ThemesState {
    FIJI: ThemeState,
    SESAME: ThemeState,
}