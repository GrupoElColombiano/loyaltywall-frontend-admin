// ReactJS
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// MUI
import { FormControl, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";

// Shared
import { BtnPrimary } from "../../../shared/components/Buttons";

// Components
import ModalConfigPoints from "../modals/ModalConfigPoints";

// Services
import { getPointValueBySite } from "../../../service/gamification";

// Icons
import { Add } from "@mui/icons-material";

// Styled
import { AmountContainer, FooterCard } from "../styled";

export default function CardConfigPoints() {
    // Translation
    const { t } = useTranslation();

    //Storage
    const siteStorage = localStorage.getItem("siteUser");
    const siteJson = siteStorage ? JSON?.parse(siteStorage) : {};

    // States
    const [modal, setModal] = useState<IModalPointState>({
        open: false,
        data: null
    });

    // Functions
    const handleAddNewConfig = () => {
        setModal({
            ...modal,
            open: true
        });
    };

    //Effects
    useEffect(() => {
        getPointValueBySite(siteJson.idSite)
            .then((res: any) => {
                setModal({
                    open: false,
                    data: {
                        amount: res?.data.point_value
                    }
                });
            })
            .catch((err: any) => console.log(err));
    }, []);    

    return (
        <FooterCard>
            <AmountContainer>
                <Typography variant="h6" component="h3">
                    {t("Gamification.points.equality")}
                </Typography>
                <FormControl sx={{ width: "10rem" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-amount" sx={{ bgcolor: "#FFF" }}>{t("Gamification.points.label")}</InputLabel>
                    <OutlinedInput
                        defaultValue={modal.data ? modal.data.amount : 0}
                        disabled
                        endAdornment={<InputAdornment position="end">COP</InputAdornment>}
                        id="outlined-adornment-amount"
                        inputProps={{ inputMode: "numeric", min: 1 }}
                        label="Amount"
                        placeholder="0"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        type="number"
                        value={modal.data ? modal.data.amount : 0}
                    />
                </FormControl>
            </AmountContainer>
            
            <BtnPrimary onClick={handleAddNewConfig}>
                <Add />         
                {t("Constants.button.config")}
            </BtnPrimary>

            <ModalConfigPoints modal={modal} setModal={setModal} />
        </FooterCard>
    );
}
