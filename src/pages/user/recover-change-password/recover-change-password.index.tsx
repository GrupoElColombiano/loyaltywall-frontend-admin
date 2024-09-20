import React, { useState, ChangeEvent } from "react";
import { InputAdornment, IconButton  } from "@mui/material";
import { Form, FormContainer, GenericField, StyledInput, 
    GenericFieldLeft,
    ButtonRegister, TitleButtonRegister, MessageWelcome, MessageRecomend, SignInContainer} from "./recover-change-password.style";
//import PropTypes from 'prop-types'
import Stack from "@mui/material/Stack"; 
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Alert from "@mui/material/Alert";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { ChangePasswordS, RecoverData } from "../../../service/recover-password/recover-password.service";
import { MyComponentProps } from "../../../service/recover-password/interfaces/recover-props";

const RecoverChangePassword: React.FC<MyComponentProps> = ({token}) => {

    const regex = /^(?=.*\w*\d)(?=.*\w*[A-Z])(?=.*\w*[a-z])(?=.*\w*[$@$!%*?&])\S{8,100}$/;
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [showPasswordAlert, setShowPasswordAlert] = useState(false);
  
    const handleSubmit = async () => {

        if (password.length < 8){
            setPasswordError(true);
            return;
        }

        if (confirmPassword.length < 8){
            setPasswordMatchError(true);
            return;
        }

        const userRecord: RecoverData = {
            newPassword: password,
            token: token
        };
    
        try {

            confirmAlert({
                title: "Confirmar el cambio de contraseña",
                message: "¿Estás segura de hacer esto?",
                buttons: [
                    {
                        label: "Aceptar",
                        onClick: () => 
                            ChangePasswordS(userRecord, (result) => {
                                if(result.status == 201){
                                    alert(result.data.message);
                                    return;
                                }

                                if(result.status == 400){
                                    alert(result.response.data.message);
                                    return;
                                }

                                if(result.response.status == 404){
                                    alert(result.response.data.message);
                                    return;
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

 
 
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setPasswordError(false);
        setPasswordMatchError(false);

        if(confirmPassword.length > 0){
            if (confirmPassword !== event.target.value) {
                setPasswordMatchError(true);
                return;
            }
        }

        if(regex.test(event.target.value)){
            setShowPasswordAlert(true);
        }else{
            setShowPasswordAlert(false);
        }
    
    };

    const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
        setPasswordError(false);
        setPasswordMatchError(false);

        if (password !== event.target.value) {
            setPasswordMatchError(true);
            return;
        }
    };


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const togglePasswordConfirmVisibility = () => {
        setShowPasswordConfirm(!showPasswordConfirm);
    };

    
    return (      
        <SignInContainer>
            <div style={{ height: "100%" }}>
                <Form>
                    <FormContainer>
                        <div>
                            <br></br>
                            <Stack direction="row" >     
                                <img  src="/src/assets/ic_carbon_password.svg"></img>
                                <TitleButtonRegister>Crear nueva contraseña</TitleButtonRegister> 
                            </Stack>
                            <GenericFieldLeft>

                                <MessageRecomend>Recomendaciones:</MessageRecomend> 
                                <ul style={{marginLeft:"-20px", marginTop:"-1px"}}>
                                    <li>
                                        <MessageWelcome>
                    Elige una contraseña segura y única
                                        </MessageWelcome>
                                    </li>
                                    <li>
                                        <MessageWelcome>
                  Asegúrate de combinar letras mayúsculas y minúsculas, números y símbolos.
                                        </MessageWelcome>
                                    </li>
                                    <li>
                                        <MessageWelcome>Evita usar información personal obvia.</MessageWelcome>
                                    </li>
                                </ul>
                            </GenericFieldLeft> 
                        </div>

                        <GenericField>
                            <StyledInput
                                name="password"
                                label="Nueva contraseña"
                                size="small"
                                placeholder="Ej. ********"
                                type={showPassword ? "text" : "password"}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={password}
                                onChange={handlePasswordChange}
                                error={passwordError}
                                helperText={passwordError ? "El password es obligatorio" : ""}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={togglePasswordVisibility}>
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </GenericField>        
                        <GenericFieldLeft style={{width: (!showPasswordAlert ? 0 : "100%"), height: !showPasswordAlert ? 0 : "100%"}}>
                            <Alert severity="success" 
                                style={{
                                    width: !showPasswordAlert ? 0 : "95%", 
                                    height: !showPasswordAlert ? 0 : "70%",
                                    visibility: !showPasswordAlert ? "hidden" : "visible"
                                }}>Contraseña fuerte</Alert>
                        </GenericFieldLeft>
                        <GenericFieldLeft style={{
                            width: ( (showPasswordAlert)  ? 0 : (password.length > 0 ? "100%" : 0)), 
                            height:  (showPasswordAlert)  ? 0 : (password.length > 0 ? "100%" : 0)}}>
                            <Alert severity="warning" 
                                style={{
                                    width:  (showPasswordAlert) ? 0 : (password.length > 0 ? "95%" : 0), 
                                    height:  (showPasswordAlert) ? 0 : (password.length > 0 ? "70%" : 0),
                                    visibility:  (showPasswordAlert) ? "hidden" : (password.length > 0 ? "visible" :  "hidden")
                                }}>Contraseña débil</Alert>
                        </GenericFieldLeft>        
                        <GenericField>
                            <StyledInput
                                name="confirmPassword"
                                label="Confirmar nueva contraseña"
                                size="small"
                                placeholder="Ej. ********"
                                type={showPasswordConfirm ? "text" : "password"}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                error={passwordMatchError}
                                helperText={passwordMatchError ? "Passwords no coinciden" : ""}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={togglePasswordConfirmVisibility}>
                                                {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </GenericField>

                    </FormContainer>
                </Form>
                <FormContainer>
                    <ButtonRegister onClick={() => {handleSubmit();}}>Enviar</ButtonRegister>
                </FormContainer>
            </div>
        </SignInContainer>
    );
};

export default RecoverChangePassword;
