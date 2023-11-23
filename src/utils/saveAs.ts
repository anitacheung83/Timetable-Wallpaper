import html2canvas from "html2canvas";


// Function to generate a base64 representation of a timetable image
export async function generateBase64Image(id: number, backgroundColor?: string) {
    const elementId = `TimetableBackground${id}`;
    console.log("elementId: ", elementId)
    const input = document.getElementById(`TimetableBackground${id}`);

    const canvas = await html2canvas(input!, {
        scale: 6,
        backgroundColor: backgroundColor,
        width: input!.offsetWidth,
        height: input!.offsetHeight
    });
    return canvas.toDataURL('image/png');
}
