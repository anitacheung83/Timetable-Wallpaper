
export function isColorDark(hexColor: string) {
    // Remove the "#" character if it's present
    hexColor = hexColor.replace("#", "");

    // Convert the hex color to RGB values
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);

    // Calculate the relative luminance using the WCAG formula
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // You can adjust this threshold to determine what you consider "dark" or "light"
    // A threshold of 128 is often used to determine a mid-range color
    const threshold = 128;

    return luminance < threshold;
}


