import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledNav = styled.nav`
    h4 {
        color: rgba(96, 107, 255, 0.5);
        margin-bottom: 0.5rem;
        padding: 0 1rem;
    }

    .section {
        text-align: left;
        display: flex;
        flex-direction: column;
        row-gap: 4px;
        width: 200px;
        margin-bottom: 2rem;

        .title {
            padding: 0.1rem 0;
            color: rgba(235, 235, 235, 0.5);
        }

        a {
            font-weight: 600;
            width: 100%;
            padding: 0.6rem 0.8rem;
            border-radius: 6px;
            text-decoration: none;
            color: rgb(240, 240, 240);
            opacity: 0.6;
            transition: all 0.2s ease;

            &.active {
                opacity: 1;
                background: rgba(100, 100, 100, 0.5);
            }

            :hover {
                opacity: 1;
                background: rgba(100, 100, 100, 0.5);

                i {
                    margin-right: 16px;
                }
            }

            i {
                transition: all 0.2s ease;
                margin-right: 12px;
            }
        }
    }
`;

const Navbar = () => {
    return (
        <StyledNav>
            <div className="section">
                <NavLink exact to="/" activeClassName="active"><i className="fas fa-home" />Dashboard</NavLink>
                <NavLink to="/hours" activeClassName="active"><i className="fas fa-clock" />Hours</NavLink>
                <NavLink to="/projects" activeClassName="active"><i className="fas fa-folder" />Projects</NavLink>
                <NavLink to="/customers" activeClassName="active"><i className="fas fa-user-friends" />Customers</NavLink>
            </div>
            <div className="section">
                <span className="title">User Management</span>
                <NavLink exact to="/users/new" activeClassName="active"><i class="fas fa-plus" />New User</NavLink>
                <NavLink exact to="/users" activeClassName="active"><i class="fas fa-shield-alt" />Manage</NavLink>
            </div>
            <div className="section">
                <span className="title">Profile</span>
                <NavLink exact to="/settings" activeClassName="active"><i class="fas fa-cog" />Settings</NavLink>
                <NavLink exact to="/logout" activeClassName="active"><i class="fas fa-sign-out-alt" />Logout</NavLink>
            </div>
        </StyledNav>
    )
}

export default Navbar;