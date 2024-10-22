// ReactJS
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Shared
import { BtnPrimary } from "../../../shared/components/Buttons";
import NavHeader from "../../../shared/components/NavHeader";

// MUI
import { Typography, TextField } from "@mui/material";

// Components
import ModalPlanProducts from "../../../components/plans/modals/ModalPlanProducts";
import ModalPlanRates from "../../../components/plans/modals/ModalPlanRates";
import NewProducts from "../../../components/plans/NewProducts";
import NewRates from "../../../components/plans/NewRates";

// Services
import { createPlan } from "../../../service/plans";

// Yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// External Dependencies
import Swal from "sweetalert2";

// Icons
import { Add, Inventory2Outlined, PostAddOutlined, SaveOutlined } from "@mui/icons-material";

// Styles
import { PlansContainer, SectionContainer } from "./styled";


interface TypeUser {
    code: string;
    label: string;
}

const listTypeUsers: readonly TypeUser[] = [
    { code: "1", label: "Suscrito" },
    { code: "2", label: "Anónimo" },
    { code: "3", label: "Registrado sin pago" }
];

export default function NewPlanPage() {
    // Navigation
    const navigation = useNavigate();
    const { state } = useLocation();
    console.log("New plan rendered");
    // LocalStorage
    const siteStorage = JSON.parse(localStorage.getItem("siteUser") || "{}"); 

    // Translation
    const { t } = useTranslation();

    const [refresh, setRefresh] = useState(0); // Nuevo estado

    const handleRefresh = () => {
        console.log(" === handleRefresh === ");
        console.log(" === handleRefresh === ");
        console.log(" === handleRefresh === ");
        setRefresh((prev) => prev + 1);
    };

    const [planId, setPlanId] = useState<string | null>(null);


    // States
    const [modalProduct, setModalProduct] = useState<IModalPlanProduct>({
        open: false,
        data: []
    });
    const [modalRate, setModalRate] = useState<IModalPlanRate>({
        open: false,
        data: []
    });
    console.log("modalRate", modalRate);
    const [editProduct, setEditProduct] = useState<INewPlan>({} as INewPlan);
    const [editRate, setEditRate] = useState<Rate>({} as Rate);

    const [isActivate, setIsActivate] = useState<boolean>(false);
    const [btnLoading, setBtnLoading] = useState<boolean>(false);
    console.log("🔥", {
        modalProduct,
        modalRate,
        editProduct,
        editRate,
        isActivate,
        btnLoading
    });
    // Constants
    const hasAllProduct = modalProduct?.data?.some((product: any) => product?.product?.all_product === true);
    const hasUndefinedRate = modalRate?.data?.some((rate: any) => rate?.time === "Indefinido");

    // Yup
    const validationScheme = yup.object().shape({
        name: yup.string().required(t("Constants.form.nameRequired")),
        description: yup.string(),
    });

    // Form
    const {
        formState: { isDirty },        
        handleSubmit,
        register,
        watch
    } = useForm({
        mode: "all",
        resolver: yupResolver(validationScheme),
    });
    
    const nameValue = watch("name");
    const descriptionValue = watch("description"); 


    // Functions
    const onSubmit = (data: any) => {
        if (!modalProduct?.data) return;

        if (state?.typeOfUser === 1 && !modalRate?.data) return;       

        const refactoredData = {
            name: data?.name,
            description: data?.description,
            userType: listTypeUsers[parseInt(state?.typeOfUser) - 1].label,
            isActive: isActivate,
            idSite: siteStorage.idSite,
            rates: modalRate?.data,
            categories: modalProduct?.data?.map((category: any) => {
                return category?.categories?.map((subCategory: any) => {
                    return {
                        sites: siteStorage.idSite,
                        idProduct: category?.product?.value,
                        idCategory: subCategory?.idCategory,
                        duration: subCategory?.duration,
                        unlimited: subCategory?.limited,
                        amount: subCategory?.amount
                    };
                });
            }).flat(2)
        };              

        setBtnLoading(true);
        createPlan(refactoredData)
            .then(() => {
                Swal.fire({
                    confirmButtonColor: "#0045FF",
                    confirmButtonText: t("Alert.button.confirm"),
                    icon: "success",
                    text: t("Alert.save.text"),
                    title: t("Alert.save.title"),
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigation("/plans");
                    }
                });
            })
            .catch(() => {
                Swal.fire({
                    confirmButtonColor: "#0045FF",
                    confirmButtonText: t("Alert.button.confirm"),
                    icon: "error",
                    text: t("Alert.error.text"),
                    title: t("Alert.error.title"),
                });
            })
            .finally(() => {
                setBtnLoading(false);
            });
    };

    const handleUpdateRate = (data: Rate, index: number) => {
        console.log("🚀 ~ handleUpdateRate ~ data:", { index, data });
        setEditRate({...data, index});    

        setModalRate({
            ...modalRate,
            open: true,
        });      
    };

   /* const handleUpdateProduct = (data: INewPlan) => {
        setEditProduct(data);

        setModalProduct({
            ...modalProduct,
            open: true,
        });
    };  */

    const errorValues = ["", undefined, null];
    
    return (
        <>
            <PlansContainer onSubmit={handleSubmit(onSubmit)}>
                <NavHeader
                    description={t("Plan.newPlan.description")}
                    isBack
                    isFormDirty={isDirty}
                    title={t("Plan.newPlan.title")}
                >
                    <BtnPrimary type="submit" loading={btnLoading}>
                        <SaveOutlined />
                        {t("Plan.newPlan.button.save")}
                    </BtnPrimary>
                    <BtnPrimary type="submit" onClick={() => setIsActivate(true)} loading={btnLoading}>
                        <SaveOutlined />
                        {t("Plan.newPlan.button.saveAndActivate")}
                    </BtnPrimary>
                </NavHeader>

                <Typography variant="body1" component="h3">
                    {t("Plan.view.typeOfUser")}:{" "}
                    
                    <Typography variant="body1" component="span">
                        {listTypeUsers[parseInt(state?.typeOfUser) - 1].label}
                    </Typography>
                </Typography>

                <TextField
                    {...register("name")}
                    id="name"
                    label={t("Plan.form.name")}
                    placeholder={t("Plan.form.name.placeholder")}
                    sx={{ backgroundColor: "#fff", width: "50%" }}
                    type="text"
                    variant="outlined"
                    autoComplete="off"
                />

                <TextField
                    {...register("description")}
                    id="description"
                    label={t("Constants.form.description")}
                    multiline
                    placeholder={t("Constants.form.description.placeholder")}
                    rows={4}
                    sx={{ backgroundColor: "#fff", width: "50%" }}
                    type="text"
                    variant="outlined"
                    autoComplete="off"
                />

                <SectionContainer>
                    <Typography variant="body1" component="h3" sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <PostAddOutlined sx={{ color: "#0045FF", fontSize: 30 }} />
                        {t("Plan.view.configuration")}
                    </Typography>

                    <Typography variant="body1" component="span">
                        {t("Plan.view.configuration.description")}
                    </Typography>

                    {state?.typeOfUser === 1 && (
                        <>
                            <Typography variant="body1" component="h3" sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <Inventory2Outlined sx={{ color: "#0045FF", fontSize: 25 }} />
                                {t("Plan.view.rates")}
                            </Typography>

                            <Typography variant="body1" component="span">
                                {t("Plan.new.rate.description")}
                            </Typography>

                            {!hasUndefinedRate && (
                                <BtnPrimary style={{ width: "fit-content" }} onClick={() => setModalRate({ ...modalRate, open: true })}>
                                    <Add />
                                    {t("Plan.newPlan.modal.addRate")}
                                </BtnPrimary>
                            )}

                            {modalRate?.data?.length !== 0 && <NewRates rates={modalRate?.data} setRates={setModalRate} handleUpdate={handleUpdateRate} />}
                        </>
                    )}

                    <Typography variant="body1" component="h3" sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Inventory2Outlined sx={{ color: "#0045FF", fontSize: 25 }} />
                        {t("Plan.view.products")}
                    </Typography>

                    <Typography variant="body1" component="span">
                        {t("Plan.new.product.description")}
                    </Typography>

                    {!hasAllProduct && (
                        <BtnPrimary 
                            style={{ width: "fit-content" }} 
                            onClick={() => setModalProduct({ ...modalProduct, open: true })}
                            disabled={errorValues.includes(nameValue) || errorValues.includes(descriptionValue)}
                        >
                            <Add />
                            {t("Plan.newPlan.modal.addProduct")}
                        </BtnPrimary>
                    )}
                    
                    <NewProducts
                        // setProducts={setModalProduct}
                        planId={planId!}
                        key={refresh} // Utiliza el estado refresh como key
                    />


                </SectionContainer>
            </PlansContainer>
            
                       
            <ModalPlanProducts 
                modal={modalProduct}
                setModal={setModalProduct} 
                editData={editProduct} 
                name={nameValue} 
                description={descriptionValue} 
                handleRefresh={handleRefresh} 
                setPlanId={setPlanId} // Pasar la función de actualización
                setEditData={setEditProduct}
            />

            <ModalPlanRates  
                modal={modalRate} 
                setModal={setModalRate} 
                editData={editRate} 
                setEditData={setEditRate}
                setPlanId={setPlanId} 
            />
        </>
    );
}