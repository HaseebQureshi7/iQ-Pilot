const ConvertTo12HourFormat = (hour24: number): string => {
    if (hour24 < 0 || hour24 > 23) {
        throw new Error('Invalid hour');
    }

    let hour12: number;
    let period: string;

    if (hour24 === 0) {
        hour12 = 12;
        period = 'AM';
    } else if (hour24 === 12) {
        hour12 = 12;
        period = 'PM';
    } else if (hour24 > 12) {
        hour12 = hour24 - 12;
        period = 'PM';
    } else {
        hour12 = hour24;
        period = 'AM';
    }

    return `${hour12} ${period}`;
};

export default ConvertTo12HourFormat;