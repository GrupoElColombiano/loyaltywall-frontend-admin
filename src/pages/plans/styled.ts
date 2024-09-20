// MUI
import { Box, Button } from "@mui/material";
import { styled as styledMUI } from "@mui/material/styles";

// Styled
import styled from "styled-components";


export const AcceptButton = styledMUI(Button)({
    backgroundColor: "#0045FF",
    borderRadius: "4px",
    color: "#FFFFFF",
    fontFamily: "Roboto",
    fontSize: "15px",
    fontWeight: 500,
    height: "100%",
    letterSpacing: "0.46000000834465027px",
    lineHeight: "26px",
    marginBottom: "1px",
    maxWidth: "120px",
    padding: "6px 12px",
    textAlign: "left",
    textTransform: "none",
    width: "100%",
    
    "&:hover": {
        backgroundColor: "#0045FF",
        border: "1px solid #0045FF",
        outline: "none",
    },

    "&:focus": {
        backgroundColor: "#0045FF",
        border: "1px solid #0045FF",
        outline: "none",
    },

    "&:active": {
        backgroundColor: "#0045FF",
        border: "1px solid #0045FF",
        outline: "none",
    },
});

export const CancelButton = styledMUI(Button)({
    backgroundColor: "#7E2EFF",
    borderRadius: "4px",
    color: "#FFFFFF",
    fontFamily: "Roboto",
    fontSize: "15px",
    fontWeight: 500,
    height: "100%",
    letterSpacing: "0.46000000834465027px",
    lineHeight: "26px",
    marginBottom: "1px",
    maxWidth: "120px",
    padding: "6px 12px",
    textAlign: "left",
    textTransform: "none",
    width: "100%",

    "&:hover": {
        backgroundColor: "#7E2EFF",
        border: "1px solid #7E2EFF",
        outline: "none",
    },

    "&:focus": {
        backgroundColor: "#7E2EFF",
        border: "1px solid #7E2EFF",
        outline: "none",
    },

    "&:active": {
        backgroundColor: "#7E2EFF",
        border: "1px solid #7E2EFF",
        outline: "none",
    },
});

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
    width: 450px;
`;

export const BtnContainer = styled.div<{ justifyContent?: string }>`
    align-items: center;
    display: flex;
    justify-content: ${({ justifyContent }) => justifyContent || "flex-start"};
    gap: 20px;
`;

export const PlansContainer = styled.div`
    background-color: #F5F5F5;
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-height: 80vh;
    overflow-y: auto;
    padding: 20px;
`;

export const PlanContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const TittleModalContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

export const TittleModalText = styled.span`
  font-family: Roboto;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.15000000596046448px;
  text-align: left;
`;

export const ContentModalText = styled.span`
  font-family: Roboto;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.4000000059604645px;
  text-align: left;
  color: #606a84;
  padding: 0px 0px 16px 0px;
`;

export const ContainerButtonsModal = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;