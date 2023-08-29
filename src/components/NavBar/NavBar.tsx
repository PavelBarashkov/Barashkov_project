import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

interface NavBarProps {};

const NavBar: React.FC<NavBarProps> = () => {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Free Game</Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default NavBar;
