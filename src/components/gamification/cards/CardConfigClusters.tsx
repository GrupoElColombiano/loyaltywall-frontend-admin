// ReactJS
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// MUI
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, tableCellClasses } from "@mui/material";

// Shared
import { BtnPrimary } from "../../../shared/components/Buttons";

// Components
import ModalConfigClusters from "../modals/ModalConfigClusters";

// Services
import { deleteOneCluesterEvent, getOneCluesterEvent } from "../../../service/gamification";

// Constants
import { EventClusters } from "../../../constants/headers";

// Icons
import { Add, DeleteOutlined, EditOutlined } from "@mui/icons-material";

// Styled
import { BtnContainer, FooterCard } from "../styled";

// MUI
import { styled as styledMUI } from "@mui/material/styles";

// External Dependencies
import Swal from "sweetalert2";

// Styled
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

const StyledTableCell = styledMUI(TableCell)(() => ({
    [`&.${tableCellClasses?.head}`]: {
        backgroundColor: "#7FA1FF",
        color: "#000",
        fontSize: 18,
    },
    [`&.${tableCellClasses?.body}`]: {
        fontSize: 18,
    },
}));

const StyledTableRow = styledMUI(TableRow)(() => ({
    "&:nth-of-type(odd)": {
        backgroundColor: "#F3F3F3",
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

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

function SectionClusters({ index }: { index: number }) {
    // Translation
    const { t } = useTranslation();

    // LocalStorage
    const siteStorage = JSON.parse(localStorage.getItem("siteUser") || "{}"); 

    // State
    const [modal, setModal] = useState<IModal>({
        clusters: [],
        data: null,
        id: index,
        open: false,
        percentage: 0
    });

    // Functions
    const handleDelete = (eventToDelete: IData) => {
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
                const updatedTableRows = modal?.clusters?.filter((item: IData) => item?.id_event_cluster !== eventToDelete?.id_event_cluster);

                deleteOneCluesterEvent(
                    eventToDelete?.clusters?.id_cluster,
                    eventToDelete?.events?.id_event
                )
                    .then(() => {
                        setModal({
                            ...modal,
                            clusters: updatedTableRows,
                            percentage: modal?.percentage - eventToDelete?.porcentual_value
                        });
                    })
                    .catch((err) => console.log(err));                          
            }
        });        
    };

    // Effects
    useEffect(() => {
        getOneCluesterEvent(index, siteStorage?.idSite)
            .then((res) => {
                const sum = res?.data.reduce((acc: number, curr: IData) => acc + curr.porcentual_value, 0);

                const data = res?.data.map((item: IData) => ({
                    ...item,
                    percentage: sum
                }));

                setModal({ ...modal, clusters: data, percentage: sum });
            })
            .catch((err) => {
                console.log(err);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modal?.open]);    

    return (
        <Fragment>
            <Typography variant="h6" component="h3" sx={{ color: "#0045FF" }}>
                Cluster N{index}
            </Typography>

            <BtnContainer>
                {modal?.percentage < 100 && (
                    <BtnPrimary onClick={() => setModal({ ...modal, open: true, data: null })}>
                        <Add />         
                        {t("Constants.button.add.config")}
                    </BtnPrimary>
                )}

                {modal?.clusters?.length === 0 && (
                    <Typography variant="body1" component="p">
                        {t("Gamification.clusters.empty")}
                    </Typography>
                )}
            </BtnContainer>

            {modal?.clusters?.length > 0 && (
                <Container>
                    <TableContainer component={Paper} sx={{ maxHeight: "275px", height: "275px", overflow: "auto" }}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table" stickyHeader >
                            <TableHead>
                                <TableRow>
                                    {EventClusters?.map((item: IHeader, index: number) => (
                                        <StyledTableCell align={item?.align} key={index}>
                                            {t(item?.key)}
                                        </StyledTableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {modal?.clusters?.map((item: IData) => (
                                    <StyledTableRow key={item?.id_event_cluster}>
                                        <StyledTableCell align="left">{item?.events?.name}</StyledTableCell>
                                        <StyledTableCell align="center">{item?.event_repeats}</StyledTableCell>
                                        <StyledTableCell align="center">{item?.porcentual_value}%</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <IconButton onClick={() => setModal({ ...modal, open: true, data: item })}>
                                                <Tooltip title={t("Constants.tooltip.edit")}>
                                                    <EditOutlined sx={{ color: "#4073FF" }} />
                                                </Tooltip>
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(item)}>
                                                <Tooltip title={t("Constants.tooltip.delete")}>
                                                    <DeleteOutlined sx={{ color: "#EF5350" }} />
                                                </Tooltip>
                                            </IconButton>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            )}

            <ModalConfigClusters modal={modal} setModal={setModal} />
        </Fragment>
    );
}

export default function CardConfigClusters() {
    return (
        <FooterCard direction="column">
            <SectionClusters index={1} />

            <SectionClusters index={2} />

            <SectionClusters index={3} />
        </FooterCard>
    );
}
