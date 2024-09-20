import { styled } from "styled-components";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import "react-phone-number-input/style.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";


export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GenericField = styled.div`
  text-align: left;
`;

export const StyledInput = styled(TextField)`
  width: 400px;
`;

export const StyledSelect = styled(Select)`
  width: 400px;
`;

export const GenericFieldLeft = styled.div`
  text-align: left;
`;

export const GenericFieldRight = styled.div`
  text-align: right;
`;

export const StyledSelectPhone = styled(Select)`
  .MuiOutlinedInput-notchedOutline {
    border: none !important;
  }
`;


export const StyledMenuItem = styled(MenuItem)`
  color: #CEC9C9;
  /* components/input-text */
  font-size: 16px;
  font-family: Roboto;
  line-height: 4px;
  letter-spacing: 0.15px;
`;


export const StyledFormControlLabel = styled(FormControlLabel)`
  color: var(--text-secondary, rgba(0, 0, 0, 0.60));
  font-size: 16px;
  font-family: Roboto;
  line-height: 150%;
  letter-spacing: 0.15px;
`;



export const ContainerPhone = styled.div`
  margin: 20;
  marginTop: 30;
  flex: 1;
  flexDirection:'row';
  backgroundColor: 'linen';
  position: 'relative';
`;

export const StyledInputPhone = styled(TextField)`
  width: 400px;
  .css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input{
    padding-left: 19% !important;
    padding-top: 10px !important;
  }
 
`;


export const ContainerFlag = styled.div`

display: flex;
padding: 0px 12px;
flex-direction: column;
align-items: flex-start;
align-self: stretch;
// padding-left: 10% !important; 

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
 
  background: var(--primario-p-201, #0045FF);
  color: #FFF;
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  .loading{
    cursor: not-allowed;
  opacity: 0.8;
  }

  :hover {
    background-color: #23527c;
  }

  /* Estilos para pantallas más pequeñas */
@media (max-width: 600px) {
  .button-register {
    font-size: 14px;
    padding: 8px 16px;
  }
}

`;

export const TitleButtonRegister = styled.div`
  color: #000;
  text-align: center;
  font-size: 34px;
  display: flex;
  flex-shrink: 0;
  margin-left: 10px;         
  height:48px;
  align-items: center;
  justify-content: center;

`;

export const MessageWelcome = styled.div`

color: var(--text-secondary, rgba(0, 0, 0, 0.60));
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 150%;
letter-spacing: 0.15px;
align-items: left;
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

export const FormContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: repeat(1, 1fr);
  margin-bottom: 20px;
`;

export const UserEditContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(8, 1fr);
  gap: 15px;
  height: 50%;
`;



export const RegistrationForm = styled.div`. 
{
  margin-bottom: 20px;
}
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

`;
