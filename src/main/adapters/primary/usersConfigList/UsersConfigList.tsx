// ReactJS
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// External Dependencies
import axios from "axios";
import Swal from "sweetalert2";
import { getPlanById } from "../../../../service/plans/plans.service";
// ReactJS
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// MUI
import { Typography, Box, Button, Container, CssBaseline, Stack, Select, MenuItem, FormControlLabel, Switch, Tabs, Tab } from "@mui/material";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";

// Services

// Assets
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

// Styles
import {
    DescriptionConfiguration,
    Form,
    FormContainer,
    GenericField,
    MessageDescription,
    StyledInput,
    StyledTextArea,
    TitleButtonRegister,
    TitleFields
} from "../../../../pages/plans/new/styled";

// Resources
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-toastify/dist/ReactToastify.css";

export interface EditPlanProps {
    planId: string | undefined;
    versionId: string | undefined;
}

// interface TypeUser {
//     code: string;
//     label: string;
//     suggested?: boolean;
// }

export interface PLanData {
    idVersionPlan: number;
    idPlan: number;
    description: string;
    name: string;
    userType: string;
    isActive: boolean | string;
    time: string | null;
    typeDuration: string | null;
    duration: number | null;
    rate: number | null;
    renewalRate: number | null;
    isSpecialRateActive: boolean;
    specialRate: number | null;
    renewalSpecialRate: number | null;
    startDate: string | null;
    endDate: string | null;
    createdAt: string;
    updatedAt: string;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const CustomTabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
    return (
        <div
            aria-labelledby={`simple-tab-${index}`}
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            role="tabpanel"
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

const VersionShow: React.FC<EditPlanProps> = ({ planId, versionId }) => {
    const [pageStatus, setPageStatus] = useState();
    const [planData, setPlanData] = useState<PLanData>();

    // Navigation
    const navigate = useNavigate();

    // Translation
    const { t } = useTranslation();

    // States
    const [isTab, /* setIsTab */] = useState(false);

    const [value, /* setValue */] = useState(0);

    // Functions
    const handleStatusChange = (event: any) => {
        const newStatus = event.target.checked;
        if (planData && newStatus !== planData.isActive) {
            const currentStatus = planData.isActive;
            Swal.fire({
                title: t("Alert.status.title"),
                text: t("Alert.status.text"),
                showCancelButton: true,
                confirmButtonText: t("Alert.button.confirm"),
                cancelButtonText: t("Alert.button.cancel"),
                icon: "question",
                allowOutsideClick: false,
            }).then((result: any) => {
                if (result.isConfirmed) {
                    setPlanData((prevPlanData) => {
                        if (prevPlanData) {
                            return { ...prevPlanData, isActive: newStatus };
                        }
                        return prevPlanData;
                    });
                    handleChangeStatusPlan();
                    setPageStatus(newStatus);
                } else {
                    event.target.checked = currentStatus;
                }
            });
        }
    };

    const handleChangeStatusPlan = async () => {
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        try {
            const response = await axios.put(
                `${BASE_URL}/plans/${planId}/update`,
                planData
            );
            if (response.data) {
                Swal.fire({
                    title: t("Plan.newPlan.alert.success"),
                    text: t("Plan.newPlan.alert.successPlan"),
                    icon: "success",
                    confirmButtonText: t("Alert.button.confirm"),
                });
            }
        } catch (error: any) {
            Swal.fire({
                title: t("Alert.error.title"),
                text: error.response.data.message,
                icon: "error",
                confirmButtonText: t("Alert.button.confirm"),
            });
        }
    };

    const handleGoBack = () => {
        localStorage.removeItem("planVersion");
        navigate(-1);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    // Effects
    useEffect(() => {
        getPlanById(planId, (result) => {
            if (result.code == "ERR_BAD_REQUEST") {
                toast.error("" + result.response.data.message);
                return;
            }

            if (result.status == 200) {
                setPlanData(result.data);
                setPageStatus(result.data.isActive);
                return;
            }


            if (result.response?.data?.status == 406) {
                toast.warn(result.response.data.message);
            } else if (result.response?.data?.status == 201) {
                toast.success(result.statusText);
            } else if (result.response?.data?.status == 404) {
                toast.warn(result.response.data.message);
            }
            return;

        });
    }, []);

    return (
        <>
            <Form onSubmit={handleSubmit} style={{ backgroundColor: "#F8F8F8" }}>
                <FormContainer>
                    <Container maxWidth={false}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Box display="flex" alignItems="center">
                                <Button onClick={() => { handleGoBack(); }} startIcon={<ArrowBackIosIcon style={{ color: "#000000" }} />} />
                                <TitleButtonRegister>{planData != undefined ? planData.name : "Plan"} V{versionId}</TitleButtonRegister>
                            </Box>
                        </Box>
                        <MessageDescription>
                            {/* Descripción breve de Nuevo producto */}
                            {t("Plan.viewVersion.descriptionTitle")}
                        </MessageDescription>
                        <br />
                        <GenericField >
                            <span
                                style={{
                                    fontFamily: "Roboto",
                                    fontSize: "18px",
                                    fontWeight: 700,
                                    lineHeight: "21px",
                                    letterSpacing: "0em",
                                    textAlign: "left",
                                }}
                            >
                                Status
                            </span>
                            <FormControlLabel
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "start",
                                    width: "200px"
                                }}
                                control={
                                    <Switch
                                        id="siteStatus"
                                        name="siteStatus"
                                        checked={pageStatus}
                                        onChange={handleStatusChange}
                                    />
                                }
                                label="Inactivo / Activo"
                            />
                        </GenericField>
                        <GenericField>
                            <TitleFields>{t("Plan.newPlan.userType")}</TitleFields>
                            {planData ? <Select
                                disabled
                                value={1}
                                sx={{ width: 300, color: "#606A84" }}
                            >
                                <MenuItem value={1}>{planData.userType}</MenuItem>
                            </Select> : <></>}
                        </GenericField>
                        <br />
                        <GenericField>
                            <TitleFields>{t("Plan.viewVersion.generalInfo")}</TitleFields>
                            {planData ? <StyledInput
                                label={t("Plan.newPlan.label.name")}
                                type="text"
                                name="firstName"
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={planData.name}
                                disabled
                            /> : <></>}
                        </GenericField>
                        <br />
                        <GenericField>
                            {planData ? <StyledTextArea
                                label={t("Plan.viewVersion.label.description")}
                                disabled
                                multiline
                                rows={4}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={planData.description}
                            /> : <></>}
                        </GenericField>
                        <br />
                    </Container>
                    <CssBaseline />
                    <Container maxWidth={false}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <PostAddOutlinedIcon sx={{ color: "#4073FF", fontSize: 34 }} />
                            <TitleFields>{t("Plan.viewVersion.configuration.title")}</TitleFields>
                        </Stack>
                        {isTab ? (
                            <Box sx={{ width: "100%" }}>
                                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                    <Tabs value={value} /* onChange={handleChange} */ aria-label="basic tabs example">
                                        <Tab icon={<Inventory2OutlinedIcon />} iconPosition="start" label="Productos" />
                                        <Tab icon={<CategoryOutlinedIcon />} iconPosition="start" label="Duración y tarifas" />
                                    </Tabs>
                                </Box>
                                <CustomTabPanel value={value} index={0}>
                                    Item One
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1}>
                                    Item Two
                                </CustomTabPanel>
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    alignItems: "center",
                                    bgcolor: "#BFD0FF",
                                    height: "20vh",
                                    justifyContent: "center",
                                    paddingTop: "40px",
                                    textAlign: "-webkit-center",
                                    borderRadius: "10px",
                                    borderStyle: "dashed",
                                    borderWidth: "1px",
                                    borderColor: "#4073FF",
                                }}
                            >
                                {/* Aquí colocas el contenido que deseas centrar dentro del Box */}
                                {/* <ButtonRegister onClick={handleAddConfig} disabled> */}
                                {/*     <SaveOutlinedIcon style={{ width: 24, height: 24, color: "#ffff"}}  /> Icono al lado izquierdo del texto*/}
                                {/*     <span>{t("Plan.newPlan.configuration.button.add")}</span> */}
                                {/* </ButtonRegister> */}
                                <DescriptionConfiguration>
                                    {t("Plan.newPlan.configuration.description")}
                                </DescriptionConfiguration>
                            </Box>
                        )}
                    </Container>
                    <ToastContainer />
                </FormContainer>
            </Form>
        </>
    );
};

export default VersionShow;