export const calculateButtonRange = (currentPage: number, totalPages: number) => {
    return {
        prevButton: {
            type: 'prev',
            label: 'Назад',
            disabled: currentPage === 1
        },
        currentPage: currentPage,
        nextButton: {
            type: 'next',
            label: 'Вперед',
            disabled: currentPage === totalPages
        }
    };
};