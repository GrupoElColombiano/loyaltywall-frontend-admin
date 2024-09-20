// ReactJS
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

// MUI
import { Checkbox, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";

// Shared
import { BtnPrimary, BtnSecondary } from "../../../shared/components/Buttons";

// External Dependencies
import { Dayjs } from "dayjs";
import Swal from "sweetalert2";

// Yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// MUI X
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// Styled
import { SectionContainer, ModalContainer, BtnContainer } from "./styled";

const arrayTimes = [
    { id: 1, name: "Plan.newPlan.time.undefined", value: "Indefinido" },
    { id: 2, name: "Plan.newPlan.time.daily", value: "Diario" },
    { id: 3, name: "Plan.newPlan.time.weekly", value: "Semanal" },
    { id: 4, name: "Plan.newPlan.time.monthly", value: "Mensual" },
    { id: 5, name: "Plan.newPlan.time.yearly", value: "Anual" },
];

export default function ModalPlanRates({ editData, modal, setModal }: IModalDataProps) {
    // Translation
    const { t } = useTranslation();

    // States
    const [checked, setChecked] = useState(editData?.is_special || false);

    const [dateStart, setDateStart] = useState<Dayjs | null>(editData?.date_start || null);
    const [dateEnd, setDateEnd] = useState<Dayjs | null>(editData?.date_end || null);

    // Constants
    const newArrayTimes = modal.data.length > 0 ? arrayTimes.filter((time) => time?.value !== "Indefinido") : arrayTimes;

    // Yup
    const validationScheme = yup.object().shape({
        duration: yup.string(),
        rate_renewal: yup.string(),
        rate_special_renewal: yup.string(),
        rate_special: yup.string(),
        rate: yup.string().test("rate", t("Validation.required"), function(value) {
            if (watch("time") === "Indefinido") {
                return true;
            } else {
                return value !== undefined;
            }
        }),
        time: yup.string().required(t("Validation.required")),
    });

    // Form
    const {
        handleSubmit,
        register,
        reset,
        watch,
    } = useForm({
        defaultValues: {
            duration: editData?.duration,
            rate_renewal: editData?.rate_renewal,
            rate_special_renewal: editData?.rate_special_renewal,
            rate_special: editData?.rate_special,
            rate: editData?.rate,
            time: editData?.time,
        },
        mode: "all",
        resolver: yupResolver(validationScheme),
    });

    // Functions
    const onSubmit = (data: any) => {
        const refactoredData = {
            date_end: dateEnd?.format("YYYY-MM-DD") ?? null,
            date_start: dateStart?.format("YYYY-MM-DD") ?? null,
            duration: Number(data?.duration ?? 0),
            is_special: checked,
            rate_renewal: Number(data?.rate_renewal ?? 0),
            rate_special_renewal: Number(data?.rate_special_renewal ?? 0),
            rate_special: Number(data?.rate_special ?? 0),
            rate: Number(data?.rate ?? 0),
            time: data?.time ?? "",
        };
        
        reset();

        setChecked(false);

        setDateStart(null);

        setDateEnd(null);

        setModal({
            open: false,
            data: [...modal.data, refactoredData]
        });
    };

    const handleClose = () => {
        reset();

        setChecked(false);

        setDateStart(null);

        setDateEnd(null);

        setModal({
            ...modal,
            open: false
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
                <SectionContainer onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant="body1" component="h3" sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        {t("Plan.newPlan.modal.rate.title")}
                    </Typography>

                    <Typography variant="body1" component="span">
                        {t("Plan.newPlan.modal.rate.description")}
                    </Typography>

                    <Grid item sx={{ display: "flex", gap: "20px" }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">{t("Plan.newPlan.modal.rate.time")}</InputLabel>
                            <Select
                                {...register("time")}
                                defaultValue={editData?.time}
                                id="time"
                                label={t("Plan.newPlan.modal.rate.time")}
                                labelId="select-site-label"
                                placeholder={t("Placeholders.select")}
                                variant="outlined"
                            >
                                {newArrayTimes.map((time) => <MenuItem key={time?.id} value={time?.value}>{t(time?.name)}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <TextField
                            {...register("duration")}
                            defaultValue={editData?.duration}
                            disabled={watch("time") === "Indefinido"}
                            id="duration"
                            inputProps={{ inputMode: "numeric", min: 1 }}
                            label={t("Plan.newPlan.modal.rate.duration")}
                            type="number"
                            variant="outlined"
                        />
                    </Grid>

                    <Typography variant="body1" component="h3" sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        {t("Plan.newPlan.modal.rate.rate")}
                    </Typography>

                    <Typography variant="body1" component="span">
                        {t("Plan.newPlan.modal.rate.rateDescription")}
                    </Typography>

                    <Grid item sx={{ display: "flex", gap: "20px" }}>
                        <TextField
                            {...register("rate")}
                            defaultValue={editData?.rate}
                            disabled={watch("time") === "Indefinido"}
                            fullWidth
                            id="rate"
                            inputProps={{ inputMode: "numeric", min: 1 }}
                            label={t("Plan.newPlan.modal.rate.rate")}
                            placeholder="$00,000"
                            type="number"
                            variant="outlined"
                        />

                        <TextField
                            {...register("rate_renewal")}
                            defaultValue={editData?.rate_renewal}
                            disabled={watch("time") === "Indefinido"}
                            fullWidth
                            id="rate_renewal"
                            inputProps={{ inputMode: "numeric", min: 1 }}
                            label={t("Plan.newPlan.modal.rate.rateRenewal")}
                            placeholder="$00,000"
                            type="number"
                            variant="outlined"
                        />
                    </Grid>

                    <Typography variant="body1" component="h3" sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        {t("Plan.newPlan.modal.rate.rateSpecial")}
                        <Checkbox
                            checked={checked}
                            defaultChecked={editData?.is_special}
                            disabled={watch("time") === "Indefinido"}
                            onChange={() => setChecked(!checked)}
                        />
                    </Typography>

                    <Typography variant="body1" component="span">
                        {t("Plan.newPlan.modal.rate.rateSpecialDescription")}
                    </Typography>

                    {checked && (
                        <>
                            <Grid item sx={{ display: "flex", gap: "20px" }}>
                                <TextField
                                    {...register("rate_special")}
                                    defaultValue={editData?.rate_special}
                                    fullWidth
                                    id="rate_special"
                                    inputProps={{ inputMode: "numeric", min: 1 }}
                                    label={t("Plan.newPlan.modal.rate.rateSpecial")}
                                    placeholder="$00,000"
                                    type="number"
                                    variant="outlined"
                                />

                                <TextField
                                    {...register("rate_special_renewal")}
                                    defaultValue={editData?.rate_special_renewal}
                                    fullWidth
                                    id="rate_special_renewal"
                                    inputProps={{ inputMode: "numeric", min: 1 }}
                                    label={t("Plan.newPlan.modal.rate.rateSpecialRenewal")}
                                    placeholder="$00,000"
                                    type="number"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item sx={{ display: "flex", gap: "20px" }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        defaultValue={dateStart}
                                        disablePast
                                        label={t("Plan.newPlan.modal.rate.dateStart")}
                                        onChange={(newValue) => setDateStart(newValue)}
                                        sx={{ width: "100%" }}
                                    />
                                    <DatePicker
                                        defaultValue={dateEnd}
                                        disablePast
                                        label={t("Plan.newPlan.modal.rate.dateEnd")}
                                        onChange={(newValue) => setDateEnd(newValue)}
                                        sx={{ width: "100%" }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </>
                    )}

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
                        <BtnPrimary type="submit">
                            {t("Constants.button.confirm")}
                        </BtnPrimary>
                    </BtnContainer>
                </SectionContainer>
            </ModalContainer>
        </Modal>
    );
}