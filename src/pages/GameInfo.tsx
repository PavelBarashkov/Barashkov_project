import React, { useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Carousels } from '../components/Carousel/Carousel';
import { CardInfo } from '../components/CardInfo/CardInfo';
import { GameInfoSlice, fetchGameInfo, getSavedGameInfoFromLocalStorage } from '../redux/slices/gameInfoSlice';
import { useAppDispatch } from '../redux/hooks/hooks';
import { useParams } from 'react-router-dom';

export const GameInfo = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const gameId = parseInt(id || '0'); 
    const gameInfo = useSelector((state: any) => state.gameInfo); 
    
  
    useEffect(() => {
        if (gameId !== 0) {
          const savedGameInfo = getSavedGameInfoFromLocalStorage();
          if (savedGameInfo) {
            dispatch(GameInfoSlice.actions.setCurrentRequest({})); 
            dispatch(GameInfoSlice.actions.setCurrentRequest({ game: savedGameInfo })); 
          } else {
            dispatch(fetchGameInfo({ id: gameId }));
          }
        }
      }, [dispatch, gameId]);
      
  
    if (!gameInfo || gameInfo.loading) {
      return <Spinner animation="grow" />;
    }
  
    if (gameInfo.error) {
      return <div>Ошибка</div>;
    }
  
    return (
      <Container className="gameInfo-Page">
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
  
