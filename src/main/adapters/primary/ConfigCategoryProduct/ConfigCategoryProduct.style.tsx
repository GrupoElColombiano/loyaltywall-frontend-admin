import styled from "styled-components";

export const MainContainerModal = styled.div`
    align-items: center;
    background-color: #ffffff;
    border-radius: 4px;
    border: 1px solid #0000003b;
    display: flex;
    flex-direction: column;
    height: 55%;
    justify-content: flex-start;
    left: 50%;
    max-height: 95vh;
    max-width: 95vw;
    min-height: min(95vh, 833px);
    min-width: min(95vw, 1200px);
    top: 50%;
    transform: translate(-50%, -50%);
    width: 65%;
    box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
        0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
    padding-left: 40px;
    padding-right: 39px;
    padding-top: 32px;
    position: absolute;
`;

export const MainTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 24px;
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

export const MainTextContent = styled.span`
    color: #000000;
    font-family: Roboto;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.15000000596046448px;
    line-height: 16px;
    margin-top: 8px;
    text-align: left;
`;

export const GridAndButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    padding-bottom: 32px;
    padding-top: 30px;
    width: 100%;
`;

export const GridContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 32px;
    width: 100%;
`;
