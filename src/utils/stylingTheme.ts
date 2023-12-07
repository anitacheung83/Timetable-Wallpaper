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

export function getAvaliableColors(colors: string[], used_colors: string[]) {
    const color = colors.filter(color => !used_colors.includes(color))[0]
    if (color) {
        return color
    }
    return colors[0]
}