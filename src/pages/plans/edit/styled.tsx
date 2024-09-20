// MUI
import { styled as styledMUI } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem"; 
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

// Styled Components
import { styled } from "styled-components";

// Styles
import "react-phone-number-input/style.css";

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SectionContainer = styled.section`
    background-color: #FFFFFF;
    border-radius: 8px;
    border: 1px solid #0000003B;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
`;

export const PlansContainer = styled.form`
    background-color: #F5F5F5;
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-height: 85vh;
    overflow-y: auto;
    padding: 20px;
`;

export const DescriptionConfiguration = styled.div`
padding-top: 20px;
color: var(--bk-03, #606A84);
font-family: Roboto;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 26px; /* 162.5% */
letter-spacing: 0.46px;
`;

export const GenericField = styled.div`
  text-align: left;
`;

export const StyledInput = styledMUI(TextField)`
  width: 500px;
  background: #FFF;
`;
 
export const StyledTextArea = styledMUI(TextField)`
    align-items: flex-start;
    align-self: stretch;
    background: #FFF;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    padding: 0px;
`;

export const StyledSelect = styledMUI(Select)`
  width: 400px;
`;

export const GenericFieldLeft = styled.div`
  text-align: left;
`;

export const FormContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: repeat(1, 1fr);
  margin-bottom: 20px;
  margin-right: 20px;
  margin-left: 20px;
  margin-top: 20px;
  
`;

export const GenericFieldRight = styled.div`
text-align: -webkit-right;
`;

export const StyledSelectPhone = styledMUI(Select)`
  .MuiOutlinedInput-notchedOutline {
    border: none !important;
  }
`;

export const StyledMenuItem = styledMUI(MenuItem)`
  color: #CEC9C9;
  /* components/input-text */
  font-size: 16px;
  font-family: Roboto;
  line-height: 4px;
  letter-spacing: 0.15px;
`;

export const StyledFormControlLabel = styledMUI(FormControlLabel)`
  color: var(--text-secondary, rgba(0, 0, 0, 0.60));
  font-size: 16px;
  font-family: Roboto;
  line-height: 150%;
  letter-spacing: 0.15px;
`;

export const ContainerPhone = styled.div`
  margin: 20;
  margin-top: 30;
  flex: 1;
  flex-direction:'row';
  background-color: 'linen';
  position: 'relative';
`;

export const ContainerFlag = styled.div`
  // padding-left: 10% !important; 
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  padding: 0px 12px;
`;

export const GenericLink = styled.a`
  font-weight: bold;
  color: #3DA3F5;
`;

export const SpanAccountBold = styled.span`
  font-weight: bold;
  color: rgba(0, 0, 0, 0.60);
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.15px;
`;

export const SpanAccount = styled.span`
  color: rgba(0, 0, 0, 0.60);
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.15px;
`;

export const GenericFieldCenter = styled.div`
  text-align: center;
`;

export const ButtonRegister = styled.button`
  /* elevation/2 */
  align-items: center;
  background: var(--primario-p-201, #0045FF);
  border-radius: 3px;
  border-radius: 4px;
  border-radius: 4px;
  border: none;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.20), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  color: #ffffff;
  cursor: pointer;
  display: flex;
  flex-direction: inherit;
  font-size: 16px;
  justify-content: center;
  margin-left:20px;
  padding: 10px 20px;
  padding: 8px 22px;
`;

export const TitleButtonRegister = styled.div`
  color: #000;
  font-family: Roboto;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const TitleFields = styled.div`
  color: var(--text-primary, rgba(0, 0, 0, 0.87));
  flex-shrink: 0;
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.15px;
  line-height: normal;
  margin: 0px;
  padding: 12px 0px;
`;

export const MessageDescription = styled.div` 
  color: var(--text-secondary, rgba(0, 0, 0, 0.60));
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 166%;
  letter-spacing: 0.4px;
  align-items: stretch;
  justify-content: left;
  text-align: left;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

export const SignInContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const UserEditContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(8, 1fr);
  gap: 15px;
  height: 50%;
`;

export const RegistrationForm = styled.div`
  margin-bottom: 20px;
`;

export const MessageRecomend = styled.div`
  color: var(--text-secondary, rgba(0, 0, 0, 0.60));
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: 0.5px;
  align-items: left;
  justify-content: left;
  text-align: left;
  height: 30px;

  @media (max-width: 600px) {
    font-size: 14px;
  }

       
  img {
    margin-right: 8px; /* Espacio entre el icono y el texto */
    width: 24px; /* Ajustar el tamaño del icono */
    height: 24px;
  }


`;