import React, { useEffect } from 'react';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Carousels } from '../components/Carousel/Carousel';
import { CardInfo } from '../components/CardInfo/CardInfo';
import { fetchGameInfo, getSavedGameInfoFromLocalStorage } from '../redux/slices/gameInfoSlice';
import { useAppDispatch } from '../redux/hooks/hooks';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ErrorPage } from './ErrorPage';
import { MAIN_ROUTE } from '../utils/consts';

export const GameInfo = () => {
    const navigat = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const gameId = parseInt(id || '0');
    const gameInfo = useSelector((state: any) => state.gameInfo);

    useEffect(() => {
        const savedGameInfo = getSavedGameInfoFromLocalStorage();
        
        if (gameId !== 0 && (!savedGameInfo || savedGameInfo.id !== gameId)) {
            dispatch(fetchGameInfo({ id: gameId }));
        }
    }, [dispatch, gameId]);

    if (!gameInfo || gameInfo.loading) {
        return <Spinner animation="grow" />;
    }

    if (gameInfo.error) {
        return <Navigate to="/error" />;

    }

    return (
        <Container className="gameInfo-Page">
            <Button onClick={() => navigat(-1)}>Назад</Button>
            <Row className="g-4 d-flex justify-content-between">
                <Col md={8}>
                    <Carousels imgs={gameInfo.game?.screenshots} />
                </Col>
                <Col md={4}>
                    <CardInfo card={gameInfo.game} />
                </Col>
            </Row>
        </Container>
    );
};
