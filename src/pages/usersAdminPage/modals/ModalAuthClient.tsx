// ReactJS
import { useState } from "react";
// import { useTranslation } from "react-i18next";

// MUI
import { Modal, TextField, Button, CardActions  } from "@mui/material";

// Shared
import CardComponent from "../../../shared/components/Card";

// External Dependences
import Swal from "sweetalert2";

// Styled
import { ModalContainer } from "./styled";

import { authenticationClient } from "../../../service/sites";
import { ToastContainer, toast } from "react-toastify";

export default function ModalAuthClient({ modal, setModal, handleConfirmToken }: IModalDataProps) {
    // Translation
    // State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // Functions
    const handleClose = () => {
        setModal({
            ...modal,
            open: false,
        });
    };

    const handleConfirm = () => {

        if (!email || !password) {
            alert("Debe completar todos los campos");
            return;
        }

        authenticationClient()
            .then((result) => {             

                const accessToken =  result.data.access_token;
                localStorage.setItem("accessTokenClient", accessToken);
                if (handleConfirmToken) {
                    handleConfirmToken(accessToken);
                }   
              
                Swal.fire({
                    title: "Lista de clientes exitoso",
                    icon: "success",
                    customClass: {
                        container: "my-swal-container",
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        setModal({
                            open: false,
                            data: [
                                ...modal.data,
                                {
                                    access_token: accessToken
                                }
                            ]
                        });                        
                    }
                });
            })
            .catch((err: any) => {
                toast.error("" + err);
            });
                
            
    };

    return (
        <Modal
            aria-describedby="modal-modal-description"
            aria-labelledby="modal-modal-title"
            onClose={handleClose}
            open={modal.open}
        >
            
            <ModalContainer>
                <ToastContainer />
                <CardComponent
                    description="Debera autenticarse nuevamente para poder visualizar los usuarios de los planes"
                    title="Ingrese sus credenciales"
                >
                   
                    <TextField
                        id="email"
                        label="Correo"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        id="password"
                        label="Contraseña"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <CardActions style={{ justifyContent: "space-between" }}>
                        <Button onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button onClick={handleConfirm}>
                            Confirmar
                        </Button>
                    </CardActions>
                </CardComponent>
            </ModalContainer>
            
        </Modal>

    );
}
