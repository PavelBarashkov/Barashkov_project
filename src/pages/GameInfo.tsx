import React, { useEffect } from 'react';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Carousels } from '../components/Carousel/Carousel';
import { CardInfo } from '../components/CardInfo/CardInfo';
import { fetchGameInfo } from '../redux/slices/gameInfoSlice';
import { useAppDispatch } from '../redux/hooks/hooks';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ErrorPage } from './ErrorPage';
import { ERROR_ROUTE } from '../routes/consts';
import { MyButton } from '../components/MyButton/MyButton';
import { setStartPage } from '../redux/slices/gamesSlice';

export const GameInfo = () => {
    const navigat = useNavigate();
    const { game, error, loading } = useSelector((state: any) => state.gameInfo);

    const dispatch = useAppDispatch();
    const { id } = useParams();
    const gameId = parseInt(id || '0');

    useEffect(() => {
        dispatch(fetchGameInfo({ id: gameId }));
      }, [gameId, dispatch]);

if (loading) {
    return (
        <div>
            <Spinner animation="grow" />
        </div>
    );
}

if (error) {
    return <Navigate to={ERROR_ROUTE}/>
}

    return (
        <Container key={game?.id} className="gameInfo-Page">
            <MyButton onClick={() => {
                navigat(-1);
                dispatch(setStartPage());
            } }>Назад</MyButton>
            <Row className="g-4 d-flex justify-content-between">
                    <Col md={4}> 
                        {game ? <CardInfo card={game} /> : null}
                    </Col>
                <Col md={8}>
                    <Carousels imgs={game?.screenshots} />
                </Col>
            </Row>
        </Container>
    );
};
