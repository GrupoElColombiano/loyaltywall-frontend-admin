// ReactJS
import { useTranslation } from "react-i18next";

// MUI
import { Modal } from "@mui/material";

// Shared
import { BtnPrimary, BtnSecondary } from "../../../shared/components/Buttons";
import CardComponent from "../../../shared/components/Card";

// Styled
import { BtnContainer, ModalContainer } from "../styled";

/*
[ES.json]
"Gamification.modal.event.register.description": "",
"Gamification.modal.event.register.title": "",

[EN.json]
"Gamification.modal.event.register.description": "",
"Gamification.modal.event.register.title": "",
*/

export default function ModalConfigEventRegister({ modal, setModal }: IModalDataProps) {
    // Translation
    const { t } = useTranslation();

    // Functions
    const handleClose = () => {
        setModal({
            open: false,
            data: null
        });
    };

    const handleConfirm = () => {
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
            <ModalContainer>
                <CardComponent
                    description={t("Gamification.modal.event.register.description")}
                    title={t("Gamification.modal.event.register.title")}
                >
                    <BtnContainer justifyContent="space-between">
                        <BtnSecondary onClick={handleClose}>
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
