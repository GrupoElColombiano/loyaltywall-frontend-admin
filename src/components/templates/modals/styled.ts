// Styles
import styled from "styled-components";

export const TemplateContainer = styled.div`
    background-color: #F5F5F5;
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-height: 85vh;
    overflow-y: auto;
    padding: 20px;
`;

export const ModalContainer = styled.div`
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

export const TablePagination = styled.div`
    border: 1px solid #8A8A8A;
    display: flex;
    flex-direction: row;
    height: 40px;
    justify-content: space-between;
    width: 100%;    
`;

export const EmptyData = styled.div`
    align-items: center;
    background-color: #ffffff;
    border: 1px solid #0000003b;
    display: flex;
    flex-direction: column;
    height: 70vh;
    justify-content: center;
`;