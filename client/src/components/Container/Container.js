import React, { useContext } from 'react';
import styled from 'styled-components';
import Navbar from '../Navbar/Navbar';
import Titlebar from '../Titlebar/Titlebar';

import PageTitleContext from '../../contexts/PageTitleContext';

const StyledContainer = styled.div`
    width: 50vw;
    height: fit-content;
    margin-top: 4rem;

    .content-area {
        display: flex;
        margin-top: 4rem;
        
        .nav {
            flex-grow: 1;
        }

        main {
            padding: 0 2rem;
            flex-grow: 2;
        }
    }
`;

const Container = ({ children }) => {
    const [pageTitle, setPageTitle] = useContext(PageTitleContext);

    return (
        <StyledContainer>
            <Titlebar>{ pageTitle }</Titlebar>
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