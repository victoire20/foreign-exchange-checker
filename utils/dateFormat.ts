export function dateFormat(dateString: string) {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const hourFixe = `${hours}:${minutes}`;

    const date = new Date(`${dateString}T${hourFixe}:00`);

    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }

    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const day = String(date.getDate()).padStart(2, '0');

    return `${month} ${day} ${hourFixe} CET`;
}

export function formatTimeAgo(dateInput: Date | string | number): string {
    const date = new Date(dateInput);
    const now = new Date();

    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 0 || isNaN(diffInSeconds)) {
        return "0s";
    }

    const ONE_MINUTE = 60;
    const ONE_HOUR = 3600;
    const ONE_DAY = 86400;
    const ONE_WEEK = 604800;

    if (diffInSeconds < ONE_MINUTE) {
        return `${diffInSeconds}s`;
    }

    if (diffInSeconds < ONE_HOUR) {
        const minutes = Math.floor(diffInSeconds / ONE_MINUTE);
        return `${minutes}m`;
    }

    if (diffInSeconds < ONE_DAY) {
        const hours = Math.floor(diffInSeconds / ONE_HOUR);
        return `${hours}h`;
    }

    if (diffInSeconds < ONE_WEEK) {
        const days = Math.floor(diffInSeconds / ONE_DAY);
        return `${days}d`;
    }

    if (diffInSeconds < ONE_WEEK * 4) {
        const weeks = Math.floor(diffInSeconds / ONE_WEEK);
        return `${weeks}w`;
    }

    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
}

export function getShortDate(period: string, dateInput: string): string {
    const date = new Date(dateInput)

    if (isNaN(date.getTime())) return "";

    const dayShort = date.toLocaleDateString('en-US', { weekday: 'short' });
    const day = String(date.getDate()).padStart(2, '0');
    const monthShort = date.toLocaleDateString('en-US', { month: 'short' });
    const year = date.getFullYear();

    switch (period) {
        case 'd':
            const heures = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${heures}:${minutes}`;

        case 'w':
        case 'm':
            return `${dayShort} ${day}`;

        case '3m':
            return `${dayShort} ${day} ${monthShort}`;

        case 'y':
        case '1y':
            return `${monthShort} ${year}`;

        case '5y':
            return `${monthShort} ${year}`;

        default:
            return "";
    }
}
