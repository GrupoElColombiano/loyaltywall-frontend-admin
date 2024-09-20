import styled from "styled-components";

export const ItemContainer = styled.div`
    background-color: white;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 14px;
`;

export const ItemContent = styled.div<{ selected?: boolean, isPointer?: boolean, isHoverable?: boolean }>`
    align-items: center;
    background-color: ${({ selected }) => selected ? "#BFD0FF" : "white"};
    border-radius: 4px;
    cursor: ${({ isPointer }) => isPointer ? "pointer" : "default"};
    display: flex;
    gap: 8px;
    justify-content: space-between;
    padding: 10px;

    svg, p {
        color: ${({ selected }) => selected ? "#3F51B5" : "#606A84"};
    }

    ${({ isHoverable }) => isHoverable && `
        &:hover {
            background-color: #BFD0FF;

            svg, p {
                color: #3F51B5
            }
        }
    `}
`;

export const ListContainer = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 10px;
`;

export const PermissionsContainer = styled.div`
    background-color: #F5F5F5;
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 85vh;
    overflow-y: auto;
    padding: 20px;
`;
