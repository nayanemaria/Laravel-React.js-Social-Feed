import React, { useState, useEffect } from 'react';
import { Container, Navbar, Button, Nav } from 'react-bootstrap';
import { FaPlus, FaBars, FaUsers, FaTimes } from 'react-icons/fa';
import logo from '../../Images/logo.png';
import "../../Styles/style.css";

const Menu = ({handleOpenModal}) => {
    const [showAddButton, setShowAddButton] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 100;
            setShowAddButton(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleSidebarToggle = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <>
            <Navbar expand="lg" bg="light" variant="light" className={`mb-lg-5 mb-4 fixed-top ${showAddButton ? 'scrolled' : ''}`}>
                <Container fluid className="px-lg-5 px-4 d-flex justify-content-between align-items-center">
                    <Navbar.Toggle aria-controls="navbar-nav" style={{ outline: 'none' }} onClick={handleSidebarToggle}>
                        {showSidebar ? <FaTimes /> : <FaBars />}
                    </Navbar.Toggle>
                    <Navbar.Brand href="#home"><img src={logo} alt="Logo" className="logo" /></Navbar.Brand>
                    <Navbar.Collapse id="navbar-nav" className="mt-3">
                        <Nav className="ml-auto">
                            <Nav.Link href="#home"><FaUsers /> Contatos</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    {showAddButton && (
                        <Button className="button-nav" onClick={handleOpenModal}>
                            <FaPlus />
                        </Button>
                    )}
                </Container>
            </Navbar>
        </>
    );
};

export default Menu;