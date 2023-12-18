import html2canvas from "html2canvas";

// Function to generate a base64 representation of a timetable image
export async function generateBase64Image(device: string, id: number, scale: number, backgroundColor?: string) {
    const input = document.getElementById(`TimetableBackground${device}${id}`);
    input!.style.fontFeatureSettings = '"liga" 0';
    input!.style.letterSpacing = 'normal';
    const canvas = await html2canvas(input!, {
        scale: scale,
        backgroundColor: backgroundColor,
        width: input!.offsetWidth,
        height: input!.offsetHeight
    });
    return canvas.toDataURL('image/png');
}
