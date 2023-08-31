import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

interface NavBarProps {};

const NavBar: React.FC<NavBarProps> = () => {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>
                        Free Game
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default NavBar;
