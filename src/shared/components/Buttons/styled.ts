// MUI
import { Button, styled as styledMUI } from "@mui/material";

// Styled
//import styled from "styled-components";

export const PrymaryButton = styledMUI(Button)`
    align-items: center;
    background-color: #0045FF;
    color: white;
    display: flex;
    gap: 0.5rem;
    justify-content: center;

    &:hover {
        background-color: #0039E6;
    }
`;

export const SecondaryButton = styledMUI(Button)`
    align-items: center;
    background-color: #7E2EFF;
    color: white;
    display: flex;
    gap: 0.5rem;
    justify-content: center;

    &:hover {
        background-color: #6B21E8;
    }
`;

export const OutlinedButton = styledMUI(Button)`
    align-items: center;
    background-color: transparent;
    color: #0045FF;
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    border: 1px solid #0045FF;
    box-shadow: none; 
    &:hover {
        background-color: #0045FF;
        color: white;
    }
`;