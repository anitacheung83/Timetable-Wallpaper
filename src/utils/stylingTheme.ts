import { FIJI, SESAME } from "../data/themeConstants";

export function getTheme(theme: string) {
    switch (theme) {
        case "Fiji":
            return FIJI
        case "Sesame":
            return SESAME
        default:
            return SESAME

    }
}