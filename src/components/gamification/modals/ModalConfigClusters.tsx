// ReactJS
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// MUI
import { Autocomplete, FormControl, InputLabel, Modal, OutlinedInput, TextField, Typography } from "@mui/material";

// Shared
import { BtnPrimary, BtnSecondary } from "../../../shared/components/Buttons";
import CardComponent from "../../../shared/components/Card";

// Services
import { getAllEvent, updateOneCluesterEvent } from "../../../service/gamification";

// External Dependences
import Swal from "sweetalert2";

// Styled
import { BtnContainer, ModalContainer } from "../styled";

interface IData {
    id_event_cluster: number;
    event_repeats:    number;
    porcentual_value: number;
    events:           Events;
    clusters:         Clusters;
}

interface Clusters {
    id_cluster: number;
    name:       string;
    create_at:  Date;
    update_at:  Date;
}

interface Events {
    id_event:         number;
    name:             string;
    description:      string;
    points:           number;
    event_repeats:    number;
    porcentual_value: number;
    create_at:        Date;
    update_at:        Date;
}

interface IModal{
    clusters: IData[];
    data: IData | null;
    id: number;
    open: boolean;
    percentage: number;
}

interface IModalConfigClusters {
    modal: IModal;
    setModal: React.Dispatch<React.SetStateAction<IModal>>;
}

export default function ModalConfigClusters({ modal, setModal }: IModalConfigClusters) {
    // Translation
    const { t } = useTranslation();

    // LocalStorage
    const siteStorage = JSON.parse(localStorage.getItem("siteUser") || "{}"); 

    // State
    const [event, setEvent] = useState<Events | null>(modal?.data?.events ?? null);

    const [quantity, setQuantity] = useState<number>(!modal?.data ? 1 : modal?.data?.event_repeats);
    const [percentage, setPercentage] = useState<number>(!modal?.data ? 1 : modal?.data?.porcentual_value);

    const [listOfEvents, setListOfEvents] = useState<Events[]>([]);

    // Constants
    const hasSignedUp = modal?.id === 1 && event?.id_event === 6;  

    const limitPercentage = (100 - modal?.percentage) ?? 100;

    const btnValidation = !modal?.data
        ? !event || percentage > limitPercentage
        : percentage > (limitPercentage + modal?.data?.porcentual_value);

    // Functions
    const handleClose = () => {
        setEvent(null);
        setQuantity(1);
        setPercentage(1);

        setModal({
            ...modal,
            data: null,
            open: false,
        });
    };

    const handleConfirm = () => {
        const data = {
            event_repeats: quantity,
            events: !modal?.data ? event?.id_event : modal?.data?.events?.id_event,
            porcentual_value: percentage,
            site: siteStorage.idSite
        };         
        
        const refactoredData = {
            clusters: {
                id_cluster: modal?.id,
                name: `Cluster ${modal?.id}`,
                create_at: new Date(),
                update_at: new Date()
            },
            event_repeats: quantity,
            events: event,
            id_event_cluster: 0,
            percentage: percentage,
            porcentual_value: percentage,
        };              

        updateOneCluesterEvent((modal?.id), data)
            .then(() => {
                Swal.fire({
                    title: t("Alert.success.gamification.title"),
                    icon: "success",
                    customClass: {
                        container: "my-swal-container",
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        setEvent(null);  
                        setQuantity(1);
                        setPercentage(1);

                        setModal({
                            ...modal,
                            clusters: 
                                modal?.data 
                                    ? modal?.clusters?.map((item: IData) => {
                                        return item?.events?.id_event === event?.id_event ? refactoredData as IData : item;
                                    }) ?? [] 
                                    : [...modal?.clusters ?? [], refactoredData as IData],
                            open: false,
                        });
                    }
                });
            })
            .catch((err) => console.log(err)); 
    };

    useEffect(() => {
        getAllEvent()
            .then((res) => {                                 
                if (modal?.id !== 1) {                    
                    const events = res?.data?.events
                        ?.filter((event: Events) => event.id_event !== 6)
                        ?.map((event: Events) => {
                            return {
                                ...event,
                                id: event.id_event,
                                label: event.name
                            };
                        });

                    if (!modal?.data) {
                        const filteredEvents = events?.filter((event: Events) => !modal?.clusters?.some((item: IData) => item?.events?.id_event === event?.id_event));

                        setListOfEvents(filteredEvents);

                        return;
                    }

                    setListOfEvents(events);

                    return;
                }
                
                const events = res?.data?.events
                    ?.map((event: Events) => {
                        return {
                            ...event,
                            id: event.id_event,
                            label: event.name
                        };
                    }); 

                if (!modal?.data) {
                    const filteredEvents = events?.filter((event: Events) => !modal?.clusters?.some((item: IData) => item?.events?.id_event === event?.id_event));

                    setListOfEvents(filteredEvents);

                    return;
                }

                setListOfEvents(events);

                return;
            })
            .catch((err) => console.log(err));
    }, [modal]);     

    useEffect(() => {
        if (modal?.data) {
            setEvent(modal?.data?.events);
            setQuantity(modal?.data?.event_repeats);
            setPercentage(modal?.data?.porcentual_value);
        }
    }, [modal?.data]);   
    
    return (
        <Modal
            aria-describedby="modal-modal-description"
            aria-labelledby="modal-modal-title"
            onClose={handleClose}
            open={modal.open}
        >
            <ModalContainer>
                <CardComponent
                    description={t("Gamification.config.clusters.description")}
                    title={t("Gamification.config.clusters.title") + (modal?.id)}
                >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                        <Autocomplete
                            disableClearable
                            disabled={modal?.data !== null}
                            disablePortal
                            fullWidth
                            onChange={(event: ChangeEvent<object>, newValue: Events | null) => {
                                event?.preventDefault();                                 

                                setEvent(newValue);
                            }}
                            id="combo-box-demo"
                            options={listOfEvents}
                            defaultValue={modal?.data?.events}
                            getOptionLabel={(option) => option?.name}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={t("Constants.event&action")}
                                />
                            )}
                        />

                        <FormControl sx={{ width: "10rem" }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-amount" sx={{ bgcolor: "#FFF" }}>{t("Constants.quantityOfTimes")}</InputLabel>
                            <OutlinedInput
                                defaultValue={modal?.data?.event_repeats || quantity}
                                id="outlined-adornment-amount"
                                inputProps={{ inputMode: "numeric", min: 1 }}
                                label="Amount"
                                disabled={hasSignedUp}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                placeholder="0"
                                type="number"
                            />
                        </FormControl>
                    </div>

                    <Typography variant="body1" component="h3">
                        {t("Gamification.percentage.title")}
                    </Typography>

                    <Typography variant="body1" component="p">
                        {t("Gamification.percentage.description")}
                    </Typography>

                    <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "center" }}>
                        <FormControl sx={{ width: "10rem" }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-amount" sx={{ bgcolor: "#FFF" }}>{t("Constants.percentage")}</InputLabel>
                            <OutlinedInput
                                defaultValue={modal?.data?.porcentual_value || percentage}
                                id="outlined-adornment-amount"
                                inputProps={{ inputMode: "numeric", min: 1, max: 100 }}
                                label="Amount"
                                onChange={(e) => setPercentage(Number(e.target.value))}
                                placeholder="0"
                                type="number"
                            />
                        </FormControl>
                        
                        <Typography variant="body1" component="p" sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            {t("Gamification.percentage.available")}{" "}
                            <Typography variant="h5" component="h3">
                                {limitPercentage}%
                            </Typography>
                        </Typography>
                    </div>

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
                        <BtnPrimary onClick={handleConfirm} disabled={btnValidation}>
                            {modal?.data ? t("Constants.button.editEvent") : t("Constants.button.addEvent")}
                        </BtnPrimary>
                    </BtnContainer>
                </CardComponent>
            </ModalContainer>
        </Modal>
    );
}
