// ReactJS
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";

// MUI
import { Typography } from "@mui/material";

// Shared
import { BtnPrimary } from "../../../shared/components/Buttons";

// Components
import ModalConfigEventRegister from "../modals/ModalConfigEventRegister";

// Icons
import { Add } from "@mui/icons-material";

// Styled
import { BtnContainer } from "../styled";

export default function CardConfigEventRegister() {
    // Translation
    const { t } = useTranslation();

    // States
    const [modal, setModal] = useState({
        open: false,
        data: null
    });

    // Functions
    const handleAddNewConfig = () => {
        setModal({
            open: true,
            data: null
        });
    };

    return (
        <Fragment>
            <BtnContainer>
                <BtnPrimary onClick={handleAddNewConfig}>
                    <Add />         
                    {t("Constants.button.add.config")}
                </BtnPrimary>
                {modal?.data === null && (
                    <Typography variant="body1" component="p">
                        {t("Gamification.event.register.empty")}
                    </Typography>
                )}
            </BtnContainer>

            <ModalConfigEventRegister modal={modal} setModal={setModal} />
        </Fragment>
    );
}
