import { IGame } from '../../models/IGame'
import { Row } from 'react-bootstrap';
import { GameItem } from '../Game/GameItem';
import { useNavigate } from 'react-router-dom';
import { GAME_INFO_ROUTE } from '../../routes/consts';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { clearGame } from '../../redux/slices/gameInfoSlice';

interface IGameProps {
    games: IGame[];
}

export const ListGames = ({games}: IGameProps) => {
    const dispatch = useAppDispatch();
    const navigation = useNavigate();

    function handlerToPage(e: any) {

        dispatch(clearGame())
        navigation(`${GAME_INFO_ROUTE}/${e.id}`);
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
