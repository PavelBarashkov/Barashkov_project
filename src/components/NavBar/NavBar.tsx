import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MAIN_ROUTE } from '../../utils/consts';

interface NavBarProps {};

const NavBar: React.FC<NavBarProps> = () => {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>
                    <Link to={MAIN_ROUTE}>
                    Free Game
                    </Link>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default NavBar;
