// Assets
import BACKGROUND_LOGO from "../../assets/IconBackground.svg";

// Styles
import styled from "styled-components";

export const HomeContainer = styled.div`
    background-color: #F5F5F5;
    background-image: url(${BACKGROUND_LOGO});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 85vh;
    max-height: 85vh;
    overflow-y: auto;
    padding: 20px;
`;