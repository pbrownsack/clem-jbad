import React from 'react';
import { Redirect, Route } from 'react-router';
import styled from 'styled-components';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const clemUser = JSON.parse(localStorage.getItem("clemuser"));
    
    return (
        <Route {...rest} render={props =>
            clemUser ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            )} />
    )
}

export default PrivateRoute;