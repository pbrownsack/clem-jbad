import React from "react";
import styled from "styled-components";

const StyledBar = styled.h1`
    width: 100%;
    padding: 0.7rem 1rem;
    color: rgb(245, 245, 245);
    font-size: 42px;
`;

const Titlebar = ({ children }) => <StyledBar>{ children }</StyledBar>;

export default Titlebar;