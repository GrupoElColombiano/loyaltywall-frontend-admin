import React, { useState, ChangeEvent } from "react";
import { Form, FormContainer, GenericField, StyledInput,
    ButtonRegister, TitleButtonRegister, MessageWelcome} from "../recover-password.style";
//import PropTypes from 'prop-types'
import Stack from "@mui/material/Stack"; 
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css


import { SendEmail, EmailData } from "../../../../service/recover-password/recover-password.service";

const RecoverPasswordForm: React.FC = () => {

    const regexMail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const [mail, setMail] = useState("");
    const [mailError, setMailError] = useState(false);

    const handleSubmit = async () => {

        if(regexMail.test(mail)){
            setMailError(false);
        }else{
            setMailError(true);
            return;
        }

        const hostname = window.location.hostname;
        const protocol = window.location.protocol;
        const port = window.location.port;
        const emailData: EmailData = {
            mail: mail,
            domine: `${protocol}//${hostname}:${port}/#/user/change-password`
        };

        try {

            confirmAlert({
                title: "Confirmar el envío",
                message: "¿Estás segura de hacer esto?",
                buttons: [
                    {
                        label: "Aceptar",
                        onClick: () =>  

                            SendEmail(emailData, (result) => {
              
                                if(result.code == "ERR_NETWORK"){
                                    alert(result.message);
                                }else{

                                    if(result.status ==201 ){
                                        alert(result.data);
                                        return;
                                    } 
                                    if(result.response.status == 400){
                                        alert(result.response.data.message);
                                        return;
                                    }
                
                                    if(result.response.status == 404){
                                        alert(result.response.data.message);
                                        return;
                                    }
  
                                    if(result.status == 201){
                                        alert("Envio exitoso");
                                    }
                                }
  
                            })
            
                    },
                    {
                        label: "Cancelar"
                    }
                ]
            });

        } catch (error) {
            alert(error);
        }
    };

    const handleMailChange = (event: ChangeEvent<HTMLInputElement>) => {
    
        setMail(event.target.value);
        setMailError(false);

        if(regexMail.test(event.target.value)){
            setMailError(false);
        }else{
            setMailError(true);
        }
    };

  
    return (
        <div style={{ height: "100%" }}>      
            <Form>
                <FormContainer>
                    <div>
                        <br></br>
                        <Stack direction="row" >     
               
                            <img  src="/src/assets/ic_mdi_password.svg"></img>
                            <TitleButtonRegister>¿Olvidaste tu contraseña?</TitleButtonRegister> 
                        </Stack>
                        <br/>
                        <MessageWelcome>
            Si has olvidado tu contraseña, no te preocupes. 
            Te guiaremos en el proceso
                        </MessageWelcome>
                        <MessageWelcome>
            de recuperación. Simplemente sigue los pasos a continuación: 
                        </MessageWelcome>
                        <br></br>
                        <MessageWelcome>  
              1. Proporciona la dirección de correo electrónico asociado a tu cuenta.
                        </MessageWelcome>
                        <MessageWelcome>  
              2. Recibirás un correo electrónico o un SMS con un código de seguridad 
                        </MessageWelcome>
                        <MessageWelcome>
            para restablecer tu contraseña.
                        </MessageWelcome>
                    </div>
                    <br/>
                    <GenericField>
                        <StyledInput
                            name="email"
                            label="Email"
                            size="small"
                            placeholder="Ej. felipe@dominio.com"
                            type="email"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={mail}
                            onChange={handleMailChange}
                            fullWidth
                            margin="normal"
                            error={mailError}
                            helperText={mailError ? "El formato del correo es incorrecto" : ""}
                        />
                    </GenericField>
             
                </FormContainer>
            </Form>
            <FormContainer>
                <ButtonRegister onClick={() => {handleSubmit();}}>Confirmar</ButtonRegister>
            </FormContainer>
        </div>  
    );
};

export default RecoverPasswordForm;
