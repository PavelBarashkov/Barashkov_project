import React from "react";
import { calculateButtonRange } from "../../utils/pages";
import classes from './pagitation.module.css'


interface PaginationProps {
    currentPage: number;
    totalPages: number;
    handlerBtnNext: () => void;
    handlerBtnPrevious: () => void;
}

export const Pagination = ({currentPage, totalPages, handlerBtnNext, handlerBtnPrevious}: PaginationProps) => {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className={classes.container}>
        {calculateButtonRange(currentPage, totalPages).prevButton && (
            <button
                className={classes.btn}
                onClick={() => {
                    handlerBtnPrevious();

                    scrollToTop();
                } }
                disabled={calculateButtonRange(currentPage, totalPages).prevButton.disabled}
            >
                {calculateButtonRange(currentPage, totalPages).prevButton.label}
            </button>
        )}

        <span className={classes.count}>
            {calculateButtonRange(currentPage, totalPages).currentPage} / {totalPages}
        </span>

        {calculateButtonRange(currentPage, totalPages).nextButton && (
            <button
                className={classes.btn}
                onClick={() => {
                    handlerBtnNext();
                    
                    scrollToTop();
                }}
                disabled={calculateButtonRange(currentPage, totalPages).nextButton.disabled}
            >
                {calculateButtonRange(currentPage, totalPages).nextButton.label}
            </button>
        )}
    </div>
    )
}
