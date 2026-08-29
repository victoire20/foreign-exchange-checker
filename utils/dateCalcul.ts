export function getSubtractDate(period: string) {
    const date = new Date();

    switch (period) {
        case 'd':
            date.setDate(date.getDate() - 1)
            break
        case 'w':
            date.setDate(date.getDate() - 7)
            break
        case 'm':
            date.setMonth(date.getMonth() - 1)
            break
        case '3m':
            date.setMonth(date.getMonth() - 3)
            break
        case 'y':
            date.setFullYear(date.getFullYear() - 1)
            break
        case '5y':
            date.setFullYear(date.getFullYear() - 5)
            break
        default:
            break
    }

    return date
}
