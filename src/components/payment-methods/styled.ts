// Styled
import styled from "styled-components";

export const ListContainer = styled.div`
    align-items: center;
    display: flex;
    gap: 20px;
    justify-content: space-between;
`;

export const BtnContainer = styled.div<{ justifyContent?: string }>`
    align-items: center;
    display: flex;
    justify-content: ${({ justifyContent }) => justifyContent || "flex-start"};
    gap: 20px;
`;

export const ModalContainer = styled.form`
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