import styled from "styled-components";

export const MainContainerModal = styled.div`
    align-items: flex-start;
    background-color: #ffffff;
    border-radius: 4px;
    border: 1px solid #0000003b;
    box-shadow:
        0px 11px 15px -7px rgba(0, 0, 0, 0.2),
        0px 24px 38px 3px rgba(0, 0, 0, 0.14),
        0px 9px 46px 8px rgba(0, 0, 0, 0.12);
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 55%;
    justify-content: flex-start;
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

export const ModalHeader = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: -webkit-fill-available;
`;

export const ModalTittle = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    width: 100%;
`;

export const ModalTittleText = styled.span`
    color: #000000de;
    font-family: Roboto;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.15000000596046448px;
    line-height: 21px;
    margin-left: 10px;
    text-align: left;
`;

export const MainTextContainer = styled.div`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: flex-start;
    width: -webkit-fill-available;
`;

export const MainTextTittle = styled.span`
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
    text-align: left;
`;

export const InputsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: -webkit-fill-available;
`;

export const InputsSearchContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    gap: 20px;
`;

export const GridAndButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    width: 100%;
`;

export const GridContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;

export const DataGridContainer = styled.div`
    border: 1px solid #8A8A8A;
    display: flex;
    flex-direction: row;
    height: 40px;
    justify-content: space-between;
    width: 100%;
`;

export const MsjNoData = styled.div`
    align-items: center;
    background: #F8F8F8;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.23);
    color: #0000008F;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
`;