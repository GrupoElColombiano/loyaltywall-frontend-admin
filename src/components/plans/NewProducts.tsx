// NewProducts.tsx
import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Checkbox, FormControlLabel, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, TextField } from "@mui/material";
import Swal from "sweetalert2";
import { DeleteOutlined, EditOutlined, SaveOutlined } from "@mui/icons-material";
import { BodyContainer, HeaderTitle, PlansContainer, SectionContainer } from "./styled";
import { getProductsCategoriesPlan, removeCategorie, removeCategorieProduct, updateCategorieProduct } from "../../service/plans";

interface categoryAccess {
    
    id: number;
    category: {
        name: string;
    };
    amount: number;
    duration: number;
    unlimited: boolean;
    idPlansProductCategory: number;
    
}
interface Product {
    idProduct: number;
    name: string;
    category_access: categoryAccess[]
}

export default function NewProducts(
    {
        // setProducts,
        planId,
        refresh, // Recibe refresh como prop

    }: 
    {
        // setProducts?: any,
        planId?: string,
        refresh?: boolean, // Define el tipo de refresh

    }, 
) {
    const { t } = useTranslation();
    const [products, setLocalProducts] = useState<Product[]>([]);
    console.log("🚀 ~ products: 44", products);

    const [editingId, setEditingId] = useState(0);
    const [editAmount, setEditAmount] = useState(0);

    const [editingDuration, setEditingDuration] = useState(0);

    const [editUnlimited, setEditUnlimited] = useState(false);


    const handleEditClick = (categoryAccess: categoryAccess) => {
        setEditingId(categoryAccess.id);
        setEditAmount(categoryAccess.amount);
        setEditingDuration(categoryAccess.duration);
    };

    const handleLimitedChange = (categoryAccess: categoryAccess, event: any) => {
        const { checked } = event.target;
        setEditUnlimited(checked);

        if(checked){
            setEditAmount(0);
            setEditingDuration(0);
            categoryAccess.amount = 0;
            categoryAccess.duration = 0;
        }else{
            setEditAmount(1);
            setEditingDuration(1);
            categoryAccess.amount = 1;
            categoryAccess.duration = 1;
        }
        
    };

    const handleSaveClick = (categoryAccess: categoryAccess) => {

        // console.log(" HOLA ", categoryAccess.idPlansProductCategory);
        // console.log(" editingDuration ", editingDuration);
        categoryAccess.amount = editAmount;
        categoryAccess.duration = editingDuration;
        categoryAccess.unlimited = editUnlimited;

        // console.log("categoryAccess::: ", categoryAccess);
        // Aquí puedes llamar una función para guardar los cambios
        // Por ejemplo: saveCategoryAccessAmount(categoryAccess.id, editAmount);
        setEditingId(0);

        updateCategorieProduct(categoryAccess.idPlansProductCategory, categoryAccess).then((response) => {

            if(response.status == 200){
                // handleClose();  
                fetchData();
                Swal.fire({
                    confirmButtonColor: "#0045FF",
                    confirmButtonText: "Aceptar", // t("Alert.button.confirm"),
                    icon: "success",
                    title: "Se actualizo la categoria satisfactoriamente",
                    text: "Satisfactorio"
                });
                
                
            }
            
        })
            .catch(error => {
            
                Swal.fire({
                    confirmButtonColor: "#0045FF",
                    confirmButtonText: t("Alert.button.confirm"),
                    icon: "error",
                    text: error, // t("Alert.error.text"),
                    title: t("Alert.error.title"),
                });
            })
            .finally(() => {
                console.log("");
            });
    };

    const fetchData = useCallback(async () => {
        
        // console.log(" EL PLAN ID CUANDO SE CREO LLEGO ", planId);
        try {
            const response = await getProductsCategoriesPlan(planId);
            // console.log(" response ", response);
            setLocalProducts(response.data);
        } catch (error) {
            setLocalProducts([]);
            console.error("Error fetching data", error);
        }
    }, [planId]);

    useEffect(() => {
       
        fetchData();
    }, [fetchData, refresh]);


    const setRemoveCategorie = (planId: number, idPlansProductCategory: number) => {
        // console.log(" setProducts ", setProducts);
        removeCategorie(planId, idPlansProductCategory).then((response) => {

            if(response.status == 200){
                // handleClose();  
                fetchData();
                Swal.fire({
                    confirmButtonColor: "#0045FF",
                    confirmButtonText: "Aceptar", // t("Alert.button.confirm"),
                    icon: "success",
                    title: "Se elimino la categoria satisfactoriamente",
                    text: "Satisfactorio"
                });
                
                
            }
            
        })
            .catch(error => {
            
                Swal.fire({
                    confirmButtonColor: "#0045FF",
                    confirmButtonText: t("Alert.button.confirm"),
                    icon: "error",
                    text: error, // t("Alert.error.text"),
                    title: t("Alert.error.title"),
                });
            })
            .finally(() => {
                console.log("");
            });
    };


    const setRemoveCategorieProduct = (product: any) => {
        // console.log(" product;;; ", product);
        // console.log(" planId;;; ", planId);
        removeCategorieProduct(product.idProduct, planId!).then((response) => {

            // console.log(" EL RESPONSE ES ", response);

            if(response.status == 200){
                // handleClose();  
                fetchData();
                Swal.fire({
                    confirmButtonColor: "#0045FF",
                    confirmButtonText: "Aceptar", // t("Alert.button.confirm"),
                    icon: "success",
                    title: "Se elimino el producto satisfactoriamente",
                    text: "Satisfactorio"
                });
                
                
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
                console.log("");
            });
    };



    const handleCategoryDelete = (categoryAccess: any) => {
        // console.log(" product::: ", categoryAccess);
        Swal.fire({
            title: t("Alert.delete.title"),
            confirmButtonText: t("Alert.button.confirm"),
            confirmButtonColor: "#4073FF",
            cancelButtonText: t("Alert.button.cancel"),
            cancelButtonColor: "#EF5350",
            icon: "question",
            showCancelButton: true,
            customClass: {
                container: "my-swal-container",
            }
        }).then((result) => {
            if (result.isConfirmed) {          
                setRemoveCategorie(parseInt(planId!), categoryAccess.idPlansProductCategory);                       
            }
        });        
    };


    const handleCategoryProductDelete = (product: any) => {
        // console.log(" product::: ", product);
        Swal.fire({
            title: t("Alert.delete.title"),
            confirmButtonText: t("Alert.button.confirm"),
            confirmButtonColor: "#4073FF",
            cancelButtonText: t("Alert.button.cancel"),
            cancelButtonColor: "#EF5350",
            icon: "question",
            showCancelButton: true,
            customClass: {
                container: "my-swal-container",
            }
        }).then((result) => {
            if (result.isConfirmed) {        
                setRemoveCategorieProduct(product);                       
            }
        });        
    };

    return (
        <PlansContainer>
            {products.map((product) => (
                <SectionContainer key={product.idProduct}>
                    <HeaderTitle>
                        <Typography variant="body1" component="h3">
                            {product.name}
                        </Typography>
                        <div>
                            
                            <IconButton onClick={() => handleCategoryProductDelete(product)}>
                                <Tooltip title={t("Constants.tooltip.delete")}>
                                    <DeleteOutlined  sx={{ color: "#EF5350" }} />
                                </Tooltip>
                            </IconButton>
                        </div>
                    </HeaderTitle>
                    <BodyContainer>
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }} size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{t("Constants.table.header.categories")}</TableCell>
                                        <TableCell align="center">{t("Constants.table.header.quantity")}</TableCell>
                                        <TableCell align="center">{t("Constants.table.header.duration")}</TableCell>
                                        <TableCell align="center">{t("Plan.newPlan.modal.categories.limited")}</TableCell>
                                        <TableCell align="center">Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {product.category_access.map((categoryAccess) => (
                                        <TableRow key={categoryAccess.id}>
                                            
                                            <TableCell component="th" scope="row">
                                                {categoryAccess.category.name}
                                            </TableCell>
                                            <TableCell align="center">
                                                {editingId === categoryAccess.id ? (
                                                    <TextField
                                                        value={editAmount}
                                                        onChange={(e) => setEditAmount(parseInt(e.target.value))}
                                                    />
                                                ) : (
                                                    categoryAccess.amount
                                                )}
                                            </TableCell>
                                            <TableCell align="center">
                                                {editingId === categoryAccess.id ? (
                                                    <TextField
                                                        value={editingDuration}
                                                        onChange={(e) => setEditingDuration(parseInt(e.target.value))}
                                                    />
                                                ) : (
                                                    categoryAccess.duration
                                                )}
                                            </TableCell>
                                            <TableCell align="center">
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                        
                                                            color="primary"
                                                            defaultChecked={categoryAccess.unlimited}
                                                        
                                                            onChange={(event) => handleLimitedChange(categoryAccess, event)}
                                                        />
                                                    }
                                                    label=""
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                {editingId === categoryAccess.id ? (
                                                    <IconButton onClick={() => handleSaveClick(categoryAccess)}>
                                                        <Tooltip title={t("Constants.tooltip.save")}>
                                                            <SaveOutlined sx={{ color: "#4073FF" }} />
                                                        </Tooltip>
                                                    </IconButton>
                                                ) : (
                                                    <IconButton onClick={() => handleEditClick(categoryAccess)}>
                                                        <Tooltip title={t("Constants.tooltip.edit")}>
                                                            <EditOutlined sx={{ color: "#4073FF" }} />
                                                        </Tooltip>
                                                    </IconButton>
                                                )}
                                                <IconButton onClick={() => handleCategoryDelete(categoryAccess)}>
                                                    <Tooltip title={t("Constants.tooltip.delete")}>
                                                        <DeleteOutlined sx={{ color: "#EF5350" }} />
                                                    </Tooltip>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </BodyContainer>
                </SectionContainer>
            ))}
        </PlansContainer>
        /*<PlansContainer>
            {products.map((product) => (
                <SectionContainer key={product.idProduct}>
                    <HeaderTitle>
                        <Typography variant="body1" component="h3">
                            {product.name}
                        </Typography>
                        <div>
                            
                            <IconButton onClick={() => handleCategoryProductDelete(product)}>
                                <Tooltip title={t("Constants.tooltip.delete")}>
                                    <DeleteOutlined  sx={{ color: "#EF5350" }} />
                                </Tooltip>
                            </IconButton>
                        </div>
                    </HeaderTitle>
                    <BodyContainer>
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }} size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            {t("Constants.table.header.categories")}
                                        </TableCell>
                                        <TableCell align="center">
                                            {t("Constants.table.header.quantity")}
                                        </TableCell>
                                        <TableCell align="center">
                                            {t("Constants.table.header.duration")}
                                        </TableCell>
                                        <TableCell align="center">
                                            Acciones
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {product.category_access.map((categoryAccess) => (
                                        <TableRow key={categoryAccess.id}>
                                            <TableCell component="th" scope="row">
                                                {categoryAccess.category.name}
                                            </TableCell>
                                           
                                            <TableCell align="center">
                                                {editingId === categoryAccess.id ? (
                                                    <TextField
                                                        value={editAmount}
                                                        onChange={(e) => setEditAmount(e.target.value)}
                                                    />
                                                ) : (
                                                    categoryAccess.amount
                                                )}
                                            </TableCell>
                                            <TableCell align="center">
                                                {categoryAccess.duration}
                                            </TableCell>

                                            <TableCell align="center" onClick={() => handleEditClick(categoryAccess)}>
                                                <IconButton>
                                                    <Tooltip title={t("Constants.tooltip.edit")}>
                                                        <EditOutlined sx={{ color: "#4073FF" }} />
                                                    </Tooltip>
                                                </IconButton>
                                            
                                                <IconButton onClick={() => handleCategoryDelete(categoryAccess)}>
                                                    <Tooltip title={t("Constants.tooltip.delete")}>
                                                        <DeleteOutlined  sx={{ color: "#EF5350" }} />
                                                    </Tooltip>
                                                </IconButton>
                                            </TableCell>
                                            
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </BodyContainer>
                </SectionContainer>
            ))}
        </PlansContainer>*/
    );
}