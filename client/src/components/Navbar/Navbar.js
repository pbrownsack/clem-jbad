import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledNav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    padding: 0.8rem;
    width: 220px;
    height: 100vh;
    overflow: hidden;
    align-items: center;
    background: #f0f0f0;
    color: #ecf0f1;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);

    & > h3 {
        font-size: 2rem;
        font-weight: 400;
        border-bottom: 1px solid #0f97d6;
        letter-spacing: 2px;
        color: #0f97d6;
    }

    ul {
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        list-style: none;
        width: 100%;

        li {
            font-size: 14px;
            font-weight: 600;
            background-color: #e8e8e8;
            margin-bottom: 0.5rem;
            transition: all 0.2s;
            border-radius: 4px;

            &:hover {
                background-color: #0f97d6;
                box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
            }

            a {
                display: block;
                padding: 0.6rem 1rem;
                color: rgb(120, 120, 120);
                text-decoration: none;
                transition: color 0.1s;

                &:hover {
                    color: #fff;
                }

                &.active {
                    background-color: #0c77a8;
                    color: #fff;
                }
            }

            i {
                margin-right: 12px;
            }
        }
    }
`;

const Navbar = () => {
    return (
        <StyledNav>
            <h3>C.L.E.M.</h3>
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