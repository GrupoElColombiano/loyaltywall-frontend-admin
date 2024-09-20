// MUI
import { Box, CardContent } from "@mui/material";
import { styled as styledMUI } from "@mui/material/styles";

// Styled
import styled from "styled-components";

export const CardContainer = styledMUI(Box)`
`;

export const CardWrapper = styledMUI(CardContent)`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
`;

export const CardHeader = styled.div`
    align-items: center;
    display: flex;
    gap: 10px;
`;

export const CardBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;