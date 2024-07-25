import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar: React.FC = () => {
    return (
        <Nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/booking">Booking</NavLink>
        </Nav>
    );
};

const Nav = styled.nav`
    display: flex;
    justify-content: space-around;
    padding: 1em;
    background: #333;
`;

const NavLink = styled(Link)`
    color: white;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

export default Navbar;
