// ReactJS
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";

// Shared
import { BtnPrimary } from "../../../shared/components/Buttons";

// Components
import ModalPayPal from "../modals/ModalPayPal";

// MUI
import { Typography } from "@mui/material";

// Icons
import { AddOutlined, EditOutlined } from "@mui/icons-material";

// Assets
import EVERTEC_PAYPAL from "../../../assets/images/PayPal.png";

// Styled
import { ListContainer } from "../styled";

export default function PayPalComponent(props: IPaymentProps) {
    // Translations
    const { t } = useTranslation();

    // States
    const [modal, setModal] = useState<IModalPayPal>({
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

    const handleAddEditConfig = () => {
        setModal({
            open: true,
            data: props
        });
    };

    return (
        <Fragment>
            <ListContainer>
                <img
                    alt={props?.name}
                    height={50}
                    src={EVERTEC_PAYPAL ?? props?.image}
                    style={{ objectFit: "contain" }}
                    width={140}
                />
                <Typography variant="h6" component="p" style={{ fontSize: 16, width: "80%" }}>
                    {t(`PaymentMethods.${props?.name}.description`)}
                </Typography>

                {props?.isActive ? (
                    <BtnPrimary onClick={handleAddEditConfig} style={{ width: 150 }}>
                        <EditOutlined />
                        {t("Constants.button.edit")}
                    </BtnPrimary>
                ) : (
                    <BtnPrimary onClick={handleAddNewConfig} style={{ width: 150 }}>
                        <AddOutlined />
                        {t("Constants.button.aggregate")}
                    </BtnPrimary>
                )}
            </ListContainer>

            <ModalPayPal modal={modal} setModal={setModal} />
        </Fragment>
    );
}
