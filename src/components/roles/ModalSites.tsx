// ReactJS
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// MUI
import { Box, Modal, Typography } from "@mui/material";

// Shared
import TableComponent from "../../shared/components/Table";

// Services
import { getSitesByRol } from "../../service/usersKeycloack/usersKeycloack.service";

// Constants
import { RolesSitesHeader } from "../../constants/headers";
import { ViewComfyAltOutlined, CloseOutlined } from "@mui/icons-material";

// Styled
import { ModalContainer } from "./styled";

export default function ModalSites({ open, handleClose, idPlan, roleName}: IModalProps) {
    // Translation
    const { t } = useTranslation();
    
    // LocalStorage
    const accessToken = localStorage.getItem("access_token") || "";
    const userStorage = JSON.parse(localStorage.getItem("user") || "{}"); 
    // States
    const [rows, setRows] = useState<any[]>([]);

    const [isLoading, setIsLoading] = useState(false);

    const handleLoadSites = () => {
        
        setIsLoading(true);
        getSitesByRol(accessToken, idPlan, (result: any) => {
            if (result.code == "ERR_BAD_REQUEST") {
                // toast.error("" + result.response.data.message);
                return;
            }

            if (result.status == 200) {
                // toast.success(result.statusText);
                setRows(result.data.data);
                setIsLoading(false);
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

    // Effects
    useEffect(() => {
        handleLoadSites();
    }, []);

    return (
        <Modal
            onClose={handleClose}            
            open={open}
        >
            <ModalContainer>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px"}}>
                    <Typography variant="h5" component="h5" sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <ViewComfyAltOutlined style={{ color: "#0045FF" }} />{" "}
                        {t("Roles.show.sites.tittle")}
                    </Typography>
                    <CloseOutlined onClick={handleClose} style={{ cursor: "pointer" }} />
                </Box>
                <Box
                    sx={{
                        marginBottom: "16px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start"
                    }}
                >   
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                    
                    
                        <Typography variant="h6" component="h6" sx={{
                            fontFamily: "Roboto",
                            fontSize: "16px",
                            fontWeight: "700",
                            lineHeight: "19px",
                            letterSpacing: "0.15000000596046448px",
                            textAlign: "left",
                        }}>
                            {userStorage?.profile?.name}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 1,
                        }}
                    >
                        <Typography variant="h6" component="h6" sx={{
                            fontFamily: "Roboto",
                            fontSize: "16px",
                            fontWeight: "700",
                            lineHeight: "19px",
                            letterSpacing: "0.15000000596046448px",
                            textAlign: "left",
                        }}>
                            Rol: 
                        </Typography>
                        <Typography variant="body2" component="p" sx={{
                            fontFamily: "Roboto",
                            fontSize: "16px",
                            fontWeight: "400",
                            lineHeight: "19px",
                            letterSpacing: "0.15000000596046448px",
                            textAlign: "left",
                        }}>
                            {roleName}
                        </Typography>
                    </Box>
                </Box>
                <Typography variant="body2" component="p">
                    {t("Roles.show.sites.description")}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        mt: 2,
                        maxHeight: "400px",
                        overflow: "auto",
                    }}
                >
                    <TableComponent 
                        height="300px"
                        module="roles-sites" 
                        tableHeader={RolesSitesHeader} 
                        tableRows={rows} 
                        isLoading={isLoading} />
                </Box>                
            </ModalContainer>
        </Modal>
    );
}
