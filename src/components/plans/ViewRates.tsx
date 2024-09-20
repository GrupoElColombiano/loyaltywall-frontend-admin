// ReactJS
import { useTranslation } from "react-i18next";

// MUI
import { Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

// Styled
import { BodyContainer, HeaderTitle, PlansContainer, SectionContainer } from "./styled";

export default function ViewRates({ rates }: { rates: Rate[] }) {
    // Translation
    const { t } = useTranslation();

    // Functions
    function transformTime(duration: number, time: string) {
        const DEFAULT_TIME = duration === 1 ? "Mes" : "Meses";

        const NEW_TIME: { [key: string]: string } = {
            Semanal: duration === 1 ? "Semana" : "Semanas",
            Mensual: duration === 1 ? "Mes" : "Meses",
            Anual: duration === 1 ? "Año" : "Años",
        };

        return `${duration} ${NEW_TIME[time] || DEFAULT_TIME}`;
    }     

    return (
        <PlansContainer>
            {rates?.map((rate) => (
                <SectionContainer>
                    <HeaderTitle>
                        <Typography variant="body1" component="h3">
                            {t("Plan.view.planDuration")}:{" "}
                            {transformTime(rate?.duration, rate?.time)}
                        </Typography>
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
                                            {rate?.rate_renewal !== "" ? `COP ${rate?.rate_renewal}` : "N/A"}
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
                                        {rate?.time !== "Indefinido" && (
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