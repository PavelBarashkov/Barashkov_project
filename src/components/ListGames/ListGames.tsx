import React from 'react'
import { IGame } from '../../models/IGame'
import { Row } from 'react-bootstrap';
import { GameItem } from '../Game/GameItem';
import { useNavigate } from 'react-router-dom';
import { GAME_INFO_ROUTE } from '../../utils/consts';
import { Service } from '../../API/Service';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { fetchGameInfo } from '../../redux/slices/gameInfoSlice';
// import { setGameInfo } from '../../redux/reduce/gameReducer';

interface IGameProps {
    games: IGame[];
}

export const ListGames = ({games}: IGameProps) => {
    const dispatch = useAppDispatch();
    const navigation = useNavigate();

   async function fetchData(id: number) {
        const data = {
            id: id
        }
        dispatch(fetchGameInfo(data))
    }

    function handlerToPage(e: any) {
        navigation(`${GAME_INFO_ROUTE}/${e.id}`);
        fetchData(e.id);
    }
  return (
    <Row  className="d-flex">
            {games && games.length !==0 ?
                games.map((game) => (
                    <GameItem key={game.id} onClick={() => handlerToPage(game)} game={game}/>
                ))
                : <div style={{display: 'flex', justifyContent: 'center'}}>Пусто</div>
            }
    </Row>
  )
}
