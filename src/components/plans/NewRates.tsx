// ReactJS
import { useTranslation } from "react-i18next";

// MUI
import { Chip, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";

// External Dependencies
import Swal from "sweetalert2";

// Icons
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";

// Styled
import { BodyContainer, HeaderTitle, PlansContainer, SectionContainer } from "./styled";

export default function NewRates({ rates, setRates, handleUpdate }: {  rates: Rate[], setRates: any, handleUpdate: (rate: Rate, index: number) => void }) {
    // Translation
    const { t } = useTranslation();

    // Functions
    function transformTime(duration: number, time: string) {      
        if (time === "Indefinido") return "Indefinido";
        
        const DEFAULT_TIME = duration === 1 ? "Día" : "Días";

        const NEW_TIME: { [key: string]: string } = {
            Indefinido: "Indefinido",
            Diario: duration === 1 ? "Día" : "Días",
            Semanal: duration === 1 ? "Semana" : "Semanas",
            Mensual: duration === 1 ? "Mes" : "Meses",
            Anual: duration === 1 ? "Año" : "Años",
        };

        return `${duration} ${NEW_TIME[time] || DEFAULT_TIME}`;
    }     

    const handleDelete = (index: number) => {
        Swal.fire({
            title: t("Alert.delete.title"),
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
                const newRates = rates.filter((_, i: number) => i !== index);   

                setRates({
                    open: false,
                    data: newRates
                });                                
            }
        });        
    };  

    return (
        <PlansContainer>
            {rates?.map((rate, index) => (
                <SectionContainer>
                    <HeaderTitle>
                        <Typography variant="body1" component="h3">
                            {t("Plan.view.planDuration")}:{" "}
                            {transformTime(Number(rate?.duration), rate?.time)}
                        </Typography>

                        <div>
                            <IconButton onClick={() => handleUpdate(rate, index)}>
                                <Tooltip title={t("Constants.tooltip.edit")}>
                                    <EditOutlined sx={{ color: "#4073FF" }} />
                                </Tooltip>
                            </IconButton>
                            <IconButton onClick={() => handleDelete(index)}>
                                <Tooltip title={t("Constants.tooltip.delete")}>
                                    <DeleteOutlined  sx={{ color: "#EF5350" }} />
                                </Tooltip>
                            </IconButton>
                        </div>
                    </HeaderTitle>
                
                    <BodyContainer>
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }} size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            {t("Constants.table.header.rate")}
                                        </TableCell>
                                        <TableCell>
                                            {t("Constants.table.header.renewalRate")}
                                        </TableCell>
                                        <TableCell>
                                            {t("Constants.table.header.specialRate")}
                                        </TableCell>
                                        <TableCell>
                                            {t("Constants.table.header.renewalSpecialRate")}
                                        </TableCell>
                                        <TableCell>
                                            {t("Constants.table.header.specialRateValidities")}
                                        </TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {rate?.rate !== "" ? `COP ${rate?.rate}` : "N/A"}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {rate?.rate_renewal !== "" ? `COP ${rate?.rate_renewal ?? "0"}` : "N/A"}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {rate?.rate_special !== "" ? `COP ${rate?.rate_special}` : "N/A"}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {rate?.rate_special_renewal !== "" ? `COP ${rate?.rate_special_renewal}` : "N/A"}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {t("Constants.status.start")}: {rate?.date_start ?? "N/A"} <br />
                                            {t("Constants.status.end")}: {rate?.date_end ?? "N/A"}
                                        </TableCell>
                                        {(rate?.time !== "Indefinido") && rate?.date_start && (
                                            <TableCell component="th" scope="row">
                                                {(rate?.date_end ?? "") >= new Date().toISOString()
                                                    ? (
                                                        <Chip label={t("Constants.status.current")} style={{ backgroundColor: "#4CAF50", color: "#1B5E20" }} />
                                                    ) : (
                                                        <Chip label={t("Constants.status.defeated")} style={{ backgroundColor: "#EF5350", color: "#C62828" }} />
                                                    )}
                                            </TableCell>
                                        )}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </BodyContainer>
                </SectionContainer>
            ))}
        </PlansContainer>
    );
}