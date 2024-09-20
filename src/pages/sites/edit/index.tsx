// ReactJS
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// MUI
import { Box, FormControlLabel, Switch, TextField, Typography } from "@mui/material";

// Shared
import { BtnPrimary } from "../../../shared/components/Buttons";
import NavHeader from "../../../shared/components/NavHeader";

// Services
import { updateSite } from "../../../service/sites";

// Yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// External Dependencies
import Swal from "sweetalert2";

// Icons
import SaveIcon from "@mui/icons-material/Save";

// Styled
import { EditSiteContainer } from "./styled";

export default function EditSitePage() {
    // Translation
    const { t } = useTranslation();

    // Navigation
    const navigate = useNavigate();

    const location = useLocation();
    const { data: dataSite } = location.state;

    // State
    const [isActive, setIsActive] = useState(dataSite.isActive);
    const [btnLoading, setBtnLoading] = useState(false);

    // Yup
    const validationScheme = yup.object().shape({
        description: yup.string(),
        name: yup.string().required(t("Constants.form.nameRequired")),
        url: yup.string().required(t("Constants.form.urlRequired")),
        isActive: yup.boolean()
    });

    // Form
    const {
        handleSubmit,
        register,
        formState: { isDirty },
    } = useForm({
        defaultValues: {
            description: dataSite.description,
            name: dataSite.name,
            url: dataSite.url,
            isActive: dataSite.isActive
        },
        mode: "onChange",
        resolver: yupResolver(validationScheme),
    });

    // Functions
    const onSubmit = (data: any) => {
        const refactoredData = {
            ...data,
            isActive,
        };

        setBtnLoading(true);

        updateSite(dataSite?.idSite, refactoredData)
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

    return (
        <EditSiteContainer onSubmit={handleSubmit(onSubmit)}>
            <NavHeader title={`${t("Sites.edit.title")}`} description={`${t("Sites.edit.description")}`} isBack isFormDirty={isDirty}>
                <BtnPrimary type="submit" loading={btnLoading}>
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
                disabled
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
                            {...register("isActive")}
                            id="isActive"
                            checked={isActive}
                            onChange={handleChangeStatus}
                            color="primary"
                            // defaultChecked
                            name="status"
                        />
                    }
                    label={`${t("Constants.status.active")} / ${t("Constants.status.inactive")}`}
                />
                <Typography variant="subtitle1" style={{ color: "#6B7280" }}>
                    {t("Constants.status.description")}
                </Typography>
            </Box>
        </EditSiteContainer>
    );
}