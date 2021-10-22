import React from 'react';
import styled from 'styled-components';
import Navbar from '../Navbar/Navbar';
import Titlebar from '../Titlebar/Titlebar';

const StyledContainer = styled.div`
    width: 60vw;
    height: fit-content;
    margin-top: 2rem;
    background: red;

    .content-area {
        display: flex;
        
        .nav {
            flex-grow: 1;
        }

        main {
            flex-grow: 2;
        }
    }
`;

const Container = ({ children }) => {
    return (
        <StyledContainer>
            <Titlebar>Dashboard</Titlebar>
            <div className="content-area">
                <Navbar className="nav"/>
                <main>
                    { children }
                </main>
            </div>
        </StyledContainer>
    )
}

export default Container;