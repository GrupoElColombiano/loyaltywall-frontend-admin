// ReactJS
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// MUI
import { Chip, FormControlLabel, Switch, Typography } from "@mui/material";

// Shared
import { ViewPlansSkeleton } from "../../../shared/components/Skeletons";
import NavHeader from "../../../shared/components/NavHeader";

// Components
import ViewProducts from "../../../components/plans/ViewProducts";
import ViewRates from "../../../components/plans/ViewRates";

// Services
import { getPlanById } from "../../../service/plans";

// External Dependencies
import Swal from "sweetalert2";

// Icons
import { Inventory2Outlined, PostAddOutlined, ChecklistRtlOutlined } from "@mui/icons-material";

// Styled
import { PlansContainer, SectionContainer } from "./styled";

export default function ViewPlanPage() {
    // Translations
    const { t } = useTranslation();

    // Params
    const { planId, versionId } = useParams();

    // States
    const [plan, setPlan] = useState<IPlan | null>(null);

    const [isActive, setIsActive] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Functions
    const handleChangeStatus = () => {
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
            if (result.isConfirmed) {
                setIsActive(!isActive);
            }
        });
    };

    // Effects
    useEffect(() => {
        if (!planId) return;

        setIsLoading(false);
        
        getPlanById(planId ?? "")
            .then((response) => {
                setPlan(response.data?.plan);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(true);
            });
    }, [planId]);    

    if (!isLoading) return <ViewPlansSkeleton />;   

    return (
        <PlansContainer>
            <NavHeader title={plan?.name ?? ""} isBack>
            </NavHeader>

            <SectionContainer>
                <Typography variant="body1" component="h3">
                    {t("Plan.view.typeOfUser")}:{" "}
                    
                    <Typography variant="body1" component="span">
                        {plan?.userType}
                    </Typography>
                </Typography>

                {versionId
                    ? (
                        <>
                            <Typography variant="body1" component="h3" sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <ChecklistRtlOutlined sx={{ color: "#0045FF", fontSize: 30 }} />
                                {t("Plan.view.state")}
                            </Typography>

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={isActive}
                                        onChange={handleChangeStatus}
                                        color="primary"
                                        defaultChecked
                                        name="status"
                                    />
                                }
                                label={`${t("Constants.status.active")} / ${t("Constants.status.inactive")}`}
                            />

                            <Typography variant="body1" component="span">
                                {t("Plan.view.state.description")}
                            </Typography>
                        </>
                    )
                    : (
                        <Typography variant="body1" component="h3">
                            {t("Plan.view.state")}:{" "}
                    
                            <Typography variant="body1" component="span">
                                {plan?.isActive
                                    ? <Chip label={t("Constants.status.active")} style={{ backgroundColor: "#4CAF50", color: "#1B5E20" }} />
                                    : <Chip label={t("Constants.status.inactive")} style={{ backgroundColor: "#0000001F", color: "#606A84" }} />
                                }
                            </Typography>
                        </Typography>
                    )}

                <Typography variant="body1" component="h3">
                    {t("Plan.view.detail")}                    
                </Typography>

                <Typography variant="body1" component="span">
                    {t("Plan.view.detail.description")}
                </Typography>
            </SectionContainer>

            <SectionContainer>
                <Typography variant="body1" component="h3" sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <PostAddOutlined sx={{ color: "#0045FF", fontSize: 30 }} />
                    {t("Plan.view.configuration")}
                </Typography>

                <Typography variant="body1" component="span">
                    {t("Plan.view.configuration.description")}
                </Typography>

                {(plan?.plansProductsCategory?.length ?? 0) > 0 && (
                    <>
                        <Typography variant="body1" component="h3" sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <Inventory2Outlined sx={{ color: "#0045FF", fontSize: 25 }} />
                            {t("Plan.view.products")}
                        </Typography>

                        <ViewProducts products={plan?.plansProductsCategory ?? []} />
                    </>
                )}

                {(plan?.rates?.length ?? 0) > 0 && (
                    <>
                        <Typography variant="body1" component="h3" sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <Inventory2Outlined sx={{ color: "#0045FF", fontSize: 25 }} />
                            {t("Plan.view.rates")}
                        </Typography>

                        <ViewRates rates={plan?.rates ?? []} />
                    </>
                )}
            </SectionContainer>
        </PlansContainer>
    );
}