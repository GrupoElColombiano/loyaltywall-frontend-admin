// ReactJS
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

// MUI
import { Box, FormControlLabel, Switch, TextField, Typography } from "@mui/material";

// Shared
import { BtnPrimary } from "../../../shared/components/Buttons";
import Announcement from "../../../shared/components/Announcement";
import NavHeader from "../../../shared/components/NavHeader";

// Services
import { createProduct } from "../../../service/products";

// Yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// External Dependencies
import Swal from "sweetalert2";

// Icons
import SaveIcon from "@mui/icons-material/Save";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

// Styled
import { NewProductsContainer } from "./styled";

export default function NewProductPage() {
    // Translation
    const { t } = useTranslation();

    // Local Storage
    const site = JSON.parse(localStorage.getItem("siteUser") || "{}");

    // Navigation
    const navigate = useNavigate();

    // State
    const [isActive, setIsActive] = useState(false);

    const [btnLoading, setBtnLoading] = useState(false);

    // Yup
    const validationScheme = yup.object().shape({
        name: yup.string().required(t("Constants.form.nameRequired")),
        description: yup.string(),
    });

    // Form
    const {
        handleSubmit,
        register,
        formState: { isDirty }
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(validationScheme),
    });

    // Functions
    const onSubmit = (data: any) => {
        const refactorData = {
            ...data,
            all_product: isActive,
            isActive: true,
            site: site?.idSite,
        };

        setBtnLoading(true);

        createProduct(refactorData)
            .then(() => {
                Swal.fire({
                    confirmButtonColor: "#0045FF",
                    confirmButtonText: t("Alert.button.confirm"),
                    icon: "success",
                    text: t("Alert.save.text"),
                    title: t("Alert.save.title"),
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate(-1);
                    }
                });
            })
            .catch(() => {
                Swal.fire({
                    confirmButtonColor: "#0045FF",
                    confirmButtonText: t("Alert.button.confirm"),
                    icon: "error",
                    text: t("Alert.error.text"),
                    title: t("Alert.error.title"),
                });
            })
            .finally(() => {
                setBtnLoading(false);
            });
    }; 

    const handleChangeStatus = () => {
        Swal.fire({
            cancelButtonColor: "#7E2EFF",
            cancelButtonText: t("Alert.button.cancel"),
            confirmButtonColor: "#0045FF",
            confirmButtonText: t("Alert.button.confirm"),
            icon: "success",
            showCancelButton: true,
            text: t("Alert.allProducts.text"),
            title: t("Alert.allProducts.title"),
        }).then((result) => {
            if (result.isConfirmed) {
                setIsActive(!isActive);
            }
        });
    };

    const [actionsModule, setActionsModule] = useState<IActionRole[]>([]);

    // Effects
    useEffect(() => {
        if(localStorage.getItem("2")){
            const productoModuleData = JSON.parse(localStorage.getItem("2") || "{}");
            setActionsModule(productoModuleData); // Guarda el productoModule en el estado
        }else{
            alert("Por favor inicie de nuevo sesion para recuperar los permisos");
        }
    }, []);  

    return (
        <NewProductsContainer onSubmit={handleSubmit(onSubmit)}>
            <NavHeader title={`${t("Products.new.title")}`} description={`${t("Products.new.description")}`} isBack isFormDirty={isDirty}>
                {actionsModule && actionsModule.find(action => action.description === "Crear" && action.role != null) && (
                    <BtnPrimary type="submit" loading={btnLoading}>
                        <SaveIcon />
                        {t("Products.button.save")}
                    </BtnPrimary>
                )
                }
            </NavHeader>

            <Announcement text={t("Products.announcement.create")} />

            <TextField
                {...register("name")}
                id="name"
                label={t("Products.form.name")}
                placeholder={t("Products.form.name.placeholder")}
                sx={{ backgroundColor: "#fff", width: "50%" }}
                type="text"
                variant="outlined"
            />

            <TextField
                {...register("description")}
                id="description"
                label={t("Constants.form.description")}
                multiline
                placeholder={t("Constants.form.description.placeholder")}
                rows={4}
                sx={{ backgroundColor: "#fff", width: "50%" }}
                type="text"
                variant="outlined"
            />

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Inventory2OutlinedIcon sx={{ color: "#0045FF", fontSize: 30 }} />

                <Typography variant="body1" component="h1">
                    {t("Constants.table.header.allProducts")}
                </Typography>
            </div>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={isActive}
                            onChange={handleChangeStatus}
                            color="primary"
                            defaultChecked
                            name="all_products"
                        />
                    }
                    label={`${t("Constants.status.false")} / ${t("Constants.status.true")}`}
                />
                <Typography variant="subtitle1" style={{ color: "#6B7280" }}>
                    {t("Products.allProducts.description")}
                </Typography>
            </Box>
        </NewProductsContainer>
    );
}