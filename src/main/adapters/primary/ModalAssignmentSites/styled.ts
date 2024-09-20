// MUI
import { styled as styledMUI } from "@mui/material/styles";
import { Box } from "@mui/material";

export const ModalContainer = styledMUI(Box)`
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    width: 50%;
    flex-direction: column;
    gap: 20px;
    left: 50%;
    height: 650px;
    position: absolute;
    padding: 20px;
    top: 50%;
    transform: translate(-50%, -50%);
`;