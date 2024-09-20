// ReactJS
import { useState } from "react";
import { useTranslation } from "react-i18next";

// MUI
import { FormControl, InputLabel, Modal, OutlinedInput, Typography } from "@mui/material";

// Shared
import { BtnPrimary, BtnSecondary } from "../../../shared/components/Buttons";
import CardComponent from "../../../shared/components/Card";

// Services
import { updateClusterPenalization } from "../../../service/gamification";

// External Dependences
import Swal from "sweetalert2";

// Styled
import { BtnContainer, ModalContainer } from "../styled";

export default function ModalConfigClustersPenalization({ modal, setModal, editData }: IModalDataProps) {
    // Translation
    const { t } = useTranslation();

    //Storage
    const siteStorage = localStorage.getItem("siteUser");
    const siteJson = siteStorage ? JSON?.parse(siteStorage) : {};


    // State
    const [limitTime, setLimitTime] = useState(editData?.limitTime || 0);

    // Functions
    const handleClose = () => {
        setModal({
            open: false,
            data: modal.data
        });
    };

    const handleConfirm = () => {
        const data = {
            penaltyClusters: limitTime,
            idSite: siteJson.idSite
        };

        updateClusterPenalization(data)
            .then(() => {
                Swal.fire({
                    title: t("Alert.success.gamification.title"),
                    icon: "success",
                    customClass: {
                        container: "my-swal-container",
                    }
                })
                    .then((result) => {
                        if (result.isConfirmed) {  
                            setModal({
                                open: false,
                                data: {
                                    limitTime
                                }
                            });    
                                
                            setLimitTime(0);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
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
                <CardComponent
                    description={t("Gamification.clusters.penalization.description")}
                    title={t("Gamification.clusters.penalization.title")}
                >
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", justifyContent: "center", alignItems: "center" }}>
                        <Typography variant="body1" component="h1">
                            {t("Gamification.clusters.penalization.limitTime")}
                        </Typography>

                        <FormControl sx={{ width: "10rem" }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-amount">{t("Constants.days")}</InputLabel>
                            <OutlinedInput
                                defaultValue={editData?.limitTime || limitTime}
                                id="outlined-adornment-amount"
                                inputProps={{ inputMode: "numeric", min: 1 }}
                                label="days"
                                onChange={(e) => setLimitTime(Number(e.target.value))}
                                placeholder="0"
                                type="number"
                            />
                        </FormControl>
                    </div>

                    <BtnContainer justifyContent="space-between">
                        <BtnSecondary onClick={() => {
                            Swal.fire({
                                title: t("Alert.exit.gamification.title"),
                                text: t("Alert.exit.gamification.text"),
                                confirmButtonText: t("Alert.button.confirm"),
                                confirmButtonColor: "#4073FF",
                                cancelButtonText: t("Alert.button.cancel"),
                                cancelButtonColor: "#EF5350",
                                icon: "error",
                                showCancelButton: true,
                                customClass: {
                                    container: "my-swal-container",
                                }
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    handleClose();                            
                                }
                            });
                        }}>
                            {t("Constants.button.cancel")}
                        </BtnSecondary>
                        <BtnPrimary onClick={handleConfirm}>
                            {t("Constants.button.confirm")}
                        </BtnPrimary>
                    </BtnContainer>
                </CardComponent>
            </ModalContainer>
        </Modal>
    );
}
