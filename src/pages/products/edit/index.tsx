// ReactJS
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// MUI
import { Box, FormControlLabel, Switch, TextField, Typography } from "@mui/material";

// Shared
import { BtnPrimary } from "../../../shared/components/Buttons";
import Announcement from "../../../shared/components/Announcement";
import NavHeader from "../../../shared/components/NavHeader";

// Services
import { updateProduct } from "../../../service/products";

// Yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// External Dependencies
import Swal from "sweetalert2";

// Icons
import SaveIcon from "@mui/icons-material/Save";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

// Styled
import { EditProductsContainer } from "./styled";

export default function EditProductPage() {
    // Translation
    const { t } = useTranslation();

    // Navigation
    const navigate = useNavigate();

    const location = useLocation();
    const { data: dataProduct } = location.state;

    // State
    const [allProduct, setAllProduct] = useState(dataProduct?.all_product);
    const [btnLoading, setBtnLoading] = useState(false);
    const [isActive, setIsActive] = useState(dataProduct?.isActive);

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
        defaultValues: {
            name: dataProduct.name,
            description: dataProduct.description,
        },
        mode: "onChange",
        resolver: yupResolver(validationScheme),
    });

    // Functions
    const onSubmit = (data: any) => {
        const refactorData = {
            ...data,
            idProduct: dataProduct.idProduct,
            isActive: isActive,
            all_product: allProduct,
        };

        setBtnLoading(true);

        updateProduct(dataProduct.idProduct, refactorData)
            .then(() => {
                Swal.fire({
                    confirmButtonColor: "#0045FF",
                    confirmButtonText: t("Alert.button.confirm"),
                    icon: "success",
                    title: t("Alert.edit.title"),
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
            text: t("Alert.status.text"),
            title: t("Alert.status.title"),
        }).then((result) => {
            if (result.isConfirmed) {
                setIsActive(!isActive);
            }
        });
    };

    const handleChangeAllProductsStatus = () => {
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
                setAllProduct(!allProduct);
            }
        });
    };

    return (
        <EditProductsContainer onSubmit={handleSubmit(onSubmit)}>
            <NavHeader title={`${t("Products.edit.title")}`} description={`${t("Products.edit.description")}`} isBack isFormDirty={isDirty}>
                <BtnPrimary type="submit" loading={btnLoading}>
                    <SaveIcon />
                    {t("Products.button.save")}
                </BtnPrimary>
            </NavHeader>

            <Announcement text={t("Products.announcement.edit")} />

            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">
                    {t("Constants.label.status")}
                </Typography>
                <FormControlLabel
                    control={
                        <Switch
                            checked={isActive}
                            onChange={handleChangeStatus}
                            color="primary"
                            defaultChecked
                            name="status"
                        />
                    }
                    label={`${t("Constants.status.active")} / ${t("Constants.status.inactive")}`}
                />
                <Typography variant="subtitle1" style={{ color: "#6B7280" }}>
                    {t("Constants.status.description")}
                </Typography>
            </Box>

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
                            checked={allProduct}
                            onChange={handleChangeAllProductsStatus}
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
        </EditProductsContainer>
    );
}