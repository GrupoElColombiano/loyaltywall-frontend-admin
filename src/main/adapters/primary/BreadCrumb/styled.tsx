// Styled
import styled from "styled-components";

// Functions
const getColorStatus = (status: string) => {
    const DEFAULT_COLOR = {
        background: "#FFFFFF",
        color: "#0045FF",
    };

    const STATUS_COLOR: { [key: string]: { background: string; color: string } } = {
        success: {
            background: "#FFFFFF",
            color: "#4CAF50",
        },
        active: {
            background: "#FFFFFF",
            color: "#0045FF",
        },
        disabled: {
            background: "#E0E0E0",
            color: "#606A84",
        },
    };

    return STATUS_COLOR[status] || DEFAULT_COLOR;
};

export const BreadCrumbContainer = styled.div`
    align-items: center;
    background:
        linear-gradient(0deg, rgba(0, 0, 0, 0.12),rgba(0, 0, 0, 0.12)),
        linear-gradient(0deg, #FFFFFF, #FFFFFF);
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 2px;
`;

export const StepContainer = styled.div<{ status: string }>`
    align-items: center;
    background-color: ${(props) => getColorStatus(props.status).background};
    border-radius: 8px;
    box-shadow: -1px 1px 1px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: row;
    gap: 10px;
    height: 40px;
    justify-content: center;
    width: 340px;   
`;

export const StepIndicator = styled.p<{ status: string }>`
    align-items: center;
    background-color: ${(props) => getColorStatus(props.status).color};
    border-radius: 50%;
    box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.25);
    color: ${(props) => getColorStatus(props.status).background};
    display: flex;
    height: 25px;
    justify-content: center;
    text-align: center;
    width: 25px;
`;

export const StepText = styled.p<{ status: string }>`
    color: ${(props) => getColorStatus(props.status).color};
    font-weight: 700;
    text-align: center;
`;

