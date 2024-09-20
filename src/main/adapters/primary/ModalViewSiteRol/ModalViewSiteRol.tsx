
// Traduction
import { Box, Button, Modal, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { StripedDataGrid } from "../../../utils/grid-data.style";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ViewComfyAltOutlinedIcon from "@mui/icons-material/ViewComfyAltOutlined";

interface ModalShowSitesRolProps {
    idRol: any;
    openProp: boolean;
    setSelectedId: any;
    setShowModal: any;
}

const ModalShowSitesRol : React.FC<ModalShowSitesRolProps> = ({ /* idRol, */ openProp, setSelectedId, setShowModal }) => {  
    const { t } = useTranslation();

    const [open, setOpen] = useState(openProp);
    const [rows, /*setRows*/] = useState<any[]>([{idSite: 1, name: "Sitio1"}, {idSite: 2, name: "Sitio2"}, {idSite: 3, name: "Sitio3"}, {idSite: 4, name: "Sitio4"}]);
    
    const columns: GridColDef[] = [
        { field: "name", headerName: t("Roles.show.sites.table.column"), flex: 1, minWidth: 150 }
    ];

    const handleClose = () => {
        setSelectedId("");
        setShowModal(false);
        setOpen(false);
    };

    return (
        <Modal 
            open={open}
            onClose={handleClose}
        >
            <Box
                sx={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                    width: "600px",
                    height: "auto",
                    maxHeight: "90vh",
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
                        height: "10%",
                        marginBottom: "2%",
                    }}
                >
                    <ViewComfyAltOutlinedIcon style={{color: "#0045FF", marginRight: "12px"}}/>
                    <Typography variant="h2" sx={{ textTransform: "none" }} style={{                  
                        fontFamily: "Roboto",
                        fontSize: "18px",
                        fontWeight: "700",
                        lineHeight: "21px",
                        letterSpacing: "0.15000000596046448px",
                        textAlign: "left",
                        color: "#000000DE",
                    }}>{t("Roles.show.sites.tittle")}</Typography>
                    <Button
                        sx={{
                            marginLeft: "auto",
                            width: "24px",
                            height: "24px",
                        }}
                        onClick={handleClose}
                    >
                        <CloseOutlinedIcon style={{color: "#000000"}} />
                    </Button>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        height: "20%",
                        marginBottom: "2%",
                    }}
                >
                    <Typography variant="h2" sx={{ textTransform: "none" }} style={{
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        fontWeight: "400",
                        lineHeight: "16px",
                        letterSpacing: "0.15000000596046448px",
                        textAlign: "left",
                        color: "#000000DE",
                    }}>{t("Roles.show.sites.description")}</Typography>
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        height: "66%",
                    }}
                >
                    <StripedDataGrid
                        sx={{ marginRight: "0px !important", minHeight: "250px", height: "-webkit-fill-available", width: "100%" }}
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
            </Box>
        </Modal>
    );
};

export default ModalShowSitesRol;