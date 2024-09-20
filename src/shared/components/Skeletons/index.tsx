// ReactJS
import { useTranslation } from "react-i18next";

// MUI
import { Skeleton, TableCell, TableRow, Typography } from "@mui/material";

// Shared
import NavHeader from "../NavHeader";

// Icons
import { Inventory2Outlined, PostAddOutlined } from "@mui/icons-material";

// Styled
import {  PlansContainer, SectionContainer } from "./styled";

export function TableSkeleton({ rowsNum, columnsNum }: ITableSkeleton) {
    return [...Array(rowsNum)].map((_, index) => (
        <TableRow key={index}>
            {Array(columnsNum).fill(null).map((_, index) => (
                <TableCell component="th" scope="row" key={index}>
                    <Skeleton animation="wave" variant="text" />
                </TableCell>
            ))}
        </TableRow>
    ));
}

export function ViewPlansSkeleton() {
    // Translation
    const { t } = useTranslation();

    return (
        <PlansContainer>
            <NavHeader title={t("Plan.view.title")} isBack>
            </NavHeader>

            <SectionContainer>
                <Typography variant="body1" component="h3" sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {t("Plan.view.typeOfUser")}:{" "}
                    
                    <Typography variant="body1" component="span">
                        <Skeleton animation="wave" variant="text" width={100} height={30} />
                    </Typography>
                </Typography>

                <Typography variant="body1" component="h3" sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {t("Plan.view.state")}:{" "}
                    
                    <Typography variant="body1" component="span">
                        <Skeleton animation="wave" variant="text" width={100} height={30} />
                    </Typography>
                </Typography>

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

           
                <Typography variant="body1" component="h3" sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Inventory2Outlined sx={{ color: "#0045FF", fontSize: 25 }} />
                    {t("Plan.view.products")}
                </Typography>

                <Skeleton animation="wave" variant="rounded" height={200} />

                <Typography variant="body1" component="h3" sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Inventory2Outlined sx={{ color: "#0045FF", fontSize: 25 }} />
                    {t("Plan.view.rates")}
                </Typography>

                <Skeleton animation="wave" variant="rounded" height={200} />
            </SectionContainer>
        </PlansContainer>
    );
}