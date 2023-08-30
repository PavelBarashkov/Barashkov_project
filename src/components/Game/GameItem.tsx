import React from 'react'
import { Card, Col, ListGroup } from 'react-bootstrap'
import { IGame } from '../../models/IGame';
import classes from './game.module.css';

interface IGameProps {
    game: IGame;
    onClick: (e: any) => void
}

export const GameItem = ({game, ...props}: IGameProps) => {
    function isDate(str: string): string {
        const Date = str.split('-').reverse().join('.');
        return Date;
    }
    const ruDate = isDate(game.release_date);
    return (
        <Col {...props} md={4}  className="mb-4">
            <Card className={classes.card}>
                <Card.Img 
                    src={game.thumbnail}
                />
                <Card.Body  className={classes.body}>
                    <Card.Title>
                        {game.title}
                    </Card.Title>
                    <Card.Text className={classes.cardText}>
                        {`Издатель: ${game.publisher}`} 
                        <div className={classes.textInfo}>
                            <div>

                        {`Жанр: ${game.genre}`}
                            </div>
                            <div>

                        {`Релиз: ${ruDate}`}
                            </div>
                        </div>
                    </Card.Text>
                   
                </Card.Body>
            </Card>
        </Col>
    )
}