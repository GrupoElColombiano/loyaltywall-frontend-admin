// ReactJS
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

// MUI
import { FormControl, InputLabel, Modal, OutlinedInput } from "@mui/material";
import { GppGoodOutlined } from "@mui/icons-material";

// Shared
import { BtnPrimary, BtnSecondary } from "../../../shared/components/Buttons";
import CardComponent from "../../../shared/components/Card";

// Services
import { updateCredentials } from "../../../service/payment-methods";

// Yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// External Dependences
import Swal from "sweetalert2";

// Styled
import { BtnContainer, ModalContainer } from "../styled";

export default function ModalEvertec({ modal, setModal }: IModalDataProps) {
    // Translation
    const { t } = useTranslation();

    // LocalStorage
    const siteStorage = JSON.parse(localStorage.getItem("siteUser") || "{}");

    // Yup
    const validationScheme = yup.object().shape({
        apiKey: yup.string().required(t("PaymentMethods.apiKeyRequired")),
        clientId: yup.string().required(t("PaymentMethods.clientIdRequired")),
        testMode: yup.boolean(),
    });

    // useForm
    const {
        formState: { isValid },
        handleSubmit,
        register,
    } = useForm({
        resolver: yupResolver(validationScheme),
        mode: "onChange",
    });

    // Functions
    const onSubmit = (data: any) => {
        const refactoredData = {
            ...data,
            id: modal?.data?.id === 0 ? null : modal?.data?.id,
            idPayment: 1,
            name: "evertec",
        };

        updateCredentials(siteStorage?.idSite, refactoredData)
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
                            data: null
                        });                          
                    }
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleClose = () => {
        setModal({
            open: false,
            data: null
        });
    };
    
    return (
        <Modal
            aria-describedby="modal-modal-description"
            aria-labelledby="modal-modal-title"
            onClose={handleClose}
            open={modal.open}
        >
            <ModalContainer onSubmit={handleSubmit(onSubmit)}>
                <CardComponent
                    icon={<GppGoodOutlined sx={{ color: "#0045FF", fontSize: 30 }} />}
                    description={t("PaymentMethods.evertec.modal.description")}
                    title={t("PaymentMethods.evertec.modal.title")}
                >
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-apiKey">{t("PaymentMethods.apiKey")}</InputLabel>
                        <OutlinedInput
                            {...register("apiKey")}
                            defaultValue={modal?.data?.apiKey}
                            id="outlined-adornment-apiKey"
                            label="apiKey"                            
                            placeholder={t("PaymentMethods.apiKeyPlaceholder")}
                            type="text"
                        />
                    </FormControl>

                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-clientId">{t("PaymentMethods.clientId")}</InputLabel>
                        <OutlinedInput
                            {...register("clientId")}
                            defaultValue={modal?.data?.clientId}
                            id="outlined-adornment-clientId"
                            label="clientId"                              
                            placeholder={t("PaymentMethods.clientIdPlaceholder")}
                            type="text"
                        />
                    </FormControl>

                    {/* <FormControlLabel
                        control={
                            <Checkbox
                                {...register("testMode")}
                                defaultChecked={modal?.data?.testMode}
                                name="testMode"
                            />
                        }
                        label={t("PaymentMethods.testMode")} 
                    /> */}

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
                        <BtnPrimary
                            disabled={!isValid}
                            type="submit"
                        >
                            {t("Constants.button.confirm")}
                        </BtnPrimary>
                    </BtnContainer>
                </CardComponent>        
            </ModalContainer>
        </Modal>
    );
}