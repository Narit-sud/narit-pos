export function convertToThailandTime(dateString: string): string {
    // Create date object from input string
    const date = new Date(dateString);

    // Add 7 hours for Thailand timezone
    const thailandTime = new Date(date.getTime() + 7 * 60 * 60 * 1000);

    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    };

    return thailandTime.toLocaleString("th-TH", options);
}

export function convertToThailandADTime(dateString: string): string {
    // Create date object from input string
    const date = new Date(dateString);

    // Add 7 hours for Thailand timezone
    const thailandTime = new Date(date.getTime() + 7 * 60 * 60 * 1000);

    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    };

    return thailandTime.toLocaleString("th-TH", options);
}
