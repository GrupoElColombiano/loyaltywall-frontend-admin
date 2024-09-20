// MUI
import { styled as styledMUI } from "@mui/material/styles";
import { Box, TableCell, TableRow, tableCellClasses } from "@mui/material";

// Styled
import styled from "styled-components";

export const BtnContainer = styled.div<{ justifyContent?: string }>`
    align-items: center;
    display: flex;
    justify-content: ${({ justifyContent }) => justifyContent || "flex-start"};
    gap: 20px;
`;

export const AmountContainer = styled.div<{ direction?: string }>`
    align-items: center;
    display: flex;
    flex-direction: ${({ direction }) => direction || "row"};
    gap: 10px;
`;

export const FooterCard = styled.div<{ direction?: string }>`
    flex-direction: ${({ direction }) => direction || "row"};
    display: flex;
    gap: 20px;
    justify-content: space-between;
`;

export const StyledTableCell = styledMUI(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#7FA1FF",
        color: "#000",
        fontSize: 18,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 18,
    },
}));

export const StyledTableRow = styledMUI(TableRow)(() => ({
    "&:nth-of-type(odd)": {
        backgroundColor: "#F3F3F3",
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

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
`;