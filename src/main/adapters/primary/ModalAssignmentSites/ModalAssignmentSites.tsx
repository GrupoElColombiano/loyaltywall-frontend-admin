import { Box, Button, MenuItem, Modal, TextField, Typography } from "@mui/material";
import { StripedDataGrid } from "../../../utils/grid-data.style";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

//Assets
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

// Traduction
import { t } from "i18next";
import { getSitesByRol } from "../../../../service/usersKeycloack/usersKeycloack.service";
import { editSitesByRol, getListSites } from "../../../../service/sites/sites.service";
import Swal from "sweetalert2";

// Styled
import { ModalContainer } from "./styled";

interface ModalRolSitesProps {
    idRol: any;
    openProp: boolean;
    setSelectedId: any;
    setShowModal: any;
    roleName: string;
}

const ModalRolSites: React.FC<ModalRolSitesProps> = ({ idRol, openProp, setSelectedId, setShowModal, roleName}) => {
    const [open, setOpen] = useState(openProp);
    const [openAddSite, setOpenAddSite] = useState(false);

    //Acces Token:
    const accessToken = localStorage.getItem("access_token");
    const [rows, setRows] = useState<any[]>([]);
    const [siteSelected, setSiteSelected] = useState("");
    const [dataIdKey, setDataIdKey] = useState("");
    const [data, setData] = useState<Array<any>>([]);
    const [dataNameKey, setDataNameKey] = useState("");

    const columns: GridColDef[] = [
        { field: "name", headerName: t("Roles.config.addSites.table.siteColumn"), flex: 3, minWidth: 150 },
        { field: "actions", headerName: "", flex: 1, minWidth: 150, renderCell: renderActionsCell } // Ancho fijo de 150 píxeles para la columna 'actions'
    ];

    function renderActionsCell(params: GridRenderCellParams<any>) {

        const handleDelete = () => {
            const index = params.row.index;
            const aux = [...rows];
            aux.splice(index, 1);
            setRows(aux);
        };
        return (
            <>
                <Button onClick={() => { handleDelete(); }} startIcon={<DeleteOutlineOutlinedIcon sx={{ color: "#EF5350" }} />} />
            </>

        );
    }

    const handleClose = () => {
        Swal.fire({
            title: t("Alert.exit.title"),
            text: t("Alert.exit.text"),
            confirmButtonText: t("Alert.button.confirm"),
            confirmButtonColor: "#0045FF",
            showCancelButton: true,
            cancelButtonText: t("Alert.button.cancel"),
            cancelButtonColor: "#7E2EFF",
            icon: "question",
            customClass: {
                container: "my-swal-container",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                setSelectedId("");
                setShowModal(false);
                setOpen(false);
            }
        });
    };


    const handleCloseAddSite = () => {
        setOpenAddSite(false);
        siteSelected ? setSiteSelected("") : setSiteSelected(siteSelected);
    };

    const handleOpenAddSite = () => {
        handleOptionsSites();
        setOpenAddSite(true);
        siteSelected ? setSiteSelected("") : setSiteSelected(siteSelected);
    };

    const onChangeSite = (event: any) => {
        setSiteSelected(event.target.value);
    };

    const handleAceptSite = () => {
        const aux = [...rows];
        aux.push({ idSite: siteSelected, name: data?.find((item) => item[dataIdKey] === siteSelected)?.[dataNameKey] });
        setRows(aux);
        handleCloseAddSite();
    };

    const confirmAddSitesToRol = () => {
        // Llamar al servicio para agregar los sitios al rol
        handleAssignSiteToRol({ rolId: idRol, sitesIds: rows.map((item) => item.idSite) });
        setSelectedId("");
        setShowModal(false);
        setOpen(false);
    };

    const handleOptionsSites = () => {
        getListSites((result: any) => {
            if (result.code == "ERR_BAD_REQUEST") {
                // toast.error("" + result.response.data.message);
                return;
            }
            if (result.status == 200) {
                // toast.success(result.statusText);
                handleNoRepeatSites(result.data);
                setDataIdKey("idSite");
                setDataNameKey("name");
                return;
            }

            if (result.response.data.status == 406) {
                // toast.warn(result.response.data.message);
                return;
            }

            if (result.response.data.status == 201) {
                // toast.success(result.statusText);
                return;
            }

            if (result.response.data.status == 404) {
                // toast.warn(result.response.data.message);
                return;
            }

        });

    };

    const handleAssignSiteToRol = (params: { rolId: number, sitesIds: Array<any> }) => {
        // Llamar al servicio para agregar los sitios al rol
        editSitesByRol(accessToken, params.rolId, params.sitesIds, (result: any) => {
            if (result.code == "ERR_BAD_REQUEST") {
                // toast.error("" + result.response.data.message);

                Swal.fire({
                    title: t("Alert.error.title"),
                    text: result.response.data.message,
                    icon: "error",
                    customClass: {
                        container: "my-swal-container",
                    },
                    confirmButtonText: t("Alert.button.confirm"),
                    confirmButtonColor: "#0045FF",
                });
                return;
            }

            if (result.status == 200) {
                // toast.success(result.statusText);
                setRows(result.data.data);
                Swal.fire({
                    title: t("Alert.save.title"),
                    text: t("Alert.save.text"),
                    icon: "success",
                    customClass: {
                        container: "my-swal-container",
                    },
                    confirmButtonText: t("Alert.button.confirm"),
                    confirmButtonColor: "#0045FF",
                });
                return;
            }

            if (result.response.data.status == 406) {
                Swal.fire({
                    title: t("Alert.error.title"),
                    text: result.response.data.message,
                    icon: "warning",
                    customClass: {
                        container: "my-swal-container",
                    },
                    confirmButtonText: t("Alert.button.confirm"),
                    confirmButtonColor: "#0045FF",
                });
                return;
            }

            if (result.response.data.status == 201) {
                Swal.fire({
                    title: t("Alert.save.title"),
                    text: t("Alert.save.text"),
                    icon: "success",
                    customClass: {
                        container: "my-swal-container",
                    },
                    confirmButtonText: t("Alert.button.confirm"),
                    confirmButtonColor: "#0045FF",
                });
                return;
            }

            if (result.response.data.status == 404) {
                Swal.fire({
                    title: t("Alert.error.title"),
                    text: result.response.data.message,
                    icon: "warning",
                    customClass: {
                        container: "my-swal-container",
                    },
                    confirmButtonText: t("Alert.button.confirm"),
                    confirmButtonColor: "#0045FF",
                });
                return;
            }

        });
    };

    const handleLoadSites = (params: { rolId: string }) => {

        getSitesByRol(accessToken, params.rolId, (result: any) => {
            if (result.code == "ERR_BAD_REQUEST") {
                // toast.error("" + result.response.data.message);
                return;
            }

            if (result.status == 200) {
                // toast.success(result.statusText);
                setRows(result.data.data);
                return;
            }

            if (result.response.data.status == 406) {
                // toast.warn(result.response.data.message);
                return;
            }

            if (result.response.data.status == 201) {
                // toast.success(result.statusText);
                return;
            }

            if (result.response.data.status == 404) {
                // toast.warn(result.response.data.message);
                return;
            }

        });
    };

    const handleNoRepeatSites = (NewData: any) => {
        setData(NewData.filter((item: any) => !rows.some((item2: any) => item.idSite === item2.idSite)));
    };

    // Effects
    useEffect(() => {
        // Traer la data de sitios del usuario desde los roles asignados al rol: llamar al servicio getSitesByUserRoles
        handleLoadSites({ rolId: idRol });
        // 
    }, []);

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <ModalContainer>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            height: "10%",
                            marginBottom: "2%",
                        }}
                    >
                        <PostAddOutlinedIcon style={{ color: "#0045FF", marginRight: "12px" }} />
                        <Typography variant="h2" sx={{ textTransform: "none" }} style={{
                            fontFamily: "Roboto",
                            fontSize: "18px",
                            fontWeight: "700",
                            lineHeight: "21px",
                            letterSpacing: "0.15000000596046448px",
                            textAlign: "left",
                            color: "#000000DE",
                        }}>{t("Roles.config.addSites.title")}</Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            height: "12%",
                            marginBottom: "2%",
                        }}
                    >
                        <Typography variant="h2" sx={{ textTransform: "none" }} style={{
                            fontFamily: "Roboto",
                            fontSize: "16px",
                            fontWeight: "700",
                            lineHeight: "19px",
                            letterSpacing: "0.15000000596046448px",
                            textAlign: "left",
                            color: "#000000DE",
                            marginBottom: "8px",
                        }}>{t("Roles.config.addSites.subtittle.1")} {roleName} {t("Roles.config.addSites.subtittle.2")}</Typography>
                        <Typography variant="body1" sx={{ textTransform: "none" }} style={{
                            fontFamily: "Roboto",
                            fontSize: "14px",
                            fontWeight: "400",
                            lineHeight: "16px",
                            letterSpacing: "0.15000000596046448px",
                            textAlign: "left",
                            color: "#000000DE",
                        }}>{t("Roles.config.addSites.description")}</Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            height: "42px",
                            marginBottom: "2%",
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                marginBottom: "64px",
                                width: "165px",
                                height: "42px",
                                backgroundColor: "#0045FF",
                            }}
                            onClick={() => { handleOpenAddSite(); }}
                            startIcon={<AddOutlinedIcon style={{
                                color: "#ffffff",
                                marginRight: "8px"
                            }} />}
                        >
                            <Typography variant="h3" sx={{ textTransform: "none" }}
                                style={{
                                    fontFamily: "Roboto",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    lineHeight: "24px",
                                    letterSpacing: "0.4000000059604645px",
                                    textAlign: "left",
                                    color: "#FFFFFF"
                                }}>
                                {t("Roles.config.addSites.buttonLabel")}
                            </Typography>
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            height: "54%",
                            marginBottom: "2%",
                            maxHeight: "40vh",
                        }}
                    >
                        <StripedDataGrid
                            sx={{ marginRight: "0px !important", minHeight: "250px", maxHeight: "36vh", height: "-webkit-fill-available", width: "100%" }}
                            rowHeight={64}
                            disableColumnMenu
                            columns={columns}
                            rows={rows}
                            getRowId={(row) => row.idSite}
                            getRowClassName={(params) =>
                                params.indexRelativeToCurrentPage % 2 === 0 ? "odd" : "even"
                            }
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            height: "12%",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                marginBottom: "64px",
                                width: "165px",
                                height: "42px",
                                backgroundColor: "#7E2EFF",
                            }}
                            onClick={handleClose}
                        >
                            <Typography variant="h3" sx={{ textTransform: "none" }}
                                style={{
                                    fontFamily: "Roboto",
                                    fontSize: "15px",
                                    fontWeight: "500",
                                    lineHeight: "26px",
                                    letterSpacing: "0.46000000834465027px",
                                    textAlign: "left",
                                    color: "#FFFFFF"
                                }}>
                                {t("Roles.config.addSites.back")}
                            </Typography>
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                marginBottom: "64px",
                                width: "165px",
                                height: "42px",
                                backgroundColor: "#0045FF",
                            }}
                            onClick={confirmAddSitesToRol}
                        >
                            <Typography variant="h3" sx={{ textTransform: "none" }}
                                style={{
                                    fontFamily: "Roboto",
                                    fontSize: "15px",
                                    fontWeight: "500",
                                    lineHeight: "26px",
                                    letterSpacing: "0.46000000834465027px",
                                    textAlign: "left",
                                    color: "#FFFFFF"
                                }}>
                                {t("Roles.config.addSites.confirm")}
                            </Typography>
                        </Button>
                    </Box>
                </ModalContainer>
            </Modal>
            
            <Modal
                open={openAddSite}
                onClose={handleCloseAddSite}
            >
                <Box
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                        width: "480px",
                        height: "auto",
                        maxHeight: "70vh",
                        justifyContent: "space-around",
                        minWidth: "212px",
                        maxWidth: "80%",
                        borderRadius: "4px",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        padding: "25px",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            height: "30%",
                            marginBottom: "2%",
                        }}
                    >
                        <Typography variant="h2" sx={{ textTransform: "none" }} style={{
                            fontFamily: "Roboto",
                            fontSize: "32px",
                            fontWeight: "700",
                            lineHeight: "38px",
                            letterSpacing: "0em",
                            textAlign: "left",
                            color: "#000000DE",
                        }}>{t("Roles.assign.title")}</Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            height: "40%",
                            marginBottom: "2%",
                        }}
                    >
                        <Typography variant="h2" sx={{ textTransform: "none" }} style={{
                            fontFamily: "Roboto",
                            fontSize: "12px",
                            fontWeight: "400",
                            lineHeight: "20px",
                            letterSpacing: "0.4000000059604645p",
                            textAlign: "left",
                            color: "#000000DE",
                            marginBottom: "20px",
                        }}>{t("Roles.assign.description")}</Typography>
                        <TextField
                            style={{ color: "#606A84", marginBottom: "24px" }}
                            label={t("Roles.assign.select.label")}
                            select
                            value={siteSelected ? siteSelected.toString() : ""}
                            onChange={onChangeSite}
                        >
                            {data?.map((item) => (
                                <MenuItem key={item[dataIdKey]} style={{ color: "#606A84" }} value={item[dataIdKey]}>
                                    {item[dataNameKey]}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            height: "30%",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                marginBottom: "64px",
                                width: "165px",
                                height: "42px",
                                backgroundColor: "#7E2EFF",
                            }}
                            onClick={handleCloseAddSite}
                        >
                            <Typography variant="h3" sx={{ textTransform: "none" }}
                                style={{
                                    fontFamily: "Roboto",
                                    fontSize: "15px",
                                    fontWeight: "500",
                                    lineHeight: "26px",
                                    letterSpacing: "0.46000000834465027px",
                                    textAlign: "left",
                                    color: "#FFFFFF"
                                }}>
                                {t("Roles.assign.cancel")}
                            </Typography>
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                marginBottom: "64px",
                                width: "165px",
                                height: "42px",
                                backgroundColor: "#0045FF",
                            }}
                            onClick={handleAceptSite}
                        >
                            <Typography variant="h3" sx={{ textTransform: "none" }}
                                style={{
                                    fontFamily: "Roboto",
                                    fontSize: "15px",
                                    fontWeight: "500",
                                    lineHeight: "26px",
                                    letterSpacing: "0.46000000834465027px",
                                    textAlign: "left",
                                    color: "#FFFFFF"
                                }}>
                                {t("Roles.assign.acept")}
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>

    );
};

export default ModalRolSites;