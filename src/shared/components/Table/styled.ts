// MUI
import { styled as styledMUI } from "@mui/material/styles";
import { TableCell, TableRow, tableCellClasses } from "@mui/material";

// Styled
import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

export const StyledTableCell = styledMUI(TableCell)(() => ({
    [`&.${tableCellClasses?.head}`]: {
        backgroundColor: "#7FA1FF",
        color: "#000",
        fontSize: 18,
    },
    [`&.${tableCellClasses?.body}`]: {
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
