// ReactJS
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";
import { Fragment, useContext, useEffect, useState } from "react";

// Comnponents
import Translate from "../../../shared/components/Translate";
import { BtnPrimary } from "../../../shared/components/Buttons";

// i18n
import { t } from "i18next";

// MUI
import { AppBar, Menu, MenuItem, Box, Typography, Button, Divider, Modal, TextField, Avatar } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

//Assets
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";

//Service
import { getRolesByUser, getSitesByRol } from "../../../service/usersKeycloack/usersKeycloack.service";
import { AuthContext } from "../../../context/AuthContext";
import { getUserById } from "../../../service/auth";

const HeaderAuth = () => {
    // Context
    const { changeRole, changeExpiredToken } = useContext(AuthContext);

    // Auth
    const auth = useAuth();

    // Navigate
    const navigate = useNavigate();

    // Local Storage
    const userObject  = localStorage.getItem("user");
    const user = userObject ? JSON?.parse(userObject) : {};
    const rolStorage = localStorage.getItem("rolUser");
    const rolJson = rolStorage ? JSON?.parse(rolStorage) : {};
    const siteStorage = localStorage.getItem("siteUser");
    const siteJson = siteStorage ? JSON?.parse(siteStorage) : {};

    const accessToken = localStorage.getItem("access_token");

    // State
    const [anchorEl, setAnchorEl] = useState(null);
    const [userDetail, setUserDetail] = useState<any>(null);

    const [data, setData] = useState<any[]>([]);
    const [dataRol, setDataRol] = useState<any[]>([]);

    const [dataIdKey, setDataIdKey] = useState("");
    const [dataIdKeyRol, setDataIdKeyRol] = useState("");
    const [dataNameKey, setDataNameKey] = useState("");
    const [dataNameKeyRol, setDataNameKeyRol] = useState("");
    const [roleSelected, setRoleSelected] = useState("");
    const [siteSelected, setSiteSelected] = useState("");

    const [isLoaded, setIsLoaded] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalRol, setOpenModalRol] = useState(false);

    let counter = 0;

    // Functions
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const handleCloseModal = () => {
        setOpenModal(false);
        setOpenModalRol(false);
    };

    const handleGoToProfile = () => {
        navigate("/profile");
    };

    const handleChangeSite = () => {
        handleLoadRoles({userId: user?.profile?.sub});
        setOpenModalRol(true);
    };

    const onChangeSite = (event: any) => {
        setSiteSelected(event.target.value);
    };

    const onChangeRole = (event: any) => {
        setRoleSelected(event.target.value);
    };

    const handleLoadSites = (params: { rolId: string}) => {

        getSitesByRol( accessToken, params.rolId, (result: any) => {

            if (result.code == "ERR_BAD_REQUEST") {
                // toast.error("" + result.response.data.message);
                return;
            }

            if (result.status == 200) {
                // toast.success(result.statusText);
                setData(result.data.data);
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

    const handleLoadRoles = (params: { userId: string}) => {

        getRolesByUser( accessToken, params.userId, (result: any) => {
            if (result.code == "ERR_BAD_REQUEST") {
                // toast.error("" + result.response.data.message);
                return;
            }

            if (result.status == 200) {
                // toast.success(result.statusText);
                setDataRol(result.data);
                setDataIdKeyRol("id");
                setDataNameKeyRol("name");
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

    const handleFinishChangeSite = () => {
        setOpenModal(false);
        setOpenModalRol(false);
        const allSite = data?.find(item => item.idSite === siteSelected);
        localStorage.setItem("siteUser", JSON.stringify(allSite));
        navigate("/");
    };

    const handleFinishChangeRol = () => {
        setOpenModal(true);
        setOpenModalRol(false);
        const allRol = dataRol?.find(item => item.id === roleSelected);
        changeRole(allRol);
        localStorage.setItem("rolUser", JSON.stringify(allRol));
    };

    const getUser = () => {
        getUserById(user.profile?.sub)
            .then((response) => { 
                setUserDetail(response?.data);
            })
            .catch(() => {                
                counter += 1;

                if (counter < 3) {
                    return getUser();
                } else {
                    changeExpiredToken(true);

                    navigate("/404");
                }
            })
            .finally(() => {                
                setIsLoaded(false);
            });
    };

    // Effects
    useEffect(() => {
        setIsLoaded(true);          

        getUser();
    }, []); 

    useEffect(() => {
        if(!rolStorage && !siteStorage && user?.profile?.sub != null && accessToken != null){
            handleChangeSite;
        }else if(roleSelected == "" && siteSelected == ""){
            setRoleSelected(rolJson ? rolJson.id : "");
            setSiteSelected(siteJson ? siteJson.idSite : "");
        }
    }, [user, accessToken]);

    useEffect(() => {
        if(roleSelected != ""){
            handleLoadSites({rolId: roleSelected});
        }
    }, [roleSelected]);     

    if (isLoaded) return (
        <AppBar position="static">
            <Box
                display="flex"
                alignItems="center"
                width={"100%"}
                height={"100%"}
                sx={{ flexDirection: { xs: "column", md: "row" } }}
            >
                <Box marginLeft="auto" height="100%"  sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                    <Translate />
                    <Divider orientation="vertical" flexItem />
                </Box>
            </Box>
        </AppBar>
    );     

    return (
        <>
            <AppBar position="static">
                <Box
                    display="flex"
                    alignItems="center"
                    width={"100%"}
                    height={"100%"}
                    sx={{ flexDirection: { xs: "column", md: "row" } }}
                >
                    <Box marginLeft="auto" height="100%"  sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                        <Translate />
                        <Divider orientation="vertical" flexItem />
                        <Button
                            sx={{
                                height: "100%",
                                width: "270px",
                                display: "flex",
                                justifyContent: "space-between",
                                gap: 2,
                            }}
                            color="inherit"
                            onClick={handleClick}
                            aria-controls="user-menu"
                            aria-haspopup="true"
                            endIcon={<KeyboardArrowDownIcon />}
                        >
                            <Avatar
                                alt="Avatar"
                                src={`https://ui-avatars.com/api/?name=${userDetail?.firstName}+${userDetail?.lastName}&background=0045FF&color=FFF&bold=true`}
                                sx={{ width: 50, height: 50 }}
                            />

                            <Box sx={{ display: "flex", flexDirection: "column", width:"100%"}}>
                                <Typography
                                    variant="h2"
                                    sx={{ textTransform: "none"}}
                                    style={{
                                        fontSize: "14px", 
                                        fontFamily: "Roboto", 
                                        fontWeight: "700", 
                                        lineHeight: "19px", 
                                        letterSpacing: "0em", 
                                        textAlign: "left", 
                                        color: "#1F2126" 
                                    }}
                                >
                                    {siteJson.name}
                                </Typography>
                                <Typography
                                    variant="h4"
                                    sx={{ textTransform: "none" }}
                                    style={{
                                        fontSize: "12px", 
                                        fontFamily: "Roboto", 
                                        fontWeight: "400", 
                                        lineHeight: "16px", 
                                        letterSpacing: "0em", 
                                        textAlign: "left", 
                                        color: "#1F2126"
                                    }}
                                >
                                    {userDetail?.firstName} {userDetail?.lastName}
                                </Typography>
                            </Box>
                            
                        </Button>
                        <Menu
                            id="user-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            style={{display: "flex", flexDirection: "column", alignContent: "center"}}
                        >
                            <MenuItem>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <Typography variant="h2" sx={{ textTransform: "none" }} style={{
                                        fontFamily: "Roboto",
                                        fontSize: "16px",
                                        fontWeight: "400",
                                        lineHeight: "24px",
                                        letterSpacing: "0.15000000596046448px",
                                        textAlign: "left",
                                        color: "#000000DE"
                                    }}>{siteJson.name}</Typography>
                                    <Typography variant="h3" sx={{ textTransform: "none" }} style={{
                                        fontFamily: "Roboto",
                                        fontSize: "12px",
                                        fontWeight: "400",
                                        lineHeight: "14px",
                                        letterSpacing: "0.17000000178813934px",
                                        textAlign: "left",
                                        color: "#00000099"
                                    }}>{user?.profile?.email}</Typography>
                                </div>
                            </MenuItem>
                            <Divider />
                            <MenuItem
                                onClick={handleChangeSite}>
                                <BtnPrimary>
                                    <ChangeCircleOutlinedIcon style={{ color: "#FFF" }} />
                                    {t("Header.changeSite")}
                                </BtnPrimary>
                            </MenuItem>
                            <Divider />
                            <MenuItem
                                onClick={() => {
                                    handleGoToProfile();
                                }}
                            >
                                <PermIdentityIcon sx={{ marginRight: "10px" }} />
                                {t("HeatherAuth.profile")}
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={() => {
                                auth.signoutRedirect();
                                auth.removeUser();
                            }}>
                                <ExitToAppIcon color="error" sx={{ marginRight: "10px" }} />
                                {t("HeatherAuth.logout")}
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </AppBar>

            <Modal open={openModal} onClose={handleCloseModal}>
                <Box
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                        width: "605px",
                        height: "auto",
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
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        marginBottom: "43px"
                    }}>
                        <Typography variant="h2" sx={{ textTransform: "none" }} style={{
                            fontFamily: "Roboto",
                            fontSize: "24px",
                            fontWeight: "700",
                            lineHeight: "28px",
                            letterSpacing: "0.15000000596046448px",
                            textAlign: "left",
                            color: "#000000DE",
                            marginBottom: "16px"
                        }}>{t("Header.changeSite.title")}</Typography>
                        <Typography variant="h3" sx={{ textTransform: "none" }} style={{
                            fontFamily: "Roboto",
                            fontSize: "16px",
                            fontWeight: "400",
                            lineHeight: "26px",
                            letterSpacing: "0.46000000834465027px",
                            textAlign: "left",
                            color: "#606A84"
                        }}>{t("Header.changeSite.description")}</Typography>
                    </div>
                    <div
                        style={{
                            width: "80%",
                            display: "flex",
                            flexDirection: "column",
                        }}>
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                marginBottom: "24px"
                            }}>
                            <FeedOutlinedIcon style={{color: "#0045FF"}}/>
                            <Typography variant="h3" sx={{ textTransform: "none" }} style={{
                                fontFamily: "Roboto",
                                fontSize: "20px",
                                fontWeight: "700",
                                lineHeight: "23px",
                                letterSpacing: "0.15000000596046448px",
                                textAlign: "left",
                                color: "#000000DE"
                            }}>{t("Header.changeSite.activeSites")}</Typography>
                        </div>

                        <TextField
                            style={{color: "#606A84", marginBottom: "24px" }}
                            label = {t("Header.changeSite.label")}
                            select
                            value={siteSelected ? siteSelected.toString() : ""}
                            onChange={onChangeSite}
                            placeholder={t("Header.changeSite.select")}
                        >
                            {data?.map((item) => (
                                <MenuItem key={item[dataIdKey]} style={{color: "#606A84"}} value={item[dataIdKey]}>
                                    {item[dataNameKey]}
                                </MenuItem>
                            ))}
                        </TextField>
                        <BtnPrimary
                            disabled={Boolean(!siteSelected)}
                            onClick={handleFinishChangeSite}
                            style={{ marginBottom: "64px", width: "100%", height: "42px" }}
                        >                            
                            {t("Header.changeSite.confirm")}
                        </BtnPrimary>
                    </div>
                </Box>
            </Modal>

            <Modal open={openModalRol} onClose={handleCloseModal}>
                <Box
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                        width: "605px",
                        height: "auto",
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
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        marginBottom: "43px"
                    }}>
                        <Typography variant="h2" sx={{ textTransform: "none" }} style={{
                            fontFamily: "Roboto",
                            fontSize: "24px",
                            fontWeight: "700",
                            lineHeight: "28px",
                            letterSpacing: "0.15000000596046448px",
                            textAlign: "left",
                            color: "#000000DE",
                            marginBottom: "16px"
                        }}>{t("Header.changeRol.title")}</Typography>
                        <Typography variant="h3" sx={{ textTransform: "none" }} style={{
                            fontFamily: "Roboto",
                            fontSize: "16px",
                            fontWeight: "400",
                            lineHeight: "26px",
                            letterSpacing: "0.46000000834465027px",
                            textAlign: "left",
                            color: "#606A84"
                        }}>{t("Header.changeRol.description")}</Typography>
                    </div>
                    <div
                        style={{
                            width: "80%",
                            display: "flex",
                            flexDirection: "column",
                        }}>
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                marginBottom: "24px"
                            }}>
                            <FeedOutlinedIcon style={{color: "#0045FF"}}/>
                            <Typography variant="h3" sx={{ textTransform: "none" }} style={{
                                fontFamily: "Roboto",
                                fontSize: "20px",
                                fontWeight: "700",
                                lineHeight: "23px",
                                letterSpacing: "0.15000000596046448px",
                                textAlign: "left",
                                color: "#000000DE"
                            }}>{t("Header.changeRol.activeSites")}</Typography>
                        </div>

                        {dataRol && (
                            <Fragment>
                                <TextField
                                    style={{color: "#606A84", marginBottom: "24px" }}
                                    label = {t("Header.changeRol.label")}
                                    select
                                    value={roleSelected ? roleSelected.toString() : ""}
                                    onChange={onChangeRole}
                                    placeholder={t("Header.changeRol.select")}
                                >
                                    {dataRol?.map((item) => (
                                        <MenuItem key={item[dataIdKeyRol]} style={{color: "#606A84"}} value={item[dataIdKeyRol]}>
                                            {item[dataNameKeyRol]}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <BtnPrimary
                                    disabled={Boolean(!roleSelected)}
                                    onClick={handleFinishChangeRol}
                                    style={{ marginBottom: "64px", width: "100%", height: "42px" }}
                                >                                    
                                    {t("Header.changeRol.confirm")}
                                </BtnPrimary>
                            </Fragment>
                        )}
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default HeaderAuth;
