import React from "react";
import styled from "styled-components";

const StyledBar = styled.h1`
    width: 100%;
    color: rgb(235, 235, 235);
    font-size: 42px;
    padding: 0 0 0 8px;
`;

const Titlebar = ({ children }) => <StyledBar>{ children }</StyledBar>;

export default Titlebar;