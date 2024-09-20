// ReactJS
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// MUI
import { FormControl, InputLabel, Modal, OutlinedInput, Typography } from "@mui/material";

// Shared
import { BtnPrimary, BtnSecondary } from "../../../shared/components/Buttons";
import CardComponent from "../../../shared/components/Card";

// Service
import { createNewExpireTimeAndDeactivateCurrent } from "../../../service/gamification";

// External Dependences
import Swal from "sweetalert2";

// Styled
import { BtnContainer, ModalContainer } from "../styled";

export default function ModalConfigPointsExpiration({ modal, setModal, editData }: IModalDataProps) {
    // Translation
    const { t } = useTranslation();

    // State
    const [currentDays, setCurrentDays] = useState(editData?.days ?? 0);

    //Storage
    const siteStorage = localStorage.getItem("siteUser");
    const siteJson = siteStorage ? JSON?.parse(siteStorage) : {};

    // Functions
    const handleClose = () => {
        setModal({
            open: false,
            data: editData ? { days: editData.days } : null
        });
    };   

    const handleConfirm = () => {
        createNewExpireTimeAndDeactivateCurrent(siteJson.idSite, { expireTime: currentDays })
            .then(() => {
                Swal.fire({
                    title: t("Alert.success.gamification.title"),
                    icon: "success",
                    customClass: {
                        container: "my-swal-container",
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        setModal({
                            open: false,
                            data: {
                                days: currentDays
                            }
                        });                         
                    }
                });               
            })
            .catch((err: any) => console.log(err));
    };

    //Effects:
    useEffect(() => {
        if(editData){
            setCurrentDays(editData.days);
        }
    }, [editData]);

    return (
        <Modal
            open={modal.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <ModalContainer>
                <CardComponent
                    description={t("Gamification.modal.points.expiration.description")}
                    title={t("Gamification.modal.points.expiration.title")}
                >
                    <Typography variant="body1" component="h3">
                        {t("Gamification.modal.points.expiration.currentDays")}
                    </Typography>

                    <Typography variant="body1" component="p">
                        {t("Gamification.modal.points.expiration.currentDays.description")}
                    </Typography>

                    <FormControl sx={{ width: "10rem" }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-amount">{t("Constants.days")}</InputLabel>
                        <OutlinedInput
                            defaultValue={editData?.days || currentDays}
                            id="outlined-adornment-amount"
                            inputProps={{ inputMode: "numeric", min: 1 }}
                            label="days"
                            onChange={(e) => setCurrentDays(Number(e.target.value))}
                            placeholder="0"
                            type="number"
                        />
                    </FormControl>

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
