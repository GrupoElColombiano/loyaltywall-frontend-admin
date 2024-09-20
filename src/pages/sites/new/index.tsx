// ReactJS
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// MUI
import { Box, FormControlLabel, Switch, TextField, Typography } from "@mui/material";

// Shared
import { BtnPrimary } from "../../../shared/components/Buttons";
import NavHeader from "../../../shared/components/NavHeader";

// Services
import { createSite } from "../../../service/sites";

// Yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// External Dependencies
import Swal from "sweetalert2";

// Icons
import SaveIcon from "@mui/icons-material/Save";

// Styled
import { NewSiteContainer } from "./styled";

export default function NewSitePage() {
    // Translation
    const { t } = useTranslation();

    // Navigation
    const navigate = useNavigate();

    // State
    const [isActive, setIsActive] = useState(true);

    // Yup
    const validationScheme = yup.object().shape({
        description: yup.string(),
        name: yup.string().required(t("Constants.form.nameRequired")),
        url: yup.string().url().nullable().required(t("Constants.form.urlRequired")),
    });

    // Form
    const {
        formState: { errors },
        handleSubmit,
        register,
        formState: { isDirty }
    } = useForm({
        mode: "all",
        resolver: yupResolver(validationScheme),
    });

    // Functions
    const onSubmit = (data: any) => {
        const refactoredData = {
            ...data,
            isActive,
        };

        createSite(refactoredData)
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
            .catch((error) => {
                if (error?.response?.status === 500) {
                    Swal.fire({
                        confirmButtonColor: "#0045FF",
                        confirmButtonText: t("Alert.button.confirm"),
                        icon: "error",
                        title: t("Alert.error.title.url.exists"),
                    });

                    return;
                }
                
                Swal.fire({
                    confirmButtonColor: "#0045FF",
                    confirmButtonText: t("Alert.button.confirm"),
                    icon: "error",
                    text: t("Alert.error.text"),
                    title: t("Alert.error.title"),
                });
            });
    };

    const handleChangeStatus = () => {
        Swal.fire({
            title: t("Alert.status.title"),
            text: t("Alert.status.text"),
            confirmButtonText: t("Alert.button.confirm"),
            confirmButtonColor: "#0045FF",
            cancelButtonText: t("Alert.button.cancel"),
            cancelButtonColor: "#7E2EFF",
            icon: "question",
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                setIsActive(!isActive);
            }
        });
    };

    return (
        <NewSiteContainer onSubmit={handleSubmit(onSubmit)}>
            <NavHeader title={`${t("Sites.new.title")}`} description={`${t("Sites.new.description")}`} isBack isFormDirty={isDirty}>
                <BtnPrimary
                    type="submit"
                    onClick={() => {
                        if (errors.url) {
                            Swal.fire({
                                confirmButtonColor: "#0045FF",
                                confirmButtonText: t("Alert.button.confirm"),
                                icon: "error",
                                text: t("Alert.error.text.url"),
                                title: t("Alert.error.title.url"),
                            });
                        }
                    }}
                >
                    <SaveIcon />
                    {t("Sites.button.save")}
                </BtnPrimary>
            </NavHeader>

            <TextField
                {...register("name")}
                id="name"
                label={t("Sites.form.name")}
                placeholder={t("Sites.form.name.placeholder")}
                sx={{ backgroundColor: "#fff", width: "50%" }}
                type="text"
                variant="outlined"
            />

            <TextField
                {...register("url")}
                id="url"
                label={t("Sites.form.url")}
                placeholder={t("Sites.form.url.placeholder")}
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
        </NewSiteContainer>
    );
}