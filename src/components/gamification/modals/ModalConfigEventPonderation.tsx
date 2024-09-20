// ReactJS
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// MUI
import { Autocomplete, FormControl, InputLabel, Modal, OutlinedInput, TextField, Typography } from "@mui/material";

// Shared
import { BtnPrimary, BtnSecondary } from "../../../shared/components/Buttons";
import CardComponent from "../../../shared/components/Card";

// Services
import { getAllEvent, updateEventWithPoint } from "../../../service/gamification";

// External Dependences
import Swal from "sweetalert2";

// Styled
import { BtnContainer, ModalContainer } from "../styled";

export default function ModalConfigEventPonderation({ modal, setModal, editData = null }: IModalDataProps) {
    // Translation
    const { t } = useTranslation();

    // Local Storage
    const site = JSON.parse(localStorage.getItem("siteUser") || "{}");

    // State
    const [event, setEvent] = useState<any | null>(editData || null);

    const [pointsToWin, setPointsToWin] = useState(editData?.points || 0);

    const [listOfEvents, setListOfEvents] = useState<any[]>([]);

    // Functions
    const handleClose = () => {
        setModal({
            open: false,
            data: modal.data
        });
        
        setEvent(null);
    }; 

    const handleConfirm = () => {
        const data = {
            idSite: site?.idSite,
            points: pointsToWin
        };        

        console.log(event);        

        updateEventWithPoint(editData ? event?.eventIdEvent : event?.id_event, data)
            .then(() => {
                Swal.fire({
                    title: t("Alert.success.gamification.title"),
                    icon: "success",
                    customClass: {
                        container: "my-swal-container",
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        const modalData = modal.data.map((item: any) => {
                            if (item.id === event?.id) {
                                return {
                                    ...item,
                                    points: pointsToWin
                                };
                            }

                            return item;
                        });

                        setModal({
                            open: false,
                            data: [
                                ...modalData,
                            ]
                        });
                        
                        setPointsToWin(0);
                        setEvent(null);                        
                    }
                });
            })
            .catch((err: any) => console.log(err));        
    };    

    useEffect(() => {
        getAllEvent()
            .then((res: any) => {                
                const events = res?.data?.events?.map((event: any) => {
                    return {
                        ...event,
                        id: event.id_event,
                        label: event.name
                    };
                });

                const filteredEvents = events.filter((event: any) => {
                    return !modal?.data.some((item: any) => item.id_event === event.id_event);
                });              

                setListOfEvents(filteredEvents);
            })
            .catch((err: any) => console.log(err));
    }, [modal?.data]);    

    useEffect(() => {
        if (editData) {
            setEvent(editData);
        }
    }, [editData]);

    return (
        <Modal
            open={modal.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <ModalContainer>
                <CardComponent
                    description={t("Gamification.modal.event.ponderation.description")}
                    title={t("Gamification.modal.event.ponderation.title")}
                >
                    <Typography variant="body1" component="h3">
                        {t("Gamification.modal.event.ponderation.configEvent")}
                    </Typography>

                    <Autocomplete
                        disabled={editData !== null}
                        disablePortal
                        onChange={(event: any, newValue: string) => {
                            event?.preventDefault();                             

                            setEvent(newValue);
                        }}
                        id="combo-box-demo"
                        options={listOfEvents}
                        defaultValue={editData || event}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={t("Constants.event&action")}
                            />
                        )}
                    />

                    <Typography variant="body1" component="h3">
                        {t("Gamification.modal.event.ponderation.pointsToWinForEvent")}
                    </Typography>

                    <FormControl sx={{ width: "10rem" }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-amount" sx={{ bgcolor: "#FFF" }}>{t("Constants.pointsToWin")}</InputLabel>
                        <OutlinedInput
                            defaultValue={editData?.points || pointsToWin}
                            id="outlined-adornment-amount"
                            inputProps={{ inputMode: "numeric", min: 1 }}
                            label="Amount"
                            onChange={(e) => setPointsToWin(Number(e.target.value))}
                            type="number"
                        />
                    </FormControl>

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
                        <BtnPrimary onClick={handleConfirm}>
                            {t("Constants.button.confirm")}
                        </BtnPrimary>
                    </BtnContainer>
                </CardComponent>
            </ModalContainer>
        </Modal>
    );
}
