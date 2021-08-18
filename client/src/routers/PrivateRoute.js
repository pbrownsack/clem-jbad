import React from 'react';
import { Redirect, Route } from 'react-router';
import styled from 'styled-components';

const Content = styled.div`
  display: block;
  width: calc(100% - 220px);
  height: 100vh;
  margin-left: 220px;
  background: rgb(245, 245, 245);
  padding: 1rem;
`;

const PrivateRoute = ({ component: Component, ...rest }) => {
    const clemUser = JSON.parse(localStorage.getItem("clemuser"));
    
    return (
        <Route {...rest} render={props =>
            clemUser ? (
                <Content>
                    <Component {...props} />
                </Content>
            ) : (
                <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            )} />
    )
}

export default PrivateRoute;