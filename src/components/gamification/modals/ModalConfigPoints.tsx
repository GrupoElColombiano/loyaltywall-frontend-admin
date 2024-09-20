// ReactJS
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// MUI
import { FormControl, InputAdornment, InputLabel, Modal, OutlinedInput, Typography } from "@mui/material";

// Shared
import { BtnPrimary, BtnSecondary } from "../../../shared/components/Buttons";
import CardComponent from "../../../shared/components/Card";

// Service
import { updatePointValueBySite } from "../../../service/gamification";

// External Dependences
import Swal from "sweetalert2";

// Styled
import { AmountContainer, BtnContainer, ModalContainer } from "../styled";

export default function ModalConfigPoints({ modal, setModal }: IModalDataProps) {
    // Translation
    const { t } = useTranslation();

    //Storage
    const siteStorage = localStorage.getItem("siteUser");
    const siteJson = siteStorage ? JSON?.parse(siteStorage) : {};

    // State
    const [amount, setAmount] = useState(modal?.data?.amount || 0);

    // Functions
    const handleClose = () => {
        setModal({
            ...modal,
            open: false,
        });
    };

    const handleConfirm = () => {
        updatePointValueBySite(siteJson.idSite, {point_value: amount})
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
                                ...modal.data,
                                amount: amount
                            }
                        });                          
                    }
                });
            })
            .catch((err: any) => console.log(err));
    };

    //Efects
    useEffect(() => {
        if (modal.data) {
            setAmount(modal.data.amount);
        }
    }, []);   

    return (
        <Modal
            open={modal.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <ModalContainer>
                <CardComponent
                    description={t("Gamification.modal.points.description")}
                    title={t("Gamification.points.title")}
                >
                    <AmountContainer direction="column">
                        <Typography variant="body1" component="h3">
                            {t("Gamification.points.equality")}
                        </Typography>
                        <FormControl sx={{ width: "10rem" }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-amount" sx={{ bgcolor: "#FFF" }}>{t("Gamification.points.label")}</InputLabel>
                            <OutlinedInput
                                defaultValue={modal.data ? modal.data.amount : amount}
                                endAdornment={<InputAdornment position="end">COP</InputAdornment>}
                                id="outlined-adornment-amount"
                                inputProps={{ inputMode: "numeric", min: 1 }}
                                label="Amount"
                                onChange={(e) => setAmount(Number(e.target.value))}
                                placeholder="0"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                type="number"
                            />
                        </FormControl>
                    </AmountContainer>
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
