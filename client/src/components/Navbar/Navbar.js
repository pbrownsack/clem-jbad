import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledNav = styled.nav`
    background: yellow;

    h4 {
        color: rgb(200, 200, 200);
    }

    ul {
        text-align: left;
        display: flex;
        flex-direction: column;
        row-gap: 4px;
        list-style: none;
        width: 100%;
    }

    li {
        padding: 0.4rem 0.4rem;
        width: 100%;
        background: green;
        border-radius: 4px;

        i {
            margin-right: 8px;
        }
    }
`;

const Navbar = () => {
    return (
        <StyledNav>
            <h4>Navigation</h4>
            <ul>
                <li><NavLink exact to="/" activeClassName="active"><i className="fas fa-home" />Dashboard</NavLink></li>
                <li><NavLink to="/hours" activeClassName="active"><i className="fas fa-clock" />Hours</NavLink></li>
                <li><NavLink to="/projects" activeClassName="active"><i className="fas fa-folder" />Projects</NavLink></li>
                <li><NavLink to="/customers" activeClassName="active"><i className="fas fa-user-friends" />Customers</NavLink></li>
            </ul>
        </StyledNav>
    )
}

export default Navbar;