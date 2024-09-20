// ReactJS
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";

// MUI
import { Checkbox, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Modal, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// Yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Service
import { getCategories, getProductsBySite, getSites } from "../../../../service/products/products.service";

// Styles
import { AcceptButton, CancelButton } from "../../../../pages/plans/styled";
import { ButtonsContainer, GridContainer, MainContainerModal, MainTextContainer, MainTextContent, MainTextTitle } from "./ConfigCategoryProduct.style";
import SelectWithClear from "../SelectWithClear";

export interface dataToEdit {
    idSitio: number;
    idProduct: number;
}
export interface ModalCategoriesProps {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
    setItem: (products: Product[]) => void;
    item: any[];
    dataToEdit?: dataToEdit ;
    setDataToEdit: (data: any) => void;
}

interface Product {
    createdAt: string;
    description: string;
    idProduct: number;
    isActive: boolean;
    name: string;
    updatedAt: string;
}

interface Site {
    createdAt: string;
    description: string;
    idSite: number;
    isActive: boolean;
    name: string;
    updatedAt: string;
}

interface Category {
    createdAt: string;
    description: string;
    idCategory: number;
    isActive: boolean;
    name: string;
    updatedAt: string;
}

const typeOfFrequency = [
    { id: 1, name: "Plan.newPlan.time.daily", value: "Diario" },
    { id: 2, name: "Plan.newPlan.time.weekly", value: "Semanal" },
    { id: 3, name: "Plan.newPlan.time.monthly", value: "Mensual" },
    { id: 4, name: "Plan.newPlan.time.yearly", value: "Anual" },
];

const typeOfDuration = [
    { id: 1, name: "Plan.newPlan.time.day", value: "Dia" },
    { id: 2, name: "Plan.newPlan.time.week", value: "Semana" },
    { id: 3, name: "Plan.newPlan.time.month", value: "Mes" },
    { id: 4, name: "Plan.newPlan.time.year", value: "Año" },
];


const ConfigCategoryProduct: React.FC<ModalCategoriesProps> = ({ openModal, setOpenModal, setItem, item, dataToEdit, setDataToEdit }) => {
    // Translations
    const { t } = useTranslation();

    // States    
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [sites, setSites] = useState<Site[]>([]);

    const [selectedProduct, setSelectedProduct] = useState<number>();
    const [selectedSite, setSelectedSite] = useState<number>();
    const rolStorage = localStorage.getItem("rolUser");
    const rolJson = rolStorage ? JSON?.parse(rolStorage) : {};

    // Yup
    const validationScheme = yup.object().shape({
        categories: yup.array().of(
            yup.object().shape({
                category: yup.string().required("Este campo es requerido"),
                amount: yup.number().required("Este campo es requerido"),
                limited: yup.boolean().required("Este campo es requerido"),
                type_of_frequency: yup.string().required("Este campo es requerido"),
                type_of_duration: yup.string().required("Este campo es requerido"),
                duration: yup.number().required("Este campo es requerido"),
            })
        ),
    });

    // useForm
    const {
        control,
        handleSubmit,
        register,
        watch,
        reset,
    } = useForm({
        resolver: yupResolver(validationScheme),
        mode: "onChange",
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "categories",
    });

    // Functions
    const onSubmit = (data: any) => {
        const refactoredData = data.categories.map((category: any) => {
            return {
                siteName: sites.filter((site) => site.idSite === selectedSite)[0].name,
                productName: products.filter((product) => product.idProduct === selectedProduct)[0]?.name ?? "Sin producto",
                categoryName: categories.filter((categoryItem) => categoryItem.idCategory === Number(category.category))[0].name,
                sites: selectedSite,
                idProduct: selectedProduct ?? undefined,
                idCategory: Number(category.category),
                duration: category.duration,
                typeDuration: category.type_of_duration,
                frequency: category.type_of_frequency,
                unlimited: category.limited,
                amount: category.limited ? 1 : category.amount,
            };
        });

        const filteredData = item.filter((item) => {
            return item.sites !== selectedSite || item.idProduct !== selectedProduct;
        });
        
        const newData = filteredData.concat(refactoredData);
        setItem(newData);
        setOpenModal(false);
        setDataToEdit({
            idSitio: -1,
            idProduct: -1,
        });
    };

    const handleAppend = useCallback(() => {
        append({
            category: "",
            amount: 1,
            limited: false,
            type_of_frequency: "",
            type_of_duration: "",
            duration: 1,
        });
    }, [append]);

    const handleRemove = useCallback(({ index }: { index: number }) => remove(index), [remove]);

    const handleClose = () => {
        setDataToEdit({
            idSitio: -1,
            idProduct: -1
        });
        setOpenModal(false);
    };    

    const handleTypesSelection = (durationType: string) => {
        const durationObject = typeOfDuration.filter((duration) => duration.value === durationType);
        if (durationObject[0] !== undefined && durationObject[0]) {
            return typeOfFrequency.filter((frequency) => frequency.id <= durationObject[0].id);
        }
        return [];
    };

    const handleCategoriesNoRepeat = (categoriesUsed: any, selectedCategoryId?: number | string) => {
        let categoriesUsedIds = categoriesUsed.map((category: any) => category.category);
        if (selectedCategoryId !== undefined) {
            const selectedIndex = categoriesUsedIds.indexOf(selectedCategoryId);
            if (selectedIndex !== -1) {
                categoriesUsedIds = categoriesUsedIds.slice(0, selectedIndex).concat(categoriesUsedIds.slice(selectedIndex + 1));
            }
        }
        const categoryToShow = categories.filter((category) => !categoriesUsedIds.includes(category.idCategory));
        return categoryToShow;
    };

    const handleSiteSelected = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedValue = event.target.value;
        const numericValue = parseInt(selectedValue, 10);
        setSelectedSite(numericValue);
    };

    const handleProductSelected = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedValue = event.target.value;
        const numericValue = parseInt(selectedValue, 10);
        setSelectedProduct(numericValue);
    };

    // Effects
    useEffect(() => {
        getSites(rolJson ? rolJson.id : "")
            .then((res: any) => {
                setSites(res?.data.data);
            })
            .catch((err: any) => console.log(err));
    }, []);

    useEffect(() => {
        if (dataToEdit && dataToEdit.idSitio > 0 && dataToEdit.idProduct) {
            setSelectedSite(dataToEdit.idSitio);
        }
    }, [dataToEdit]);

    useEffect(() => {
        if (selectedSite) {
            getProductsBySite(selectedSite)
                .then((res: any) => {      
                    setProducts(res?.data.products);
                    dataToEdit ? setSelectedProduct(dataToEdit.idProduct) : setSelectedProduct(undefined);
                })
                .catch((err: any) => console.log(err));
        }
    }, [selectedSite]);       

    useEffect(() => {
        if (selectedSite) {
            
            getCategories(selectedSite, (selectedProduct !== undefined  && selectedProduct >= 0) ? selectedProduct : undefined)
                .then((res) => {
                    setCategories(res?.data?.category);
                })
                .catch((err: any) => console.log(err));

            let filteredItems;
            if (selectedProduct) {
                filteredItems = item.filter(
                    (i) => i.sites === selectedSite && i.idProduct === selectedProduct
                );                
            } else {
                filteredItems = item.filter((i) => i.sites === selectedSite && i.idProduct === undefined);
            }

            const initialValues = filteredItems.map((config: any) => ({
                category: config.idCategory,
                amount: config.amount,
                limited: config.unlimited,
                type_of_frequency: config.frequency,
                type_of_duration: config.typeDuration,
                duration: config.duration,
            }));
            reset({ categories: initialValues });
        }

    }, [item, reset, selectedProduct, selectedSite]);


    return (
        <Modal open={openModal} onClose={handleClose}>
            <MainContainerModal>
                <MainTextContainer>
                    <MainTextTitle>{t("Plan.newPlan.modal.categories.title")}</MainTextTitle>
                    <MainTextContent>
                        {t("Plan.newPlan.modal.categories.description")}
                    </MainTextContent>
                    <div style={{ display: "flex", flexDirection: "row", gap: "24px", width: "100%" }}>
                        <SelectWithClear
                            data={sites}
                            dataIdKey="idSite"
                            dataNameKey="name"
                            label={t("Plan.newPlan.modal.searchSite")}
                            onChange={handleSiteSelected}
                            onClear={() => {setSelectedSite(0); setSelectedProduct(0); setCategories([]);}}
                            style={{ width: "30%" }}
                            value={selectedSite}
                        />
                        <SelectWithClear
                            data={products}
                            dataIdKey="idProduct"
                            dataNameKey="name"
                            label={t("Plan.newPlan.modal.searchProduct")}
                            onChange={handleProductSelected}
                            onClear={() => setSelectedProduct(0)}
                            style={{ width: "100%" }}
                            value={selectedProduct}
                        />
                    </div>
                </MainTextContainer>
                <form onSubmit={handleSubmit(onSubmit)} style={{display: "flex", flexDirection: "column", justifyContent: "space-between", width: "-webkit-fill-available" }}>
                    <GridContainer style={{marginTop: "12px", maxHeight: "45vh"}}>
                        <TableContainer component={Paper} sx={{
                            border: "1px solid rgba(0, 0, 0, 0.23)",
                            borderRadius: "5px",
                            background: "#F8F8F8",
                            color: "#0000008F", 
                            width: "100%", 
                            boxShadow: "none", 
                            height: "400px", 
                            maxHeight: "400px", 
                            overflowY: "scroll"
                        }}>
                            <Table style={{ borderColor: "transparent" }}>
                                <TableHead style={{ backgroundColor: "#7FA1FF" }}>
                                    <TableRow>
                                        <TableCell colSpan={7}>{t("Plan.newPlan.modal.categories.title")}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {fields.map((category, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                                                    <Grid item xs={2}>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="demo-simple-select-label">{t("Plan.newPlan.modal.categories.category")}</InputLabel>
                                                            <Select
                                                                {...register(`categories.${index}.category` as const)}
                                                                defaultValue={category?.category}
                                                                fullWidth
                                                                id={`categories.${index}.name`}
                                                                label={t("Plan.newPlan.modal.categories.category")}
                                                                labelId="select-name-label"
                                                                placeholder={t("Placeholders.select")}
                                                                variant="outlined"
                                                            >
                                                                {watch(`categories.${index}.category`) == "" ?
                                                                    handleCategoriesNoRepeat(watch("categories")).map((category: any) => (
                                                                        <MenuItem key={category.idCategory} value={category.idCategory}>{category.name}</MenuItem>
                                                                    )) :
                                                                    handleCategoriesNoRepeat(watch("categories"), watch(`categories.${index}.category`)).map(category => (
                                                                        <MenuItem key={category.idCategory} value={category.idCategory}>
                                                                            {category.name}
                                                                        </MenuItem>
                                                                    ))
                                                                }
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={1}>
                                                        <TextField
                                                            {...register(`categories.${index}.amount` as const)}
                                                            defaultValue={category?.amount}
                                                            fullWidth
                                                            id={`categories.${index}.amount`}
                                                            inputProps={{ inputMode: "numeric", min: 1 }}
                                                            label={t("Plan.newPlan.modal.categories.amount")}
                                                            type="number"
                                                            variant="outlined"
                                                            value={watch(`categories.${index}.limited`) ? 1 : undefined}
                                                            disabled={watch(`categories.${index}.limited`)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    {...register(`categories.${index}.limited` as const)}
                                                                    color="primary"
                                                                    defaultChecked={category?.limited}
                                                                    id={`categories.${index}.limited`}
                                                                    name={`categories.${index}.limited`}
                                                                />
                                                            }
                                                            label={t("Plan.newPlan.modal.categories.limited")}
                                                        />
                                                    </Grid>
                                                    <Divider orientation="vertical" flexItem />
                                                    <Grid item xs={2}>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="demo-simple-select-label">{t("Plan.newPlan.modal.categories.typeDuration")}</InputLabel>
                                                            <Select
                                                                {...register(`categories.${index}.type_of_duration` as const)}
                                                                defaultValue={category?.type_of_duration}
                                                                fullWidth
                                                                id={`categories.${index}.type_of_duration`}
                                                                label={t("Plan.newPlan.modal.categories.typeDuration")}
                                                                labelId="select-site-label"
                                                                placeholder={t("Placeholders.select")}
                                                                variant="outlined"
                                                            >
                                                                {typeOfDuration.map((duration) => (
                                                                    <MenuItem key={duration.id} value={duration.value}>{t(duration.name)}</MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={1}>
                                                        <TextField
                                                            {...register(`categories.${index}.duration` as const)}
                                                            defaultValue={category?.duration}
                                                            fullWidth
                                                            id={`categories.${index}.duration`}
                                                            inputProps={{ inputMode: "numeric", min: 1 }}
                                                            label={t("Plan.newPlan.modal.categories.duration")}
                                                            type="number"
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="demo-simple-select-label">{t("Plan.newPlan.modal.categories.typeFrequency")}</InputLabel>
                                                            <Select
                                                                {...register(`categories.${index}.type_of_frequency` as const)}
                                                                defaultValue={category?.type_of_frequency}
                                                                fullWidth
                                                                id={`categories.${index}.type_of_frequency`}
                                                                label={t("Plan.newPlan.modal.categories.typeFrequency")}
                                                                labelId="select-site-label"
                                                                placeholder={t("Placeholders.select")}
                                                                variant="outlined"
                                                            >
                                                                {watch(`categories.${index}.type_of_duration`) ? handleTypesSelection(watch(`categories.${index}.type_of_duration`)).map((frequency) => (
                                                                    <MenuItem key={frequency.id} value={frequency.value}>{t(frequency.name)}</MenuItem>
                                                                )) : null}
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={1} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                        <Tooltip title={t("Plan.tooltip.category.delete")}>
                                                            <DeleteOutlineIcon
                                                                onClick={() => handleRemove({ index: index })}
                                                                sx={{ color: "red", cursor: "pointer" }}
                                                            />
                                                        </Tooltip>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell colSpan={7} onClick={handleAppend} style={{ cursor: "pointer" }}>
                                            <MainTextTitle>+ {t("Plan.newPlan.modal.categories.addCategory")}</MainTextTitle>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </GridContainer>
                    
                    <ButtonsContainer>
                        <CancelButton onClick={handleClose}>{t("Plan.newPlan.modal.cancel")}</CancelButton>
                        {selectedSite && (
                            <AcceptButton type="submit">{t("Plan.newPlan.modal.confirm")}</AcceptButton>
                        )}
                    </ButtonsContainer>
                </form>
            </MainContainerModal>
        </Modal>
    );
};


export default ConfigCategoryProduct;