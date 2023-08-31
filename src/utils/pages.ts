interface ButtonData {
    type: 'prev' | 'next';
    label: string;
    disabled: boolean;
}

interface ButtonRange {
    prevButton: ButtonData;
    currentPage: number;
    nextButton: ButtonData;
}

export const calculateButtonRange = (currentPage: number, totalPages: number): ButtonRange => {
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
