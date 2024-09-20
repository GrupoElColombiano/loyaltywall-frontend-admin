import { Link, useNavigate } from "react-router-dom";
//Material-UI
import {
    Box,
    Typography,
    Button,
    Switch,
    FormControlLabel,
    TextField,
    Alert,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SaveIcon from "@mui/icons-material/Save";
import { ChangeEvent, useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import axios from "axios";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

function PageOneSite() {
    // Location
    const siteString = localStorage.getItem("siteEdit");
    const site = siteString ? JSON.parse(siteString) : {};
    // Navegation
    const navigate = useNavigate();

    // States
    const [errorForm, setErrorForm] = useState(false);
    const [inputDisabled, setInputDisabled] = useState(true);
    const [siteStatus, setSiteStatus] = useState(false);
    const { t } = useTranslation();

    const [errorMessage, setErrorMessage] = useState([]);

    const [siteDescription, setSiteDescription] = useState("");
    const [siteName, setSiteName] = useState("");
    const [siteURL, setSiteURL] = useState("");

    // Functions
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === "siteName") {
            setSiteName(value);
        } else if (name === "siteURL") {
            setSiteURL(value);
        } else if (name === "siteDescription") {
            setSiteDescription(value);
        }
    };

    const handleStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newStatus = event.target.checked;
        if (newStatus !== siteStatus) {
            Swal.fire({
                title: t("Alert.status.title"),
                text: t("Alert.status.text"),
                confirmButtonText: t("Alert.button.confirm"),
                confirmButtonColor: "#0045FF",
                cancelButtonText: t("Alert.button.cancel"),
                cancelButtonColor: "#7E2EFF",
                icon: "question",
                showCancelButton: true,
                allowOutsideClick: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    setSiteStatus(newStatus);
                } else {
                    setSiteStatus(siteStatus);
                }
            });
        }
    };

    const handleSubmitNewSite = async () => {
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const createSiteDto = {
            name: siteName,
            url: siteURL,
            description: siteDescription,
            isActive: siteStatus,
        };
        try {
            const response = await axios.post(`${BASE_URL}/sites/create`, createSiteDto);
            if (response.data) {
                Swal.fire({
                    title: t("Alert.save.title"),
                    text: t("Alert.save.text"),
                    confirmButtonText: t("Alert.button.confirm"),
                    confirmButtonColor: "#0045FF",
                    icon: "success",
                }).then((result) => {
                    if (result.isConfirmed) {
                        localStorage.setItem("siteEdit", "");
                        navigate(-1);
                    }
                });
            } else {
                setErrorForm(true);
            }
        } catch (error: any) {
            setErrorForm(true);
            setErrorMessage(error.response.data.errors);
        }
    };

    const handleGoBack = () => {
        Swal.fire({
            title: t("Alert.exit.title"),
            text: t("Alert.exit.text"),
            icon: "question",
            showCancelButton: true,
            confirmButtonText: t("Alert.button.confirm"),
            confirmButtonColor: "#0045FF",
            cancelButtonText: t("Alert.button.cancel"),
            cancelButtonColor: "#7E2EFF",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.setItem("siteEdit", "");
                navigate(-1);
            }
        });
    };

    const handleSubmitEditSite = async () => {
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const createSiteDto = {
            name: siteName,
            url: siteURL,
            description: siteDescription,
            isActive: siteStatus,
        };

        const id = site?.idSite;
        try {
            const response = await axios.patch(
                `${BASE_URL}/sites/${id}`,
                createSiteDto
            );
            if (response.data) {
                if (response.data) {
                    Swal.fire({
                        title: t("Alert.edit.title"),
                        text: t("Alert.edit.text"),
                        confirmButtonText: t("Alert.button.confirm"),
                        confirmButtonColor: "#0045FF",
                        icon: "success",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            localStorage.setItem("siteEdit", "");
                            navigate(-1);
                        }
                    });
                }
            } else {
                setErrorForm(true);
            }
        } catch (error: any) {
            setErrorForm(true);
            setErrorMessage(error.response.data.message);
        }
    };

    // Effects
    useEffect(() => {
        if (site) {
            setSiteName(site.name);
            setSiteURL(site.url);
            setSiteDescription(site.description);
            setSiteStatus(site.isActive);
            setInputDisabled(true);
        } else {
            setInputDisabled(false);
        }
    }, []);

    return (
        <div
            style={{
                backgroundColor: "#F8F8F8",
                color: "#000000",
                padding: "20px",
                height: "100%",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingLeft: "10px",
                    paddingRight: "20px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Link
                        to="#"
                        onClick={handleGoBack}
                        style={{ color: "inherit", textDecoration: "none" }}
                    >
                        <ArrowBackIosIcon />
                    </Link>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            marginLeft: "10px",
                            fontFamily: "Roboto",
                            fontSize: "32px",
                            fontWeight: 700,
                            lineHeight: "38px",
                            letterSpacing: "0em",
                            textAlign: "left",
                        }}
                    >
                        {site.name ? t("Sites.newSite.title.edit") : t("Sites.newSite.title.new")}
                    </Typography>
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={site.name ? <SaveIcon /> : <Add />}
                    onClick={() => {
                        site ? handleSubmitEditSite() : handleSubmitNewSite();
                    }}
                >
                    {site.name ? t("Sites.newSite.button.save") : t("Sites.newSite.button.add")}
                </Button>
            </div>
            <Typography
                variant="h2"
                component="div"
                sx={{
                    width: "50%",
                    height: "23px",
                    fontFamily: "Roboto",
                    fontSize: "12px",
                    fontWeight: 400,
                    lineHeight: "20px",
                    letterSpacing: "0.4000000059604645px",
                    textAlign: "left",
                    color: "#0000008F",
                }}
            >
                {t("Sites.newSite.description")}
            </Typography>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    alignContent: "flex-start",
                    flexWrap: "wrap",
                    color: "#0000008F"
                }}
            >
                <Box
                    component="form"
                    sx={{
                        marginTop: "20px",
                        width: "50%",
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmitNewSite}
                >
                    <div>
                        <TextField
                            sx={{
                                width: "100%",
                                height: "56px",
                                backgroundColor: "#FFFFFF",
                            }}
                            required
                            id="siteName"
                            name="siteName"
                            value={siteName}
                            label={t("Sites.newSite.label.name")}
                            placeholder={t("Sites.newSite.placeholder.name")}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div
                        style={{
                            marginTop: "20px",
                        }}
                    >
                        <TextField
                            sx={{
                                width: "100%",
                                height: "56px",
                                backgroundColor: "#FFFFFF",
                            }}
                            required
                            label={t("Sites.newSite.label.url")}
                            placeholder={t("Sites.newSite.placeholder.url")}
                            disabled={inputDisabled}
                            id="siteURL"
                            name="siteURL"
                            value={siteURL}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div
                        style={{
                            marginTop: "20px",
                        }}
                    >
                        <TextField
                            sx={{
                                width: "100%",
                                height: "130px",
                                backgroundColor: "#FFFFFF",
                            }}
                            multiline
                            rows={4}
                            required
                            label={t("Sites.newSite.label.description")}
                            placeholder={t("Sites.newSite.placeholder.description")}
                            id="siteDescription"
                            name="siteDescription"
                            value={siteDescription}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                height: "24px",
                                fontFamily: "Roboto",
                                fontSize: "18px",
                                fontWeight: 700,
                                lineHeight: "21px",
                                letterSpacing: "0em",
                                textAlign: "left",
                                color: "#000000",
                            }}
                        >
                            {t("Sites.newSite.statusTitle")}
                        </Typography>
                        <FormControlLabel
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "start",
                            }}
                            control={
                                <Switch
                                    id="siteStatus"
                                    name="siteStatus"
                                    checked={siteStatus}
                                    onChange={handleStatusChange}
                                />
                            }
                            label={t("Sites.newSite.label.status")}
                        />
                        <Typography
                            variant="h2"
                            component="div"
                            sx={{
                                width: "50%",
                                height: "23px",
                                fontFamily: "Roboto",
                                fontSize: "12px",
                                fontWeight: 400,
                                lineHeight: "20px",
                                letterSpacing: "0.4000000059604645px",
                                textAlign: "left",
                                color: "#0000008F",
                            }}
                        >
                            {t("Sites.newSite.statusDescription")}
                        </Typography>
                    </div>
                </Box>
            </div>
            {errorForm ? (
                errorMessage.map((message) => (
                    <Alert key={message} severity="error">
                        {message}
                    </Alert>
                ))
            ) : (
                <></>
            )}
        </div>
    );
}

export default PageOneSite;
