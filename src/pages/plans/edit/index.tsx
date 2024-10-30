// ReactJS
import { useForm } from "react-hook-form";
import { useLocation,  useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// Shared
import { BtnPrimary } from "../../../shared/components/Buttons";
import NavHeader from "../../../shared/components/NavHeader";

// MUI
import { Typography, TextField, FormControlLabel, Switch } from "@mui/material";

// Components
import ModalPlanProducts from "../../../components/plans/modals/ModalPlanProducts";
import ModalPlanRates from "../../../components/plans/modals/ModalPlanRates";
import ModalPlanSegments from "../../../components/plans/modals/ModalPlanSegments";
import NewProducts from "../../../components/plans/NewProducts";
import NewRates from "../../../components/plans/NewRates";

// Services
import { getRatesByPlan, updatePlan } from "../../../service/plans";

// Yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// External Dependencies
import Swal from "sweetalert2";

// Icons
import { Add, ChecklistRtlOutlined, Inventory2Outlined, PostAddOutlined, SaveOutlined } from "@mui/icons-material";

// Styles
import { PlansContainer, SectionContainer } from "./styled";
import { updateStatePlan } from "../../../service/plans";


export default function EditPlanPage() {
    // Navigation
    const navigation = useNavigate();
    const { planId } = useParams();
    const { state } = useLocation();

    // LocalStorage
    const siteStorage = JSON.parse(localStorage.getItem("siteUser") || "{}"); 

    // Translation
    const { t } = useTranslation();

    const [refresh, setRefresh] = useState(0); // Nuevo estado

    const handleRefresh = () => {
        setRefresh((prev) => prev + 1);
    };
    
    // States
    const [modalProduct, setModalProduct] = useState<IModalPlanProduct>({
        open: false,
        data: refactorProductData(state?.plan?.plansProductsCategory) || []
    });

    const [modalRate, setModalRate] = useState<IModalPlanRate>({
        open: false,
        data: state?.plan?.rates || []
    });

    const [modalSegment, setModalSegment] = useState<any>({
        open: false,
        data: []
    });

    const segments = [
        {
            value: 'default',
            label: t('Segments.select.default')
        },
        {
            value: 'man',
            label: t('Segments.man')
        },
        {
            value: 'woman',
            label: t('Segments.woman')
        },
        {
            value: 'over25',
            label: t('Segments.over25')
        },
        {
            value: 'seniorCitizen',
            label: t('Segments.seniorCitizen')
        }
    ];

    const [editProduct] = useState<INewPlan>({} as INewPlan);
    const [editRate, setEditRate] = useState<Rate>({} as Rate);
    const [editSegment] = useState<any>({} as any);

    const [selectedIdCategoryId, setSelectedIdCategoryId] = useState<string>('');

    const [isActive, setIsActive] = useState<boolean>(state?.plan?.isActive || false);
    const [btnLoading, setBtnLoading] = useState(false);

    // Constants
    const hasAllProduct = modalProduct?.data?.some((product: any) => product?.product?.all_product === true);

    const hasUndefinedRate = modalRate?.data?.some((rate: any) => rate?.time === "Indefinido");   

    // Yup
    const validationScheme = yup.object().shape({
        name: yup.string().required(t("Constants.form.nameRequired")),
        description: yup.string(),
    });

    const handleOpenSegmentModal = (categoryId: string) => {
        const idCategories = modalSegment?.data?.map((segment:any) => segment.categoryId)
        if (!idCategories.includes(categoryId)) {
            setModalSegment({
                open: true,
                data: [
                    ...modalSegment?.data,
                    {
                        categoryId,
                        data: [
                            {
                                segment: 'default',
                                quantity: 0,
                                priority: ''
                            }
                        ]
                    }
                ]
            })
        } else {
            setModalSegment({
                ...modalSegment,
                open: true
            })
        }
        setSelectedIdCategoryId(categoryId);
    }

    const handleUpdateSegments = (args:any) => {
        console.log("handleUpdateSegments", { selectedIdCategoryId, args });
        const updateData = modalSegment.data.map((categoryInfo:any) => {
            if (categoryInfo?.categoryId === selectedIdCategoryId) {
                return {
                    ...categoryInfo,
                    data: args.data
                }
            } else return categoryInfo
        })
        console.log("updateData", updateData)
        setModalSegment({
            open: false,
            data: updateData
        })
    }
    console.log({ modalSegment });
    useEffect( () => {
        const fetchData = async () => {
            const ratesByPlan = await getRatesByPlan(planId);
            setModalRate({
                ...modalRate,
                data: ratesByPlan?.data || []
            });
        }
        fetchData();
        return () => {
            setModalRate({
                open: false,
                data: []
            })
        }
    }, [planId])

    // Form
    const {
        formState: { isDirty },        
        handleSubmit,
        register
    } = useForm({
        mode: "all",
        defaultValues: {
            name: state?.plan?.name || "",
            description: state?.plan?.description || "",
        },
        resolver: yupResolver(validationScheme),
    });

    // Functions
    const onSubmit = (data: any) => {    
        console.log("executed onSubmit -- edit/index");
        setBtnLoading(true);

        const updatedPlan = {
            name: data.name,
            description: data.description,
            isActive: state.plan.isActive,
            site: state.plan.idSite,
            idVersionPlan: state.plan.newVersion,
            rates: modalRate?.data
        };
        console.log({ editRate });
        console.log("sending" + updatePlan);
        updatePlan(state?.plan?.idPlan, updatedPlan)
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

        if (modalProduct?.data?.length === 0) return;

        if ((modalRate?.data?.length === 0) && state?.typeOfUser === "Suscrito") return;    
    };   

    const handleChangeStatus = (event: any) => {
        const { checked } = event.target;

        Swal.fire({
            cancelButtonColor: "#7E2EFF",
            cancelButtonText: t("Alert.button.cancel"),
            confirmButtonColor: "#0045FF",
            confirmButtonText: t("Alert.button.confirm"),
            icon: "success",
            showCancelButton: true,
            text: t("Alert.status.text"),
            title: t("Alert.status.title"),
        }).then((result) => {

            setIsActive(checked); 
            if (result.isConfirmed) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                updateStatePlan(parseInt(planId!), {
                    userType: state?.typeOfUser,
                    status: checked,
                    idSite: siteStorage.idSite
                }).then((response) => {

                    if(response.status == 200){
                        // handleClose();  
                        Swal.fire({
                            confirmButtonColor: "#0045FF",
                            confirmButtonText: "Aceptar", // t("Alert.button.confirm"),
                            icon: "success",
                            title: "Se actualizo la categoria satisfactoriamente",
                            text: "Satisfactorio"
                        });
                       
                    }
                    
                }).catch(error => {

                    Swal.fire({
                        confirmButtonColor: "#0045FF",
                        confirmButtonText: t("Alert.button.confirm"),
                        icon: "error",
                        text: error, // t("Alert.error.text"),
                        title: t("Alert.error.title"),
                    });

                });
            }
        });
    };
    
    const handleUpdateRate = (data: Rate) => {
        setEditRate(data);    

        setModalRate({
            ...modalRate,
            open: true,
        });
    };

    function refactorProductData(data: any) { 
       
        try {
          //  handleRefresh();
        } catch (error) {
            console.log("ERROR ", error);
        }

        return data?.map((item: any) => {
            return {
                product: {
                    ...item?.product,
                    value: item?.product?.idProduct,
                    label: item?.product?.name
                },
                categories: item?.categorysAccess?.map((category: any) => {
                    return {
                        idCategory: category?.category?.idCategory,
                        name: category?.category?.name,
                        duration: category?.duration,
                        limited: category?.unlimited,
                        amount: category?.amount
                    };
                })
            };
            
        });   
    }

    return (
        <PlansContainer onSubmit={handleSubmit(onSubmit)}>
            <NavHeader
                description={t("Plan.newPlan.description")}
                isBack
                isFormDirty={isDirty}
                title={t("Plan.editPlan.title")}
            >
                <BtnPrimary type="submit" loading={btnLoading}>
                    <SaveOutlined />
                    {t("Plan.newPlan.button.save")}
                </BtnPrimary>
            </NavHeader>

            <Typography variant="body1" component="h3">
                {t("Plan.view.typeOfUser")}:{" "}
                    
                <Typography variant="body1" component="span">
                    {state?.typeOfUser} --
                </Typography>
            </Typography>

            <Typography variant="body1" component="h3" sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <ChecklistRtlOutlined sx={{ color: "#0045FF", fontSize: 30 }} />
                {t("Plan.view.state")}
            </Typography>

            <FormControlLabel
                control={
                    <Switch
                        checked={isActive}
                        onChange={(event) => handleChangeStatus(event)}
                        color="primary"
                        defaultChecked
                        name="status"
                    />
                }
                label={`${t("Constants.status.inactive")} / ${t("Constants.status.active")}`}
            />

            <Typography variant="body1" component="span">
                {t("Plan.view.state.description")}
            </Typography>

            <TextField
                {...register("name")}
                id="name"
                label={t("Plan.form.name")}
                placeholder={t("Plan.form.name.placeholder")}
                sx={{ backgroundColor: "#fff", width: "50%" }}
                type="text"
                variant="outlined"
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
            />
            

            <SectionContainer>
                <Typography variant="body1" component="h3" sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <PostAddOutlined sx={{ color: "#0045FF", fontSize: 30 }} />
                    {t("Plan.view.configuration")}
                </Typography>

                <Typography variant="body1" component="span">
                    {t("Plan.view.configuration.description")}
                </Typography>

                {state?.typeOfUser === "Suscrito" && (
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

                        {modalRate?.data?.length !== 0 && <NewRates rates={modalRate?.data} setRates={setModalRate} handleUpdate={handleUpdateRate}/>}
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
                    <BtnPrimary style={{ width: "fit-content" }} onClick={() => setModalProduct({ ...modalProduct, open: true })}>
                        <Add />
                        {t("Plan.newPlan.modal.addProduct")}
                    </BtnPrimary>
                )}

                <NewProducts
                    userType={state?.typeOfUser}
                    planId={planId}
                    key={refresh} 
                    setModalSegment={(args:any) => {
                        handleOpenSegmentModal(args?.category?.idCategory)
                    }}
                    segments={modalSegment.data}
                />
                    
            </SectionContainer>
            <ModalPlanProducts modal={modalProduct} setModal={setModalProduct} editData={editProduct} planId={planId} handleRefresh={handleRefresh} />
            <ModalPlanRates
                modal={modalRate}
                setModal={setModalRate}
                editData={editRate}
                setEditData={(newRate) => {
                    console.log("new rate: " + newRate);
                    const updatedDataField = modalRate?.data.concat(newRate)
                    console.log("🚀 ~ EditPlanPage ~ updatedDataField:", updatedDataField)
                    console.log("🚀 ~ EditPlanPage ~ modalRate:", modalRate)
                    // setModalRate({
                    //     ...modalRate,
                    //     data: updatedDataField
                    // })
                    setEditRate
                }}
            />
            <ModalPlanSegments
                modal={modalSegment}
                setModal={handleUpdateSegments}
                editData={editSegment}
                planId={planId}
                handleRefresh={handleRefresh} 
                segments={segments}
                selectedIdCategoryId={selectedIdCategoryId}
                onClose={() => {
                    setModalSegment({
                        ...modalSegment,
                        open: false
                    })
                }}
            />
        </PlansContainer>
    );
}
