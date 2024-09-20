// MUI
import { styled as styledMUI } from "@mui/material/styles";
import { Box } from "@mui/material";

// Styled
import styled from "styled-components";

export const ModalContainer = styledMUI(Box)`
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
`;

export const GridContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const MainTextTitle = styled.span`
    color: #0045ff;
    font-family: Roboto;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.15000000596046448px;
    line-height: 19px;
    text-align: left;
`;

export const BtnContainer = styled.div<{ justifyContent?: string }>`
    align-items: center;
    display: flex;
    justify-content: ${({ justifyContent }) => justifyContent || "flex-start"};
    gap: 20px;
`;

export const SectionContainer = styled.form`
    background-color: #FFFFFF;
    border-radius: 8px;
    border: 1px solid #0000003B;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
`;