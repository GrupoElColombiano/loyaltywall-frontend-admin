// ReactJS
import { useCallback, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

// MUI
import { Checkbox, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Modal, Paper, Select, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Tooltip, Typography } from "@mui/material";

// Shared
import { BtnPrimary, BtnSecondary } from "../../../shared/components/Buttons";

// Components
import SelectWithClear from "../../../main/adapters/primary/SelectWithClear";

// Services
import { getProductsBySite } from "../../../service/products";

// Yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Services
import { getCategories } from "../../../service/categories";

// External Dependences
import Swal from "sweetalert2";

// Icons
import { CategoryOutlined, DeleteOutline, Inventory2Outlined } from "@mui/icons-material";

// Styled
import { SectionContainer, ModalContainer, BtnContainer, GridContainer, MainTextTitle } from "./styled";

import { setProductCategoriesPlan } from "../../../service/plans";


interface ICategory {
    createdAt: string;
    description: string;
    idCategory: number;
    isActive: boolean;
    name: string;
    updatedAt: string;
}

interface TypeUser {
    code: string;
    label: string;
}
//   handleRefresh: () => void
export default function ModalPlanProducts({ editData, modal, setModal, planId, handleRefresh, name, description, setPlanId }: IModalDataProps) {
    // Translation
    const { t } = useTranslation();

    const [currentPlanId, setCurrentPlanId] = useState(planId || null);

    useEffect(() => {
        setCurrentPlanId(planId!);
    }, [planId]);


    // LocalStorage
    const siteStorage = JSON.parse(localStorage.getItem("siteUser") || "{}"); 

    // States
    const [categories, setCategories] = useState<ICategory[]>([]);
    // const [products, setProducts] = useState<IOption[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    // const [fields, setFields] = useState<Category[]>([]);

    const [selectedProduct, setSelectedProduct] = useState(editData?.product?.idProduct || 0);

    // Yup
    const validationScheme = yup.object().shape({
        categories: yup.array().of(
            yup.object().shape({
                amount: yup.number().required("Este campo es requerido"),
                category: yup.string().required("Este campo es requerido"),
                duration: yup.number().required("Este campo es requerido"),
                limited: yup.boolean().required("Este campo es requerido"),
            })
        ),
    });

    // useForm
    const {
        control,
        // handleSubmit,
        register,
        reset,
        watch
    } = useForm({
        defaultValues: {
            categories: editData?.categories?.map((item: any) => {
                return {
                    amount: item?.amount,
                    category: item?.idCategory,
                    duration: item?.duration,
                    limited: item?.limited,
                };
            }) || [],
        },
        mode: "all",
        resolver: yupResolver(validationScheme),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "categories",
    });

    useEffect(() => {
        remove();
    }, [modal?.open]);
    

    // useEffect(() => {
    //     if (fieldsArray.length > 0) {
    //         setFields(fieldsArray);
    //     }
    // }, [fieldsArray]);

    const { state } = useLocation();
    
    const listTypeUsers: readonly TypeUser[] = [
        { code: "1", label: "Suscrito" },
        { code: "2", label: "Anónimo" },
        { code: "3", label: "Registrado sin pago" }
    ];
    console.log("::: state :::", state);

    console.log(":::: listTypeUsers :::: ", listTypeUsers);
    const onSubmit2 = () => {
        // Tu lógica aquí //
        // handleSubmit(onSubmit);
        // handleClose(); 
     
        setProductCategoriesPlan({
            productId: selectedProduct, 
            planId: currentPlanId,  
            categories: fields,
            idSite: siteStorage?.idSite,
            name: name,
            description: description,
            userType: listTypeUsers[parseInt(state?.typeOfUser) - 1].label,
        })
            .then((response) => {
            console.log("🚀 ~ .then ~ response:", response)

                // console.log(" EL RESPONSE ES ", response    );

                if(response.status == 201){
                    handleClose();  
                    setCurrentPlanId(response.data.planId);
                    if (setPlanId) {
                        setPlanId(response.data.planId); // Actualizar el estado del planId en el componente padre
                    }
                    // console.log(" responseHHAHAHA ", response.data );
                    // console.log(" planId:::: ", currentPlanId);
                    // console.log("🔥", response.data.alreadyLinkedCategories.length);
                    if(response.data.alreadyLinkedCategories.length > 0){
                        // console.log(" ESTO AQUI QUE FUE ", response);
                        
                        const categoryNames = response.data.alreadyLinkedCategories.map((categoryAccess: { category: { name: any; }; }) => categoryAccess.category.name).join(", ");
                        Swal.fire({
                            confirmButtonColor: "#0045FF",
                            confirmButtonText: t("Alert.button.confirm"),
                            icon: "warning",
                            title: "Las siguientes categorías ya están vinculadas al producto:",
                            text: categoryNames
                        });
                    }else{
                        Swal.fire({
                            confirmButtonColor: "#0045FF",
                            confirmButtonText: t("Alert.button.confirm"),
                            icon: "success",
                            text: response.statusText,
                            title: response.statusText// t("Alert.error.title"),
                        });
                    }
                    
                }
               
            })
            .catch(error => {
               
                Swal.fire({
                    confirmButtonColor: "#0045FF",
                    confirmButtonText: t("Alert.button.confirm"),
                    icon: "error",
                    text: error,
                    title: t("Alert.error.title"),
                });
            })
            .finally(() => {
                // console.log("HOLA MUNDO Finally ");
            });
    };

    const handleAppend = useCallback(() => {
        append({
            category: "",
            amount: 1,
            limited: false,
            duration: 1,
        });
    }, [append]);

    const handleRemove = useCallback(({ index }: { index: number }) => remove(index), [remove]);

    const handleClose = () => {
        reset();
        handleRefresh && handleRefresh(); // Verificación de nulidad
        setSelectedProduct(0);

        fields.forEach((_, index) => remove(index));
        
        setModal({
            ...modal,
            open: false
        });
    }; 

    const handleNotRepeat = (categories: ICategory[], index: number) => {
        const newCategories = categories?.filter((category: ICategory) => {
            return !fields?.some((item: any) => item?.category === category?.idCategory && item?.category !== fields[index]?.category);
        });

        return newCategories;   
    };
    
    const disabledButton = () => {
        const disabled = modal.data.some((item: any) => {
            return item.categories.some((category: any) => {
                return watch("categories")?.some((watchCategory: any) => {
                    return watchCategory.category === category.idCategory;
                });
            });
        });

        return disabled;
    };    
    
    // Effects
    useEffect(() => {
        console.log("=== useEffect ===", siteStorage);
        getProductsBySite(siteStorage?.idSite)
            .then((res) => {    
                console.log("💊", res.data?.products);
                if (modal?.data?.length > 0) {                    
                    const newProducts = res.data?.products.filter((item: IProductsBody) => item.all_product !== true).map((item: IProductsBody) => {
                        return {
                            ...item,
                            value: item.idProduct,
                            label: item.name
                        };
                    });
                    setProducts(newProducts);

                    return;
                }

                const newProducts = res.data?.products.map((item: IProductsBody) => {
                    return {
                        ...item,
                        value: item.idProduct,
                        label: item.name
                    };
                });
                setProducts(newProducts);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [siteStorage?.idSite, modal?.data?.length]);
    const productInfo = products.find(product => product.idProduct === selectedProduct);
    console.log("🚀 ~ useEffect ~ productInfo:", productInfo)
    useEffect(() => {
        console.log("✅", selectedProduct, siteStorage?.idSite)
        const fetchAllCategories = async () => {
            const productsWithoutAllProducts = products.filter(productInfo => !productInfo.all_product);
            const allCategoriesAvailable = await productsWithoutAllProducts.reduce(async (acc, productInfo) => {
                let temporalAcc = await acc;
                return await getCategories("", 0, 0, productInfo.idProduct, siteStorage?.idSite).then(response => {
                    const newCategories = response?.data?.data;
                    if (newCategories?.length > 0) {
                        console.log("🚀 ~ returnawaitgetCategories ~ newCategories:", newCategories)
                        console.log({ temporalAcc })
                        // return [...temporalAcc, newCategories];
                        return temporalAcc.concat(newCategories);
                    }
                    return acc;
                })
                .catch(error => console.log("ERROR", error));
            }, []);
            console.log("🚀 :::: allCategoriesAvailable :::: 🚀 ", allCategoriesAvailable);
            // setCategories(allCategoriesAvailable);
            allCategoriesAvailable.forEach((element:any) => {
                append({
                    category: element?.idCategory,
                    amount: 1,
                    limited: false,
                    duration: 1,
                });
            });
        };
        console.log("🧯", {fields});
        if (productInfo?.all_product) {
            console.log("🧯 Todos los productos 🧯")
            fetchAllCategories();
        }else {
            console.log("🧯 Un sólo producto 🧯")
            getCategories("", 0, 0, selectedProduct, siteStorage?.idSite)
                .then((res) => {  
                    console.log("✅", res);              
                    setCategories(res?.data?.data);
                })
                .catch((err) => console.log(err));
        }
    }, [siteStorage?.idSite, selectedProduct]); 

    // console.log("EditData: ", editData);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = event.target;
        fields[index].category = String(value);
    };


    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = event.target;
        fields[index].amount = Number(value);
    };
    
    const handleLimitedChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { checked } = event.target;
        fields[index].limited = checked;
    };

    const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = event.target;
        fields[index].duration = Number(value);
    };
    const selectedProductInfo = products?.find(p => p.idProduct === selectedProduct) || null;
    console.log("🔥 selectedProductInfo 🔥", selectedProductInfo);
    console.log("++ products ++", products);
    console.log("💊 💊", !(categories?.length === fields.length && productInfo?.all_product))
    return (
        <Modal
            aria-describedby="modal-modal-description"
            aria-labelledby="modal-modal-title"
            onClose={handleClose}
            open={modal.open}
            id="modal-plan-products"
        >
            <ModalContainer>
                <SectionContainer>
                    <Typography variant="body1" component="h3" sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Inventory2Outlined sx={{ color: "#0045FF", fontSize: 25 }} />
                        {t("Plan.new.products")}
                    </Typography>

                    <Typography variant="body1" component="span">
                        {t("Plan.new.product.modal.description")}
                    </Typography>

                    <SelectWithClear
                        data={products}
                        dataIdKey="value"
                        dataNameKey="label"
                        label={t("Constants.label.product")}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setSelectedProduct(e.target.value as unknown as number);
                            // setFields([]);
                            remove();
                        }}
                        onClear={() => setSelectedProduct(0)}
                        style={{ width: "50%", backgroundColor: "#fff" }}
                        value={selectedProduct}
                        disabled={siteStorage?.idSite === 0}
                    />

                    <Typography variant="body1" component="h3" sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <CategoryOutlined sx={{ color: "#0045FF", fontSize: 25 }} />
                        {t("Plan.new.categories")}
                    </Typography>

                    <Typography variant="body1" component="span">
                        {t("Plan.new.category.modal.description")}
                    </Typography>

                    <GridContainer style={ {marginTop: "12px", maxHeight: "45vh" }}>
                        <TableContainer
                            component={Paper}
                            sx={{
                                border: "1px solid rgba(0, 0, 0, 0.23)",
                                borderRadius: "5px",
                                background: "#F8F8F8",
                                color: "#0000008F", 
                                width: "100%", 
                                boxShadow: "none", 
                                height: "266px", 
                                maxHeight: "266px", 
                                overflowY: "scroll"
                            }}
                        >
                            <Table style={{ borderColor: "transparent" }}>
                                <TableBody>
                                    {

                                        !productInfo?.all_product && fields.map((category, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                                                        <Grid item xs={4}>
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
                                                                    onChange={(event: any) => handleCategoryChange(event, index)}                                                                    >
                                                                    {handleNotRepeat(categories, index)?.map((category: any) => (
                                                                        <MenuItem key={category.idCategory} value={category.idCategory}>
                                                                            {category.name}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <TextField
                                                                {...register(`categories.${index}.amount` as const)}
                                                                defaultValue={category?.amount}
                                                                fullWidth
                                                                id={`categories.${index}.amount`}
                                                                inputProps={{ inputMode: "numeric", min: 1 }}
                                                                label={t("Plan.newPlan.modal.categories.amount")}
                                                                type="number"
                                                                variant="outlined"
                                                                onChange={(event: any) => handleAmountChange(event, index)}
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
                                                                        onChange={(event) => handleLimitedChange(event, index)}
                                                                    />
                                                                }
                                                                label={t("Plan.newPlan.modal.categories.limited")}
                                                            />
                                                        </Grid>
                                                        <Divider orientation="vertical" flexItem />
                                                        <Grid item xs={2}>
                                                            <TextField
                                                                {...register(`categories.${index}.duration` as const)}
                                                                defaultValue={category?.duration}
                                                                fullWidth
                                                                id={`categories.${index}.duration`}
                                                                inputProps={{ inputMode: "numeric", min: 1 }}
                                                                label={t("Plan.newPlan.modal.categories.duration")}
                                                                type="number"
                                                                variant="outlined"
                                                                onChange={(event: any) => handleDurationChange(event, index)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={1} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                            <Tooltip title={t("Plan.tooltip.category.delete")}>
                                                                <DeleteOutline
                                                                    onClick={() => handleRemove({ index: index })}
                                                                    sx={{ color: "red", cursor: "pointer" }}
                                                                />
                                                            </Tooltip>
                                                        </Grid>
                                                        

                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    /*fields.map((category, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                                                    <Grid item xs={4}>
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
                                                                {handleNotRepeat(categories, index)?.map((category: any) => (
                                                                    <MenuItem key={category.idCategory} value={category.idCategory}>{category.name}</MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={2}>
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
                                                    <Grid item xs={1} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                        <Tooltip title={t("Plan.tooltip.category.delete")}>
                                                            <DeleteOutline
                                                                onClick={() => handleRemove({ index: index })}
                                                                sx={{ color: "red", cursor: "pointer" }}
                                                            />
                                                        </Tooltip>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                    ))*/
                                    }
                                    {!(categories?.length === fields.length) && !productInfo?.all_product && (
                                        <TableRow>
                                            <TableCell colSpan={7} onClick={handleAppend} style={{ cursor: "pointer" }}>
                                                <MainTextTitle>+ {t("Plan.newPlan.modal.categories.addCategory")}</MainTextTitle>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </GridContainer>

                    <BtnContainer justifyContent="space-between">
                        <BtnSecondary
                            onClick={() => {
                                Swal.fire({
                                    title: t("Alert.exit.gamification.title"),
                                    text: t("Alert.exit.gamification.text"),
                                    confirmButtonText: t("Alert.button.confirm"),
                                    confirmButtonColor: "#4073FF",
                                    cancelButtonText: t("Alert.button.cancel"),
                                    cancelButtonColor: "#EF5350",
                                    icon: "error",
                                    showCancelButton: true,
                                    customClass: {
                                        container: "my-swal-container",
                                    }
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        handleClose();                            
                                    }
                                });
                            }}
                        >
                            {t("Constants.button.cancel")}
                        </BtnSecondary>
                        <BtnPrimary
                            type="button"
                            disabled={selectedProduct === 0 || (selectedProductInfo?.all_product === false && fields?.length === 0) || disabledButton()}
                            onClick={onSubmit2}
                        >
                            {t("Constants.button.confirm")}
                        </BtnPrimary>
                        {/*<BtnPrimary type="submit" disabled={selectedProduct === 0 || disabledButton()}>
                            {t("Constants.button.confirm")}
                        </BtnPrimary>*/}
                    </BtnContainer>
                </SectionContainer>
            </ModalContainer>
        </Modal>
    );
}