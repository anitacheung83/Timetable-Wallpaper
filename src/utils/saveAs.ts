import html2canvas from "html2canvas";


// Function to generate a base64 representation of a timetable image
export async function generateBase64Image(backgroundColor?: string) {

    const input = document.getElementById("TimetableBackground");
    const canvas = await html2canvas(input!, {
        scale: 6,
        backgroundColor: backgroundColor,
        width: input!.offsetWidth,
        height: input!.offsetHeight
    });
    return canvas.toDataURL('image/png');
}
