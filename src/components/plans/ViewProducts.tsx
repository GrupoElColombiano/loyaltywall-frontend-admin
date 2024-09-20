// ReactJS
import { useTranslation } from "react-i18next";

// MUI
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

// Styled
import { BodyContainer, HeaderTitle, PlansContainer, SectionContainer } from "./styled";

export default function ViewProducts({ products }: { products: PlansProductsCategory[] }) {
    // Translation
    const { t } = useTranslation();  

    return (
        <PlansContainer>
            {products?.map((product) => (
                <SectionContainer>
                    <HeaderTitle>
                        <Typography variant="body1" component="h3">
                            {product?.product?.name}
                        </Typography>
                    </HeaderTitle>
                
                    <BodyContainer>
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }} size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            {t("Constants.table.header.categories")}
                                        </TableCell>
                                        <TableCell>
                                            {t("Constants.table.header.quantity")}
                                        </TableCell>
                                        <TableCell>
                                            {t("Constants.table.header.duration")}
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                {product?.categorysAccess?.map((category) => (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                {category?.category?.name}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {category?.amount}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {category?.duration}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                ))}
                            </Table>
                        </TableContainer>
                    </BodyContainer>
                </SectionContainer>
            ))}
        </PlansContainer>
    );
}