/* eslint-disable react-hooks/exhaustive-deps */
// ReactJS
import { useTranslation } from "react-i18next";
import React, { ChangeEvent, Fragment, useEffect, useState } from "react";

// MUI
import { Box, IconButton, InputLabel, MenuItem, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import Select from "@mui/material/Select";

// Alert
import Swal from "sweetalert2";

// Components
import BreadCrumb from "../BreadCrumb";
import ConfigCategoryProduct from "../ConfigCategoryProduct/ConfigCategoryProduct";
import ConfigRate from "../ConfigRate/index";
import SelectWithClear from "../SelectWithClear";

// Services
import { getCategories, getProducts } from "../../../../service/products/products.service";
import { getListSites } from "../../../../service/sites/sites.service";

// Styles
import { AcceptButton, CancelButton } from "../../../../pages/plans/styled";
import { ButtonsContainer, DataGridContainer, GridAndButtonsContainer, GridContainer, InputsContainer, InputsSearchContainer, MainContainerModal, MainTextContainer, MainTextContent, MainTextTittle, ModalHeader, ModalTittle, ModalTittleText, MsjNoData } from "./ProductSelectionModal.style";
import { SearchProduct } from "./ProductSelectionModal.material.style";

export interface ModalProps {
    data: any;
    openModal: boolean;
    setOpenModal: (openModal: boolean) => void;
    typeUser: string;
    setData: (data: any) => void;
}
 

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

const ProductSelectionModal: React.FC<ModalProps> = ({ data, openModal, setOpenModal, typeUser, setData }) => {
    // Translation
    const { t } = useTranslation();
    // States
    const [addNewProduct, setAddNewProduct] = useState(false);
    const [addNewRate, setAddNewRate] = useState(false);
    const [hasIndefiniteDuration, setHasIndefiniteDuration] = useState(false);
    
    const [categoryToSearch, setCategoryToSearch] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [siteToSearch, setSiteToSearch] = useState(0);
    
    const [dataCategories, setDataCategories] = useState<any[]>([]);
    const [dataSites, setDataSites] = useState<any[]>([]);
    const [/* listOfProducts */, setListOfProducts] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [step, setStep] = useState<any[]>(() => {
        if (typeUser === "Suscrito") {
            return [
                {
                    title: "Plan.newPlan.tab.products",
                    status: "active",
                    key: "products"
                },
                {
                    title: "Plan.newPlan.tab.rates",
                    status: "disabled",
                    key: "rates"
                }
            ];
        }

        return [
            {
                title: "Plan.newPlan.tab.products",
                status: "active",
                key: "products"
            },
        ];
    });
    const [tableData, setTableData] = useState<Array<{
        Sitio: any,
        Productos: any,
        "Categoría de Acceso": number,
        Cantidad: number,
        Frecuencia: number,
        Duración: number
    }>>(data.products);

    const [dataToEdit, setDataToEdit] = useState({
        idSitio: -1,
        idProduct: -1,
    });

    const [currentStep, setCurrentStep] = useState<any>({
        title: "Productos",
        status: "active",
        key: "products"
    });

    const [productToSearch, setProductToSearch] = useState("");

    const [tableRate, setTableRate] = useState<any[]>(data.rates);
    const [editRate, setEditRate] = useState<any>(null);

    // Constants
    const totalPages = Math.ceil(tableData.length / pageSize);

    // Functions
    const handlePageSizeChange = (event: any) => {
        setPageSize(event.target.value);
    };

    const handleDataSitesSelect = () => {
        getListSites((result: any) => {
            if (result.status == 200) {
                setDataSites(result.data);
            }
        });
    };

    const handleDataCategorySelect = () => {
        getCategories(siteToSearch || 0)
            .then((res) => {         
                setDataCategories(res?.data?.category);       
            })
            .catch((err : any) => console.log(err));
    };

    const handleDataProductsList = () => {
        getProducts()
            .then((res) => {
                const filteredProducts = res?.data.filter((product: any) => {
                    return product.name.toLowerCase().includes(productToSearch.toLowerCase());
                }).map((product: any) => product.idProduct);
                setListOfProducts(filteredProducts);
            })
            .catch((err : any) => console.log(err));
    };

    const filteredData = products.map((category) => {
        return {
            Sitio: category.siteName,
            Productos: category.productName,
            "Categoría de Acceso": category.categoryName,
            Cantidad: category.amount,
            Frecuencia: category.frequency,
            "Tipo de duración": category.typeDuration,
            Duración: category.duration,
        };
    });

    const handleClose = () => {      
        Swal.fire({
            title: t("Alert.cancel.plan.title"),
            text: t("Alert.cancel.plan.text"),
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#4073FF",
            cancelButtonColor: "#EF5350",
            confirmButtonText: t("Alert.button.confirm"),
            cancelButtonText: t("Alert.button.cancel"),
            customClass: {
                container: "my-swal-container",
            },
        }).then((result) => {            
            if (result.isConfirmed) {
                setOpenModal(false);
                // Swal.fire(t("Plan.newPlan.swal.confirm"), t("Plan.newPlan.swal.html"), "success");
            }
        });
    };

    const handleConfirm = () => {
        // navigate(-1);
        if (currentStep.key === "rates") {
            setData({
                products: products,
                rates: tableRate,
            });
            Swal.fire({
                title: t("Plan.newPlan.swal.configRates"),
                confirmButtonText: t("Alert.button.confirm"),
                icon: "success",
                allowOutsideClick: false,
                customClass: {
                    container: "my-swal-container",
                },
            });
            setOpenModal(false);
        }else if(typeUser != "Suscrito"){
            setData({
                products: products,
                rates: [],
            });

            Swal.fire({
                title: t("Plan.newPlan.swal.configProducts"),
                confirmButtonText: t("Alert.button.confirm"),
                icon: "success",
                allowOutsideClick: false,
                customClass: {
                    container: "my-swal-container",
                },
            });

            setOpenModal(false);
        }else{

            Swal.fire({
                title: t("Plan.newPlan.swal.configProducts"),
                confirmButtonText:t("Alert.button.confirm"),
                icon: "success",
                allowOutsideClick: false,
                customClass: {
                    container: "my-swal-container",
                },
            });
        }

        
        const DEFAUTL_TYPE_USER = () => {
            setStep([
                {
                    title: "Plan.newPlan.tab.products",
                    status: "success",
                    key: "products"
                },
                {
                    title: "Plan.newPlan.tab.rates",
                    status: "active",
                    key: "rates"
                }
            ]);
            setCurrentStep({
                title: "Plan.newPlan.tab.rates",
                status: "active",
                key: "rates"
            });
        };

        const NEXT_STEP: any = {
            Anónimo: () => {
                setStep([
                    {
                        title: "Plan.newPlan.tab.products",
                        status: "success",
                        key: "products"
                    },
                ]);
                setCurrentStep({
                    title: "Plan.newPlan.tab.products",
                    status: "success",
                    key: "products"
                });

                setOpenModal(false);
            },
            "Registrado sin pago": () => {
                setStep([
                    {
                        title: "Plan.newPlan.tab.products",
                        status: "success",
                        key: "products"
                    },
                ]);
                setCurrentStep({
                    title: "Plan.newPlan.tab.products",
                    status: "success",
                    key: "products"
                });

                setOpenModal(false);
            },
            Suscrito: () => {
                setStep([
                    {
                        title:  "Plan.newPlan.tab.products",
                        status: "success",
                        key: "products"
                    },
                    {
                        title: "Plan.newPlan.tab.rates",
                        status: "active",
                        key: "rates"
                    }
                ]);
                setCurrentStep({
                    title: "Plan.newPlan.tab.rates",
                    status: "active",
                    key: "rates"
                });
            },
        };
        
        
        return NEXT_STEP[typeUser]() || DEFAUTL_TYPE_USER();


        
    };

    const handleSiteSelected = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedValue = event.target.value;
        const numericValue = parseInt(selectedValue, 10);
        setSiteToSearch(numericValue);
    };    

    const handleCategorySelected = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedValue = event.target.value;
        const numericValue = parseInt(selectedValue, 10);
        setCategoryToSearch(numericValue);
    };
    
    const handleProductSelected = (event: ChangeEvent<HTMLInputElement>) => {
        setProductToSearch(event.target.value);
    };

    const handleMenuDeleteRow = (index: number) => {
        const aux = [...tableData];
        aux.splice(index, 1);
        setTableData(aux);
        const auxProducts = [...products];
        auxProducts.splice(index, 1);
        setProducts(auxProducts);
    };

    const handleEditRate = (rate: any, index: number) => {
        setEditRate({ ...rate, index: index });
        setAddNewRate(true);
    };

    const handleDeleteRate = (index: number) => {
        const aux = [...tableRate];
        aux.splice(index, 1);
        setTableRate(aux);
    };

    const handleMenuEditSite = (index: number) => {
        const dataToSend = products[index];
        const idSitioEdit = dataToSend.sites;
        const idProductEdit = dataToSend.idProduct;

        setDataToEdit({
            idSitio: idSitioEdit,
            idProduct: idProductEdit,
        });
        handleAddProduct();
    };

    const handleAddProduct = () => {
        setAddNewProduct(true);
    };

    const handleAddRate = () => {
        setEditRate(null);
        setAddNewRate(true);
    };

    // Effects
    useEffect(() => {
        handleDataSitesSelect();
        (data?.products?.length > 0) ? (setTableData(data?.products), setProducts(data?.products))  : setTableData(filteredData);
        setDataToEdit({ idSitio: -1, idProduct: -1 });
    }, []);

    useEffect(() => {
        const indefiniteDuration = tableRate.some((rate) => rate.time === "Indefinido");
        
        setHasIndefiniteDuration(indefiniteDuration);
    }, [tableRate]);

    useEffect(() => {
        handleDataProductsList();
    }, [productToSearch]);

    useEffect(() => {
        handleDataCategorySelect();
        setCategoryToSearch(0);
    }, [siteToSearch]);

    useEffect(() => {        
        const filteredDataTable = products.filter((category) => {
            const siteMatch = siteToSearch === 0 || category.sites === siteToSearch;
            const productMatch = productToSearch === "" || category.productName.toLowerCase().includes(productToSearch.toLowerCase());
            const categoryMatch = categoryToSearch === 0 || category.idCategory === categoryToSearch;
    
            return siteMatch && productMatch && categoryMatch;
        });
        const typedData = filteredDataTable.map((category) => {
            return {
                Sitio: category.siteName,
                Productos: category.productName,
                "Categoría de Acceso": category.categoryName,
                Cantidad: category.amount,
                Frecuencia: category.frequency,
                "Tipo de duración": category.typeDuration,
                Duración: category.duration,
            };
        });

        (data?.products?.length > 0) ? setTableData(data?.products) : setTableData(typedData);

    }, [siteToSearch, categoryToSearch, productToSearch]);
    
    useEffect(() => {
        setTableData(filteredData);
    }, [products]); 
    
    return (
        <Fragment>
            <Modal open={openModal} onClose={handleClose}>
                <MainContainerModal>
                    <ModalHeader>
                        <ModalTittle>
                            <NoteAddOutlinedIcon sx={{ height: 32, color: "#0045FF" }} />
                            <ModalTittleText>{t("Plan.newPlan.modal.title")}</ModalTittleText>
                        </ModalTittle>           
                    </ModalHeader>

                    <BreadCrumb breadCrumb={step}/>
                    
                    {currentStep.key === "products" && currentStep.status === "active" && (
                        <>
                            <MainTextContainer>
                                <MainTextTittle>{t("Plan.newPlan.tab.products")}</MainTextTittle>
                                <MainTextContent>
                                    {t("Plan.newPlan.modal.descriptionProduct")}
                                </MainTextContent>
                            </MainTextContainer>

                            <InputsContainer>
                                <AcceptButton style={{ maxWidth: "none", width: "220px" }} onClick={handleAddProduct}>
                                    <AddIcon sx={{ color: "#FFFFFF", height: 20 }} />
                                    {t("Plan.newPlan.modal.addProduct")}
                                </AcceptButton>
                                <InputsSearchContainer>
                                    <SearchProduct
                                        id="productToSearch"
                                        label={t("Plan.newPlan.modal.searchProduct")}
                                        name="productToSearch"
                                        onChange={handleProductSelected}
                                        placeholder={t("Plan.newPlan.modal.searchProduct.placeholder")}
                                        sx={{ width: "100%" }}
                                        value={productToSearch}
                                    >
                                    </SearchProduct>
                                    {dataSites &&
                                        <SelectWithClear
                                            data={dataSites}
                                            dataIdKey="idSite"
                                            dataNameKey="name"
                                            label={t("Plan.newPlan.modal.searchSite")}
                                            onChange={handleSiteSelected}
                                            onClear={() => setSiteToSearch(0)}
                                            style={{ width: "100%" }}
                                            value={siteToSearch}
                                        />
                                    }
                                    {((dataCategories !== null) && (siteToSearch !== 0)) && 
                                        <SelectWithClear
                                            data={dataCategories}
                                            dataIdKey="idCategory"
                                            dataNameKey="name"
                                            label={t("Plan.newPlan.modal.searchCategory")}
                                            onChange={handleCategorySelected}
                                            onClear={() => setCategoryToSearch(0)}
                                            style={{ width: "100%" }}
                                            value={categoryToSearch}
                                        />
                                    }
                                </InputsSearchContainer>
                            </InputsContainer>

                            <GridAndButtonsContainer>
                                <GridContainer>
                                    {tableData.length > 0 ? (
                                        <Fragment>
                                            <TableContainer  component={Paper} sx={{ backgroundColor: "transparent", width: "100%", boxShadow: "none", height: "100%", maxHeight: "30vh" }}>
                                                <Table style={{ borderColor: "transparent", height: "100%" }}>
                                                    <TableHead style={{ backgroundColor: "#7FA1FF", position: "sticky", top: 0, zIndex: 1 }}>
                                                        <TableRow style={{lineHeight: "unset !important", padding: "8px !important"}} >
                                                            {headersProduct.map((header) => (
                                                                <TableCell key={header}>{t(header)}</TableCell>
                                                            ))} 
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody >
                                                        {tableData.map((row, index) => (
                                                            <TableRow key={index}  sx={{ backgroundColor: index % 2 === 0 ? "#F3F3F3" : "#FFFFFF", borderBottom: "none", lineHeight: "unset", padding: "8px"}}>
                                                                {row.Sitio && Object.values(row).map((value, index) => (
                                                                    <TableCell style={{
                                                                        lineHeight: "unset",
                                                                        padding: "8px"}} key={index}>
                                                                        <Box display="flex" alignItems="center">
                                                                            {value}
                                                                        </Box>
                                                                    </TableCell>
                                                                ))}
                                                                <TableCell
                                                                    /* style={{
                                                                        alignItems: "center",
                                                                        display: "flex",
                                                                        flexDirection: "row",
                                                                        lineHeight: "unset",
                                                                        padding: "8px"
                                                                    }} */
                                                                    key={row.Sitio + row.Productos}
                                                                >
                                                                    <Tooltip title={t("Plan.tooltip.product.edit")}>
                                                                        <IconButton onClick={() => handleMenuEditSite(index)}>
                                                                            <EditOutlinedIcon sx={{ color: "#4073FF" }} />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                    <Tooltip title={t("Plan.tooltip.product.delete")}>
                                                                        <IconButton onClick={() => handleMenuDeleteRow(index)}>
                                                                            <DeleteOutlineOutlinedIcon sx={{ color: "#EF5350" }}/>
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                            <DataGridContainer>
                                                <Box
                                                    sx={{
                                                        marginLeft: "15px",
                                                        display: "flex",
                                                    }}
                                                >
                                                    <Typography variant="body2" component="div" sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                    }}>
                                                        {Math.min((currentPage - 1) * pageSize + 1, tableData.length) } -{" "}
                                                        {Math.min(currentPage * pageSize, tableData.length)} de{" "}
                                                        {tableData.length}      
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        flexDirection: "row",

                                                        marginRight: "15px",
                                                    }}
                                                >
                                                    <InputLabel>Fila por página</InputLabel>
                                                    <Select
                                                        value={pageSize}
                                                        onChange={handlePageSizeChange}
                                                        label="Tamaño de página"
                                                        className="noBorder"
                                                    >
                                                        <MenuItem value={10}>10</MenuItem>
                                                        <MenuItem value={20}>20</MenuItem>
                                                        <MenuItem value={50}>50</MenuItem>
                                                    </Select>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            flexDireaction: "row",
                                                        }}
                                                    >
                                                        <IconButton
                                                            disabled={currentPage === 1}
                                                            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                                                        >
                                                            <NavigateBefore />
                                                        </IconButton>
                                                        <Typography variant="body2" component="div">
                                                            {currentPage} / {(totalPages === 0) ? 1 : totalPages}
                                                        </Typography>
                                                        <IconButton
                                                            disabled={(currentPage === totalPages) || (totalPages === 0)}
                                                            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                                                        >
                                                            <NavigateNext />
                                                        </IconButton>
                                                    </Box>
                                                </Box>
                                            </DataGridContainer>
                                        </Fragment>

                                    ) : (
                                        <MsjNoData>{products.length == 0  ? t("Plan.newPlan.modal.noProducts") : t("Plan.newPlan.modal.empty")}</MsjNoData>
                                    )}                                    
                                </GridContainer>
                            </GridAndButtonsContainer>
                        </>
                    )}

                    {currentStep.key === "rates" && currentStep.status === "active" && typeUser === "Suscrito" && (
                        <Fragment>
                            <MainTextContainer>
                                <MainTextTittle>{t("Plan.newPlan.tab.rates")}</MainTextTittle>
                                <MainTextContent>
                                    {t("Plan.newPlan.modal.descriptionRate")}
                                </MainTextContent>
                            </MainTextContainer>

                            <AcceptButton sx={{ maxWidth: "none", width: "260px", height: "40px" }} onClick={handleAddRate} disabled={hasIndefiniteDuration}>
                                <AddIcon sx={{ color: "#FFFFFF", height: 20 }} />
                                {t("Plan.newPlan.modal.addRate")}
                            </AcceptButton>                            

                            <GridAndButtonsContainer>
                                <GridContainer>
                                    {tableRate.length > 0 ? (
                                        <Fragment>
                                            <TableContainer component={Paper} sx={{ backgroundColor: "transparent", width: "100%", boxShadow: "none", height: "100%", maxHeight: "35vh" }}>
                                                <Table style={{ borderColor: "transparent", height: "100%" }}>
                                                    <TableHead style={{ backgroundColor: "#7FA1FF", position: "sticky", top: 0, zIndex: 1 }}>
                                                        <TableRow>
                                                            {headersRate.map((header) => (
                                                                <TableCell key={header}>{t(header)}</TableCell>
                                                            ))}                                                    
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {tableRate.map((row, index) => (
                                                            <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? "#F3F3F3" : "#FFFFFF", borderBottom: "none" }}>                                                                
                                                                <TableCell align="center">
                                                                    <Box display="flex">
                                                                        {row.duration !== 0 ? `${row.duration} ${row.time}` : row.time}
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
                                                                        <IconButton
                                                                            onClick={() => handleEditRate(row, index)}
                                                                        >
                                                                            <EditOutlinedIcon sx={{ color: "#4073FF" }} />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                    <Tooltip title={t("Plan.tooltip.rate.delete")}>
                                                                        <IconButton
                                                                            onClick={() => handleDeleteRate(index)}
                                                                        >
                                                                            <DeleteOutlineOutlinedIcon sx={{ color: "#EF5350" }} />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}                                       
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>

                                            <DataGridContainer>
                                                <Box
                                                    sx={{
                                                        marginLeft: "15px",
                                                        display: "flex",
                                                    }}
                                                >
                                                    <Typography variant="body2" component="div" sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                    }}>
                                                        {Math.min((currentPage - 1) * pageSize + 1, tableData.length) } -{" "}
                                                        {Math.min(currentPage * pageSize, tableData.length)} de{" "}
                                                        {tableData.length}      
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        flexDirection: "row",

                                                        marginRight: "15px",
                                                    }}
                                                >
                                                    <InputLabel>Fila por página</InputLabel>
                                                    <Select
                                                        value={pageSize}
                                                        onChange={handlePageSizeChange}
                                                        label="Tamaño de página"
                                                        className="noBorder"
                                                    >
                                                        <MenuItem value={10}>10</MenuItem>
                                                        <MenuItem value={20}>20</MenuItem>
                                                        <MenuItem value={50}>50</MenuItem>
                                                    </Select>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            flexDireaction: "row",
                                                        }}
                                                    >
                                                        <IconButton
                                                            disabled={currentPage === 1}
                                                            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                                                        >
                                                            <NavigateBefore />
                                                        </IconButton>
                                                        <Typography variant="body2" component="div">
                                                            {currentPage} / {(totalPages === 0) ? 1 : totalPages}
                                                        </Typography>
                                                        <IconButton
                                                            disabled={(currentPage === totalPages) || (totalPages === 0)}
                                                            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                                                        >
                                                            <NavigateNext />
                                                        </IconButton>
                                                    </Box>
                                                </Box>
                                            </DataGridContainer>
                                        </Fragment>
                                    ) : (
                                        <MsjNoData>{products.length === 0 ? t("Plan.newPlan.modal.noRates") : t("Plan.newPlan.modal.empty")}</MsjNoData>
                                    )}

                                </GridContainer>
                            </GridAndButtonsContainer>
                        </Fragment>
                    )}

                    <ButtonsContainer>
                        <CancelButton onClick={handleClose}>{t("Plan.newPlan.modal.cancel")}</CancelButton>
                        {tableData.length > 0 && <AcceptButton onClick={handleConfirm}>{t("Plan.newPlan.modal.confirm")}</AcceptButton>}
                    </ButtonsContainer>
                </MainContainerModal>
            </Modal>

            {addNewProduct && <ConfigCategoryProduct openModal={addNewProduct} setOpenModal={setAddNewProduct} setItem={setProducts} item={products} dataToEdit={dataToEdit} setDataToEdit={setDataToEdit} />}
            
            {addNewRate && <ConfigRate openModal={addNewRate} setOpenModal={setAddNewRate} setItem={setTableRate} item={tableRate} editItem={editRate} />}
        </Fragment>
    );
};

export default ProductSelectionModal;
