import { styled } from "styled-components";
import TextField from "@mui/material/TextField";
import "react-phone-number-input/style.css";
import Box from "@mui/material/Box";

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GenericField = styled.div`
  text-align: left;
`;

export const StyledInput = styled(TextField)`
  width: 50%;
  background: #FFF;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const StyledTextArea = styled(TextField)`
    paddig-right: 200px;
    border-radius: 4px;
    border: 1px solid var(--input-outlined-enabled-border, rgba(0, 0, 0, 0.23));
    background: #FFF;
    display: flex;
    padding: 0px 12px;
    flex-direction: column;
    
    align-self: stretch;
    width: 100%;
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

export const ButtonRegister = styled.button`
 
display: flex;
padding: 8px 22px;
margin-left:20px;
flex-direction: inherit;
justify-content: center;
align-items: center;
border-radius: 4px;

 
color: #ffffff;
background: var(--primario-p-201, #0045FF);
box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.20), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
border-radius: 4px;

padding: 10px 20px;
font-size: 16px;
border: none;
border-radius: 3px;
cursor: pointer;
/* elevation/2 */

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
flex-shrink: 0;
color: var(--text-primary, rgba(0, 0, 0, 0.87));
font-family: Roboto;
font-size: 18px;
font-style: normal;
font-weight: 700;
line-height: normal;
letter-spacing: 0.15px;
padding-bottom: 16px;
padding-top: 10px;
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

export const BarTitle = styled.div`
  display: flex;
  padding: 16px 0px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 4px 4px 0px 0px;
  background: #FFF;
  margin-left: 20px;
`;

export const SpanSeparator = styled.span`
  border-bottom: 2px solid var(--input-outlined-enabled-border, rgb(248 248 248));
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 4px 4px 0px 0px;
  background: #f8f8f8;
`;


export const StyledBox = styled(Box)`
  border-right: 10px solid var(--input-outlined-enabled-border, rgb(248 248 248));
`;