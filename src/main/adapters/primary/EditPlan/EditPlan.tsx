// ReactJS
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// MUI
import { Tab, Tabs,  Box,  Container, CssBaseline, Stack, Table, TableHead, TableRow, TableBody, TableCell, IconButton, TableContainer, Paper, Tooltip, FormControlLabel, Switch, Select, MenuItem, Typography } from "@mui/material";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveIcon from "@mui/icons-material/Save";

// Shared
import { BtnPrimary } from "../../../../shared/components/Buttons";
import NavHeader from "../../../../shared/components/NavHeader";

// External Dependencies
import axios from "axios";
import Swal from "sweetalert2";

// Components
import ProductSelectionModal from "../ProductSelectionModal/ProductSelectionModal";

// Services
import { CategoryProduct } from "../../../../service/plans/interfaces/createPlan";


import { getPlanById } from "../../../../service/plans/plans.service";

// Styles
import { ButtonRegister, DescriptionConfiguration, Form, FormContainer, GenericField, StyledInput, StyledTextArea, TitleFields} from "../../../../pages/plans/new/styled";

export interface EditPlanProps {
    planId: string | undefined;
}

export interface PLanData {
    idVersionPlan: number;
    idPlan: number;
    description: string;
    name: string;
    userType: string;
    isActive: boolean | string;
    duration: number | null;
    rate: Array<any> | null;
    categories: Array<CategoryProduct | null | undefined>;
    idSite: any;
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

const headersProduct = [
    "Plan.newPlan.table.product.site",
    "Plan.newPlan.table.product.products",
    "Plan.newPlan.table.product.category",
    "Plan.newPlan.table.product.amount",
    "Plan.newPlan.table.product.frequency",
    "Plan.newPlan.table.product.typeDuration",
    "Plan.newPlan.table.product.duration",
    "Plan.newPlan.table.product.actions"
];

const headersRate = [
    "Plan.newPlan.table.rate.duration",
    "Plan.newPlan.table.rate.rate",
    "Plan.newPlan.table.rate.rateRenewal",
    "Plan.newPlan.table.rate.rateSpecial",
    "Plan.newPlan.table.rate.rateSpecialRenewal",
    "Plan.newPlan.table.rate.date",
    "Plan.newPlan.table.rate.actions"
];

const EditPlan: React.FC<EditPlanProps> = ({ planId }) => {    
    // Translation
    const { t } = useTranslation();

    //states
    const [addConfig, setAddConfig] = useState(false);
    const [value, setValue] = useState(0);
    const siteStorage = localStorage.getItem("siteUser");
    const siteJson = siteStorage ? JSON.parse(siteStorage) : {};
    const [pageStatus, setPageStatus] = useState<undefined | boolean>();
    const [planData, setPlanData] = useState<PLanData>();
    const [tableTasbData, setTableTasbData] = useState<{
        products: any[];
        rates: any[];
    }>({
        products: [],
        rates: []
    });
    const [descriptionTypeUser, setDescriptionTypeUser] = useState<string>("N/A");
    const [planTittle, setPlanTittle] = useState<string>(planData?.name ? planData?.name : "Plan"); 

    // Functions
    const handleStatusChange = (event: any) => {
        const newStatus = event.target.checked;
        if (planData && newStatus !== planData.isActive) {
            const currentStatus = planData.isActive; 
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
            }).then((result: any) => {
                if (result.isConfirmed) {
                    setPlanData((prevPlanData) => {
                        if (prevPlanData) {
                            return { ...prevPlanData, isActive: newStatus };
                        }
                        return prevPlanData;
                    });
                    // handleChangeStatusPlan();
                    setPageStatus(newStatus);
                } else {
                    event.target.checked = currentStatus;
                    setPageStatus(currentStatus == true);
                }
            });
        }
    };

    const closeModal = () => {
        setAddConfig(false);
        // executeGetPlanById();
        // Aquí puedes realizar acciones adicionales cuando se cierra la modal
    };

    const handleChangeStatusPlan = async () => {

        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const dataToSend = planData!;
        dataToSend.isActive = pageStatus!.toString();
        dataToSend.categories = tableTasbData.products;
        dataToSend.rate = tableTasbData.rates;
        dataToSend.idSite = siteJson.idSite;

        try {
            const response = await axios.put(
                `${BASE_URL}/plans/${planId}/update`,
                dataToSend
            );
            if (response.data) {
                Swal.fire({
                    title: t("Alert.save.title"),
                    text: t("Alert.save.text"),
                    confirmButtonText: t("Alert.button.confirm"),
                    confirmButtonColor: "#0045FF",
                    icon: "success"
                }).then((result) => {
                    // eslint-disable-next-line no-empty
                    if (result.isConfirmed) {}
                });
            }
        } catch (error: any) {
            Swal.fire({
                title: t("Alert.error.title"),
                text: error.response.data.message,
                confirmButtonText: t("Alert.button.confirm"),
                confirmButtonColor: "#0045FF",
                icon: "error"
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleAddConfig = () => {
        setAddConfig(true) ;
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        event.preventDefault();
        setValue(newValue);
    };

    const handleMenuDeleteRow = (index: number) => {
        if(tableTasbData.products.length > 1){
            Swal.fire({
                title: t("Plan.newPlan.swal.title"),
                text: t("Plan.newPlan.swal.text"),
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#4073FF",
                cancelButtonColor: "#EF5350",
                confirmButtonText: t("Alert.button.confirm"),
                cancelButtonText: t("Alert.button.cancel")
            }).then((result) => {
                if (result.isConfirmed) {
                    const updatedProducts = [...tableTasbData.products];
        
                    updatedProducts.splice(index, 1);
                    
                    setTableTasbData(prevState => ({
                        ...prevState,
                        products: updatedProducts
                    }));
                    Swal.fire(t("Plan.newPlan.swal.delete"), t("Plan.newPlan.swal.category"), "success");
                }
            });
        }else{
            Swal.fire({
                title: t("Plan.newPlan.swal.noDelete"),
                text: t("Plan.newPlan.swal.category.noDeleteText"),
                icon: "warning",
                confirmButtonText: t("Alert.button.confirm"),
            });
        }
        
    };

    const handleMenuDeleteRates = (index: number) => {
        if(tableTasbData.rates.length > 1){
            Swal.fire({
                title: t("Plan.newPlan.swal.title"),
                text: t("Plan.newPlan.swal.text"),
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#4073FF",
                cancelButtonColor: "#EF5350",
                confirmButtonText: t("Alert.button.confirm"),
                cancelButtonText: t("Alert.button.cancel")
            }).then((result) => {
                if (result.isConfirmed) {
                    const updatedRates = [...tableTasbData.rates];
                    
                    updatedRates.splice(index, 1);
                    
                    setTableTasbData(prevState => ({
                        ...prevState,
                        rates: updatedRates
                    }));
                    Swal.fire(t( "Plan.newPlan.swal.delete"), t("Plan.newPlan.swal.rate.DeleteText"), "success");
                }
            }
            );
        }else{
            Swal.fire({
                title: t("Plan.newPlan.swal.noDelete"),
                text: t("Plan.newPlan.swal.rate.noDeleteText"),
                icon: "warning",
                confirmButtonText: t("Alert.button.confirm"),
            });
        }
        
    };

    const onSubmitButton = () => {
        setPlanData((prevPlanData) => {
            if (prevPlanData) {
                return { ...prevPlanData, isActive: prevPlanData.isActive.toString(), categories: tableTasbData.products, rate: tableTasbData.rates };
            }
            return prevPlanData;
        });
        handleChangeStatusPlan();
    };

    const mapDataTables = (data: any) => {
        return {
            products: data.products.map((product: any) => (
                {
                    siteName: product.sites?.name, 
                    productName: product.product?.name,
                    categoryName: (product.categorysAccess[0] ? product.categorysAccess[0]?.category.name : "N/A"),
                    sites: product.sites?.idSite,
                    idProduct: product.product?.idProduct,
                    idCategory:  (product.categorysAccess[0] ? product.categorysAccess[0]?.category.idCategory : 0),
                    duration: (product.categorysAccess[0] ? product.categorysAccess[0]?.duration : 0),
                    typeDuration: (product.categorysAccess[0] ? product.categorysAccess[0]?.typeDuration : ""),
                    frequency: (product.categorysAccess[0] ? product.categorysAccess[0]?.frequency : ""),
                    unlimited: (product.categorysAccess[0] ? product.categorysAccess[0]?.unlimited : false),
                    amount: (product.categorysAccess[0] ? product.categorysAccess[0]?.amount : 0)
                }
            )),
            rates: data.rates.map((rate: any) => ({
                time: rate.time,
                rate: rate.rate,
                rate_special: rate.rate_special,
                rate_special_renewal: rate.rate_special_renewal,
                rate_renewal: rate.rate_renewal,
                duration: rate.duration,
                is_special: rate.is_special,
                date_start: rate.date_start,
                date_end: rate.date_end,
            })),
        };
        
    };

    // Effects
    useEffect(() => {
        executeGetPlanById();
    }, []);

    const executeGetPlanById = () =>{

        getPlanById( planId, (result) => {
            if (result.code == "ERR_BAD_REQUEST") {
                toast.error("" + result.response.data.message);
                return;
            }

            if (result.status == 200) {
                setPlanData(result.data.plan);
                setPageStatus(result.data.plan.isActive);
                setPlanTittle(result.data.plan.name);
                setTableTasbData(
                    mapDataTables({
                        products: result.data.plan.plansProductsCategory ? result.data.plan.plansProductsCategory : [],
                        rates: result.data.plan.rates ? result.data.plan.rates : [],
                    }));
                return;
            }
            
            if(result.response?.data?.status == 406){
                toast.warn(result.response.data.message);
            }else if(result.response?.data?.status == 201){
                toast.success(result.statusText);
            }else if(result.response?.data?.status == 404){
                toast.warn(result.response.data.message);
            }
            return;

        });
    };

    useEffect(() => {
        setDescriptionTypeUser(planData?.userType ? planData?.userType : "");
    }, [planData]);

    return (
        <div style={{
            maxHeight: "85vh", 
            overflowY: "auto"
        }}>
            <Form onSubmit={handleSubmit} style={{backgroundColor: "#F8F8F8"}}>
                <FormContainer>
                    <Container maxWidth={false}>
                        <NavHeader title={`${planTittle}`} description={`${t("Plan.editPlan.description")}`} isBack>
                            <BtnPrimary onClick={()=>onSubmitButton()}>
                                <SaveIcon />
                                {t("Plan.newPlan.button.save")}
                            </BtnPrimary>
                        </NavHeader>
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
                                onChange={(e) => setPlanData((prevPlanData) => {
                                    if (prevPlanData) {
                                        return { ...prevPlanData, name: e.target.value };
                                    }
                                    return prevPlanData;
                                })}
                            /> : <></>}
                        </GenericField>

                        <br />

                        <GenericField>
                            {planData ? <StyledTextArea
                                label={t("Plan.viewVersion.label.description")}
                                multiline
                                rows={4}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={planData.description}
                                onChange={(e) => setPlanData((prevPlanData) => {
                                    if (prevPlanData) {
                                        return { ...prevPlanData, description: e.target.value };
                                    }
                                    return prevPlanData;
                                })}
                            /> : <></>}
                        </GenericField>
                        <br />
                    </Container>
                    <CssBaseline />
                    <Container maxWidth={false}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <PostAddOutlinedIcon sx={{ color: "#4073FF", fontSize: 34 }} />
                            <TitleFields>{t("Plan.newPlan.configuration.title")}
                            </TitleFields>                             
                            {tableTasbData && tableTasbData.products && tableTasbData.products.length > 0 && (
                                <ButtonRegister onClick={handleAddConfig}> 
                                    <SaveOutlinedIcon style={{ width: 24, height: 24, color: "#ffff"}}  /> 
                                    <span>{t("Plan.newPlan.configuration.button.add")}</span>
                                </ButtonRegister>
                            )}
                        </Stack>
                        {tableTasbData?.products?.length > 0 || tableTasbData?.rates?.length > 0 ? (
                            <Box sx={{ width: "100%" }}>
                                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                        <Tab
                                            icon={<Inventory2OutlinedIcon />}
                                            iconPosition="start"
                                            label={t("Plan.newPlan.tab.products")}
                                            sx={{
                                                backgroundColor: "#FFF",
                                                borderRadius: "10px 0px 0px 0px",
                                                padding: "0px 1.2rem",
                                                border: "1px solid #0000003B",
                                            }}
                                        />
                                        {descriptionTypeUser === "Suscrito" && (
                                            <Tab
                                                icon={<CategoryOutlinedIcon />}
                                                iconPosition="start"
                                                label={t("Plan.newPlan.tab.rates")}
                                                sx={{
                                                    backgroundColor: "#FFF",
                                                    borderRadius: "0px 10px 0px 0px",
                                                    padding: "0px 1.2rem",
                                                    border: "1px solid #0000003B",
                                                }}
                                            />
                                        )}
                                    </Tabs>
                                </Box>

                                <CustomTabPanel value={value} index={0}>
                                    {tableTasbData?.products.length > 0 && (
                                        <>
                                            <TableContainer component={Paper} sx={{ backgroundColor: "transparent", width: "100%", boxShadow: "none", height: "100%", maxHeight: "35vh" }}>
                                                <Table style={{ borderColor: "transparent", height: "100%" }}>
                                                    <TableHead style={{ backgroundColor: "#7FA1FF", position: "sticky", top: 0, zIndex: 1 }}>
                                                        <TableRow>
                                                            {headersProduct.map((header) => (
                                                                <TableCell key={header}>{t(header)}</TableCell>
                                                            ))}                                                    
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {tableTasbData?.products.map((row, index) => (
                                                            <>
                                                                <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? "#F3F3F3" : "#FFFFFF", borderBottom: "none" }}>                                                                                                                       
                                                                    <TableCell align="center">
                                                                        <Box display="flex" justifyContent="center">
                                                                            {row?.siteName || "N/A"}
                                                                        </Box>
                                                                    </TableCell>                                                                                                                
                                                                    <TableCell align="center">
                                                                        <Box display="flex" justifyContent="center">
                                                                            {row?.productName || "N/A"}
                                                                        </Box>
                                                                    </TableCell>                                                                                                                
                                                                    <TableCell align="center">
                                                                        <Box display="flex" justifyContent="center">
                                                                            {row?.categoryName || "N/A"}
                                                                        </Box>
                                                                    </TableCell>                                                                                                                
                                                                    <TableCell align="center">
                                                                        <Box display="flex" justifyContent="center">
                                                                            {row?.amount || "N/A"}
                                                                        </Box>
                                                                    </TableCell>                                                                                                                
                                                                    <TableCell align="center">
                                                                        <Box display="flex" justifyContent="center">
                                                                            {row?.frequency || "N/A"}
                                                                        </Box>
                                                                    </TableCell>                                                                                                                
                                                                    <TableCell align="center">
                                                                        <Box display="flex" justifyContent="center">
                                                                            {row?.typeDuration || "N/A"}
                                                                        </Box>
                                                                    </TableCell>                                                                                                                
                                                                    <TableCell align="center">
                                                                        <Box display="flex" justifyContent="center">
                                                                            {row?.duration || "N/A"}
                                                                        </Box>
                                                                    </TableCell>                                                                                                                
                                                                    <TableCell align="center">
                                                                        <Tooltip title={t("Plan.tooltip.product.edit")}>
                                                                            <IconButton onClick={() => setAddConfig(true)}>
                                                                                <EditOutlinedIcon sx={{ color: "#4073FF" }} />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                        <Tooltip title={t("Plan.tooltip.product.delete")}>
                                                                            <IconButton onClick={() => handleMenuDeleteRow(index)}>
                                                                                <DeleteOutlineOutlinedIcon sx={{ color: "#EF5350" }} />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </TableCell>
                                                                </TableRow>
                                                            </>
                                                        ))}                                       
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </>
                                    )}
                                </CustomTabPanel>

                                {descriptionTypeUser === "Suscrito" && (
                                    <CustomTabPanel value={value} index={1}>
                                        {tableTasbData?.rates?.length > 0 && (
                                            <>
                                                <TableContainer component={Paper} sx={{ backgroundColor: "transparent", width: "100%", boxShadow: "none", height: "100%", maxHeight: "35vh" }}>
                                                    <Table style={{ borderColor: "transparent", height: "100%" }}>
                                                        <TableHead style={{ backgroundColor: "#7FA1FF", position: "sticky", top: 0, zIndex: 1}}>
                                                            <TableRow>
                                                                {headersRate.map((header) => (
                                                                    <TableCell key={header}>{t(header)}</TableCell>
                                                                ))}                                                    
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {tableTasbData?.rates.map((row, index) => (
                                                                <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? "#F3F3F3" : "#FFFFFF", borderBottom: "none" }}>                                                                
                                                                    <TableCell align="center">
                                                                        <Box display="flex">
                                                                            {row.duration} {row.time}
                                                                        </Box>
                                                                    </TableCell>                                                        
                                                                    <TableCell align="center">
                                                                        <Box display="flex" justifyContent="center">
                                                                            {row.rate ? `$ ${row.rate}` : "N/A"}
                                                                        </Box>
                                                                    </TableCell>                                                        
                                                                    <TableCell align="center">
                                                                        <Box display="flex" justifyContent="center">
                                                                            {row.rate_renewal ? `$ ${row.rate_renewal}` : "N/A"}
                                                                        </Box>
                                                                    </TableCell>                                                        
                                                                    <TableCell align="center">
                                                                        <Box display="flex" justifyContent="center">
                                                                            {row.rate_special ? `$ ${row.rate_special}` : "N/A"}
                                                                        </Box>
                                                                    </TableCell>                                                        
                                                                    <TableCell align="center">
                                                                        <Box display="flex" justifyContent="center">
                                                                            {row.rate_special_renewal ? `$ ${row.rate_special_renewal}` : "N/A"}
                                                                        </Box>
                                                                    </TableCell>                                                        
                                                                    <TableCell align="center">
                                                                        <Box display="flex" justifyContent="center">
                                                                            {`${row.date_start || "N/A"} - ${row.date_end || "N/A"}`}
                                                                        </Box>
                                                                    </TableCell>                                                        
                                                                    <TableCell align="center">
                                                                        <Tooltip title={t("Plan.tooltip.rate.edit")}>
                                                                            <IconButton onClick={() => setAddConfig(true)}>
                                                                                <EditOutlinedIcon sx={{ color: "#4073FF" }} />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                        <Tooltip title={t("Plan.tooltip.rate.delete")}>
                                                                            <IconButton onClick={() => handleMenuDeleteRates(index)}>
                                                                                <DeleteOutlineOutlinedIcon sx={{ color: "#EF5350" }} />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}                                       
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </>
                                        )}
                                    </CustomTabPanel>   
                                )}                             
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
                                <ButtonRegister onClick={handleAddConfig}> 
                                    <SaveOutlinedIcon style={{ width: 24, height: 24, color: "#ffff"}}  /> 
                                    <span>{t("Plan.newPlan.configuration.button.add")}</span>
                                </ButtonRegister>
                                <DescriptionConfiguration>
                                    {t("Plan.newPlan.configuration.description")}
                                </DescriptionConfiguration>
                            </Box>
                        )}
                    </Container>
                </FormContainer>
            </Form>
            {addConfig &&
                <ProductSelectionModal
                    data={tableTasbData}
                    openModal={addConfig}
                    setData={setTableTasbData}
                    setOpenModal={closeModal}
                    typeUser={descriptionTypeUser}
                />
            }
        </div>
    );
};
export default EditPlan;