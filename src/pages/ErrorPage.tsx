import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { MAIN_ROUTE } from '../utils/consts';

export const ErrorPage = () => {
    const navigat = useNavigate();
  return (
    <Container style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
        <div>
            <h1>404</h1>
        </div> 
        <Button onClick={() => navigat(MAIN_ROUTE)}>Вернуться на главную</Button>
    </Container>
  )
}
