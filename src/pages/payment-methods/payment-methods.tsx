// ReactJS
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// MUI
import { Divider, Typography } from "@mui/material";

// Shared
import { BtnPrimary } from "../../shared/components/Buttons";
import CardComponent from "../../shared/components/Card";
import NavHeader from "../../shared/components/NavHeader";

// Components
import PayPalComponent from "../../components/payment-methods/cards/PayPalComponent";
import EvertecComponent from "../../components/payment-methods/cards/EvertecComponent";

// Services
import { getPaymentMethods } from "../../service/payment-methods";

// Icons
import { CreditCardOutlined, HistoryOutlined, PaidOutlined } from "@mui/icons-material";

// Styled
import { BtnFooter, PaymentMethodsContainer } from "./styled";

const PAYMENTS_METHODS = [
    {
        id: 0,
        name: "evertec",
        clientId: "",
        apiKey: "",
        image: "https://example.com/everfit_logo.png",
        createdAt: "",
        updatedAt: "",
        isActive: true,
        testMode: false
    },
    {
        id: 0,
        name: "paypal",
        clientId: "",
        apiKey: "",
        image: "https://example.com/paypal_logo.png",
        createdAt: "",
        updatedAt: "",
        isActive: true,
        testMode: false
    }
];

export default function PaymentMethodsPage() {
    // Translations
    const { t } = useTranslation();

    // Navigation
    const navigate = useNavigate();   

    // LocalStorage
    const siteStorage = JSON.parse(localStorage.getItem("siteUser") || "{}");
    
    // States
    const [paymentMethods, setPaymentMethods] = useState<IPaymentProps[]>([]);

    // Effects
    useEffect(() => {
        getPaymentMethods(siteStorage.idSite)
            .then((res) => {
                console.log('Data de la API', res.data)
                if (res.data.length <= 1) {
                    const payment = res.data[0];
                    
                    if (payment.name === "paypal") {
                        setPaymentMethods([payment, PAYMENTS_METHODS[0]]);
                    } else {                        
                        setPaymentMethods([payment, PAYMENTS_METHODS[1]]);
                    }

                    return;
                }

                setPaymentMethods(res.data);
            })
            .catch(() => {
                setPaymentMethods(PAYMENTS_METHODS);
            });
    }, []);    

    return (
        <PaymentMethodsContainer>
            <NavHeader title={t("PaymentMethods.title")} />
            
            <CardComponent
                description={t("PaymentMethods.config.description")}
                icon={<CreditCardOutlined sx={{ color: "#0045FF", fontSize: 30 }} />}
                title={t("PaymentMethods.config.title")}
            >
                {paymentMethods.map((paymentMethod, index) => {
                    const DEFAULT_PAYMENT = null;

                    const PAYMENT: { [key: string]: JSX.Element } = {
                        paypal: <PayPalComponent {...paymentMethod} />,
                        evertec: <EvertecComponent {...paymentMethod} />
                    };

                    return (
                        <Fragment>
                            <Divider />
                            {PAYMENT[paymentMethod.name] || DEFAULT_PAYMENT}
                            {index === paymentMethods.length - 1 && <Divider />}
                        </Fragment>
                    );
                })}
            </CardComponent>

            <CardComponent
                description={t("PaymentMethods.history.description")}
                icon={<HistoryOutlined sx={{ color: "#0045FF", fontSize: 30 }} />}
                title={t("PaymentMethods.history.title")}
            >
                <BtnFooter>
                    <BtnPrimary onClick={() => navigate("/payment-methods/history")}>
                        <PaidOutlined />
                        {t("Constants.button.history")}
                    </BtnPrimary>
                    <Typography variant="body1" component="p">
                        {t("PaymentMethods.history.info")}
                    </Typography>
                </BtnFooter>
            </CardComponent>
        </PaymentMethodsContainer>
    );
}
