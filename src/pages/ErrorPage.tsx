import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { MAIN_ROUTE } from '../routes/consts';
import { MyButton } from '../components/MyButton/MyButton';

export const ErrorPage = () => {
    const navigat = useNavigate();
  return (
    <Container style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', flexDirection: 'column'}}>
        <div>
            <h1>404 Страница не найдена </h1>
        </div> 
        <MyButton onClick={() => navigat(MAIN_ROUTE)}>Вернуться на главную</MyButton>
    </Container>
  )
}
