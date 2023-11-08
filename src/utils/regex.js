const isValidDateFormatFR = (date) => {
    // Regex pour le format JJ/MM/AAAA
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/;
    return regex.test(date);
}

export { isValidDateFormatFR }