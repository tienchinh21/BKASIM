function getMonthRange(targetDate = new Date()) {
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth(); // 0-11

    const startCurrent = new Date(year, month, 1);
    const endCurrent = new Date(year, month + 1, 0, 23, 59, 59);

    const startPrevious = new Date(year, month - 1, 1);
    const endPrevious = new Date(year, month, 0, 23, 59, 59);

    return {
        startCurrent,
        endCurrent,
        startPrevious,
        endPrevious
    };
}

module.exports = {
    getMonthRange
};

