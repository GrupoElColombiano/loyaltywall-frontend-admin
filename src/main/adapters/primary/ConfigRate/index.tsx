// ReactJS
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

// MUI
import { Checkbox, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";

// MUI X
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// External Dependencies
import dayjs, { Dayjs } from "dayjs";
import Swal from "sweetalert2";

// Yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Styles
import { BtnAccept, BtnCancel, BtnContainer, Container, Form, Section, SubTitle, Title } from "./styled";

// Interfaces
interface ModalRateProps {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
    item: any;
    setItem: (item: any) => void;
    editItem: any;
}

const arrayTimes = [
    { id: 1, name: "Plan.newPlan.time.undefined", value: "Indefinido" },
    { id: 2, name: "Plan.newPlan.time.daily", value: "Diario" },
    { id: 3, name: "Plan.newPlan.time.weekly", value: "Semanal" },
    { id: 4, name: "Plan.newPlan.time.monthly", value: "Mensual" },
    { id: 5, name: "Plan.newPlan.time.yearly", value: "Anual" },
];

const ConfigRate: React.FC<ModalRateProps> = ({ openModal, setOpenModal, setItem, item, editItem }) => {
    // Translations
    const { t } = useTranslation();

    // States
    const [checked, setChecked] = useState(editItem?.is_special || false);

    const [dateStart, setDateStart] = useState<Dayjs | null>(dayjs(editItem?.date_start) || null);
    const [dateEnd, setDateEnd] = useState<Dayjs | null>(dayjs(editItem?.date_end) || null);

    const [typeOfTime, setTypeOfTime] = useState(arrayTimes);

    // Yup
    const validationScheme = yup.object().shape({
        duration: yup
            .number()
            .when("time", {
                is: (time: unknown) => time !== "Indefinido",
                then: (schema) =>
                    schema.required(t("Plan.newPlan.modal.rate.durationRequired")),
            }),
        rate_renewal: yup.number(),
        rate_special_renewal: yup.number(),
        rate_special: yup.number(),
        rate: yup.number(),
        time: yup.string(),
    });

    // Form
    const {
        formState: { isValid },
        handleSubmit,
        register,
        watch,
    } = useForm({
        defaultValues:
            editItem
                ? editItem
                : {
                    duration: 0,
                    rate_renewal: 0,
                    rate_special_renewal: 0,
                    rate_special: 0,
                    rate: 0,
                },
        mode: "onChange",
        resolver: yupResolver(validationScheme),
    });

    // Functions
    const onSubmit = (data: any) => {
        const refactoredData = {
            ...data,
            is_special: checked,
            date_start: checked ? dayjs(dateStart).format("YYYY-MM-DD") : null,
            date_end: checked ? dayjs(dateEnd).format("YYYY-MM-DD") : null,
        };        

        if (editItem) {
            const index = item.findIndex((item: any) => item.id === editItem.id);
            item[index] = refactoredData;

            setItem([...item]);

            return setOpenModal(false);
        }

        if (item) {
            setItem([...item, refactoredData]);
        } else {
            setItem([refactoredData]);
        }

        setOpenModal(false);
    };

    const handleClose = () => {
        Swal.fire({
            title: t("Alert.exit.title"),
            text: t("Alert.exit.text"),
            confirmButtonText: t("Alert.button.confirm"),
            confirmButtonColor: "#4073FF",
            cancelButtonText: t("Alert.button.cancel"),
            cancelButtonColor: "#EF5350",
            icon: "question",
            showCancelButton: true,
            customClass: {
                container: "my-swal-container",
            }
        }).then((result) => {
            if (result.isConfirmed) {
                setOpenModal(false);
                // navigate(-1);
            }
        });
    };

    // Effects
    useEffect(() => {
        if (item?.length > 0) {
            const filterTimes = typeOfTime.filter((time: any) => time?.value !== "Indefinido");

            setTypeOfTime(filterTimes);
        }
    }, [item, typeOfTime]);   

    return (
        <Modal open={openModal} onClose={handleClose}>
            <Container>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Section>
                        <Title>{t("Plan.newPlan.modal.rate.title")}</Title>
                        <SubTitle>{t("Plan.newPlan.modal.rate.description")}</SubTitle>
                        <Grid item sx={{ display: "flex", gap: "20px" }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">{t("Plan.newPlan.modal.rate.time")}</InputLabel>
                                <Select
                                    {...register("time")}
                                    id="time"
                                    label={t("Plan.newPlan.modal.rate.time")}
                                    labelId="select-site-label"
                                    placeholder={t("Placeholders.select")}
                                    variant="outlined"
                                    defaultValue={editItem?.time}
                                >
                                    {typeOfTime.map((time) => <MenuItem key={time?.id} value={time?.value}>{t(time?.name)}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <TextField
                                {...register("duration")}
                                disabled={watch("time") === "Indefinido"}
                                id="duration"
                                inputProps={{ inputMode: "numeric", min: 1 }}
                                label={t("Plan.newPlan.modal.rate.duration")}
                                type="number"
                                variant="outlined"
                            />
                        </Grid>
                    </Section>

                    <Section>
                        <Title>{t("Plan.newPlan.modal.rate.rate")}</Title>
                        <SubTitle>{t("Plan.newPlan.modal.rate.rateDescription")}</SubTitle>
                        <Grid item sx={{ display: "flex", gap: "20px" }}>
                            <TextField
                                {...register("rate")}
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
                    </Section>

                    <Section>
                        <Title>
                            {t("Plan.newPlan.modal.rate.rateSpecial")}
                            <Checkbox checked={checked} onChange={() => setChecked(!checked)} disabled={watch("time") === "Indefinido"} />
                        </Title>
                        <SubTitle>{t("Plan.newPlan.modal.rate.rateSpecialDescription")}</SubTitle>
                        {checked && (
                            <Fragment>
                                <Grid item sx={{ display: "flex", gap: "20px" }}>
                                    <TextField
                                        {...register("rate_special")}
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
                                            disablePast
                                            label={t("Plan.newPlan.modal.rate.dateStart")}
                                            onChange={(newValue) => setDateStart(newValue)}
                                            sx={{ width: "100%" }}
                                            defaultValue={dateStart}
                                        />
                                        <DatePicker
                                            disablePast
                                            label={t("Plan.newPlan.modal.rate.dateEnd")}
                                            minDate={dateStart}
                                            onChange={(newValue) => setDateEnd(newValue)}
                                            sx={{ width: "100%" }}
                                            defaultValue={dateEnd}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Fragment>
                        )}
                    </Section>

                    <BtnContainer>
                        <BtnCancel onClick={handleClose}>{t("Plan.newPlan.modal.cancel")}</BtnCancel>
                        {isValid && <BtnAccept type="submit">{t("Plan.newPlan.modal.confirm")}</BtnAccept>}
                    </BtnContainer>
                </Form>
            </Container>
        </Modal>
    );
};

export default ConfigRate;
