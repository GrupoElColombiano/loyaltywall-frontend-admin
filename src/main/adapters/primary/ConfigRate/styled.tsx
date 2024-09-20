// MUI
import { Button } from "@mui/material";
import { styled as MUIStyled } from "@mui/material/styles";

// Styled
import styled from "styled-components";

export const Container = styled.div`
    align-items: flex-start;
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow:
        0px 11px 15px -7px rgba(0, 0, 0, 0.2),
        0px 24px 38px 3px rgba(0, 0, 0, 0.14),
        0px 9px 46px 8px rgba(0, 0, 0, 0.12);
    display: flex;
    flex-direction: column;
    height: 55%;
    left: 50%;
    max-height: 95vh;
    max-width: 95vw;
    min-height: min(95vh, 833px);
    min-width: min(95vw, 1200px);
    padding: 40px;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 65%;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100%;
    width: 100%;
`;

export const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const SubTitle = styled.p`
    color: #0000008F;
    font-family: Roboto;
    font-weight: 400;
    letter-spacing: 0.4000000059604645px;
    line-height: 20px;
    margin: 0;
    text-align: left;
`;

export const Title = styled.h3`
    color: #000000DE;
    font-family: Roboto;
    font-weight: 700;
    letter-spacing: 0.15000000596046448px;
    line-height: 19px;
    margin: 0;
    text-align: left;
`;

export const BtnContainer = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
`;

export const BtnCancel = MUIStyled(Button)({
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

export const BtnAccept = MUIStyled(Button)({
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
