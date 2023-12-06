export interface ThemeState {
    TITLE: string,
    SUBTITLE: string,
    COLORS: string[]
    USED_COLORS: string[]
}

export interface ThemesState {
    FIJI: ThemeState,
    SESAME: ThemeState,
}