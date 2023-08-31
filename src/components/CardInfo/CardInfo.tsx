import React from 'react';
import { Card } from 'react-bootstrap';
import classes from './cardInfo.module.css';
import { SystemItem } from '../SystemItem/SystemItem';
import toStringRuDate from '../../utils/toStringRuDate';

interface ICardInfo {
    thumbnail: string;
    short_description: string;
    publisher: string;
    developer: string;
    genre: string;
    release_date: string;
    id: number;
    minimum_system_requirements: {
        os: string,
        processor: string,
        memory: string,
        graphics: string,
        storage: string
    } ;
}

interface ICardProps {
    card: ICardInfo;
}



export const CardInfo = ({ card }: ICardProps) => {
    const ruDate = toStringRuDate(card.release_date);

    return (
        <>
            {card &&  (
                <Card className={classes.card} key={card.id}>
                    <Card.Img src={card?.thumbnail} />
                    <Card.Body className={classes.card__body}>
                        <Card.Text>
                            {`${card?.short_description}`}
                            
                            <div className={classes.card__info}>
                                <div className={classes.card__genre}>
                                    <div>
                                        {`Жанр:`}
                                    </div> 
                                    <div className={classes.info}>
                                        {card?.genre}
                                    </div>
                                </div>
                                <div className={classes.card__date}>
                                    <div>
                                        {`Дата выхода:`} 
                                    </div>
                                    <div className={classes.info}>
                                        {ruDate}
                                    </div>
                                </div>
                                <div className={classes.card__developer}>
                                    <div>
                                        {`Разработчик:`}
                                    </div> 
                                    <div className={classes.info}>
                                        {card?.developer}
                                    </div>
                                </div>
                                <div className={classes.card__publisher}>
                                    <div>
                                        {`Издатель:`}
                                    </div>
                                    <div className={classes.info}>
                                        {card?.publisher}
                                    </div>
                                </div>
                            </div>
                            <SystemItem system_requirements={card.minimum_system_requirements} />
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
        </>
    );
};
