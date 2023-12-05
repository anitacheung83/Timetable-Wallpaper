export interface ThemeColor {
    HEX: string
    USED: boolean
}

export interface ThemeColors {
    1: ThemeColor,
    2: ThemeColor,
    3: ThemeColor,
    4: ThemeColor,
    5: ThemeColor,
    6: ThemeColor,
    7: ThemeColor,
    8: ThemeColor,
    9: ThemeColor,

}

export interface ThemeState {
    TITLE: string,
    SUBTITLE: string,
    COLORS: ThemeColors
}

export interface ThemesState {
    FIJI: ThemeState,
    SESAME: ThemeState,
}