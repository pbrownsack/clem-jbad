import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledNav = styled.nav`
    display: flex;
    flex-direction: column;
    padding: 0.8rem;
    max-width: 200px;
    height: 100vh;
    overflow: hidden;
    align-items: center;
    background: #2c3e50;
    color: #ecf0f1;

    & > h3 {
        font-size: 2rem;
        font-weight: bold;
        border-bottom: 1px solid #ecf0f1;
    }

    ul {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        list-style: none;
        width: 100%;

        li {
            font-size: 14px;
            font-weight: 600;
            padding: 0.5rem 1rem;
            background-color: #2c3e50;
            color: rgb(200, 200, 200);
            border-radius: 4px;
            margin-bottom: 0.5rem;

            i {
                margin-right: 12px;
            }

            &:hover {
                background-color: #3498db
            }
        }
    }
`;

const Navbar = () => {
    return (
        <StyledNav>
            <h3>C.L.E.M.</h3>
            <ul>
                <li><i class="fas fa-home" />Dashboard</li>
                <li><i class="fas fa-clock" />Hours</li>
                <li><i class="fas fa-folder" />Projects</li>
            </ul>
        </StyledNav>
    )
}

export default Navbar;