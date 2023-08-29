import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import classes from './carousel.module.css';

interface IImgsProps {
    id: number;
    image: string;
}

interface ICarouselsProps {
    imgs: IImgsProps[];
}

export const Carousels = ({ imgs }: ICarouselsProps) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleIndicatorClick = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <>
            <Carousel data-bs-theme="dark" activeIndex={activeIndex} onSelect={handleIndicatorClick}>
                {imgs && imgs.map((img, index) => (
                    <Carousel.Item key={img.id}>
                        <img
                            className="d-block w-100"
                            src={img.image}
                            alt={`Slide ${img.id}`}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
            <div className={classes.indicators}>
                {imgs && imgs.map((img, index) => (
                    <div className={`${classes.indicators_item} ${index === activeIndex ? classes.active : ''}`}>
                        <img
                            className={classes.indicators_img}
                            key={img.id}
                            src={img.image}
                            alt={`Indicator ${img.id}`}
                            onClick={() => handleIndicatorClick(index)}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};
