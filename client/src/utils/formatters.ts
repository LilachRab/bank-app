export const formatCurrency = (amount: number) => {
    const hasDecimal = amount % 1 !== 0;
    const formatted = new Intl.NumberFormat('he-IL', {
        style: 'currency',
        currency: 'ILS',
        minimumFractionDigits: hasDecimal ? 2 : 0,
        maximumFractionDigits: 2,
    }).format(amount);

    return formatted;
};
