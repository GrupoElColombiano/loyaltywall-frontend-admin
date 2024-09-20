// MUI
import { styled as styledMUI } from "@mui/material/styles";
import { Box } from "@mui/material";

export const ModalContainer = styledMUI(Box)`
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    left: 50%;
    padding: 20px;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
`;