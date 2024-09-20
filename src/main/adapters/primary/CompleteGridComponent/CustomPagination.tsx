// ReactJS
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

// MUI
import { Grid, Stack, Button } from "@mui/material";

// Icons
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

// Styles
import { TitleFilePage, TitleTotalPage } from "../../../utils/grid-data.style";

interface CustomPaginationProps {
    handlePageChange: (params: { searchText: string, page: number, limitCurrent: number, isActive?: boolean }) => void;
    page: number;
    pageSize: number;
    searchText: string;
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void; 
    totalCategory: number; 
    totalPages: number;
}

export default function CustomPagination ({ handlePageChange, page, pageSize, searchText, setPage, setPageSize, totalCategory, totalPages}: CustomPaginationProps) {
    // Translation
    const { t } = useTranslation();

    // Constants
    const maxNumberItemInPage = page * pageSize;
    const minNumberItemInPage = maxNumberItemInPage - pageSize + 1;

    // Functions
    const handlePrevPage = () => {
        setPage(page - 1);
        handlePageChange({ searchText: searchText, page: page - 1, limitCurrent: pageSize });
    };

    const handleNextPage = () => {
        setPage(page + 1);
        handlePageChange({ searchText: searchText, page: page + 1, limitCurrent: pageSize });
    };

    const handlePageSizeChange = (event: any) => {
        setPageSize(parseInt(event.target.value, 10));
        handlePageChange({ searchText: searchText, page: page, limitCurrent: parseInt(event.target.value, 10) });
    };

    // Effects
    useEffect(() => {
        if (totalPages > 0 && page > totalPages) {
            setPage(totalPages);
            handlePageChange({ searchText: searchText, page: totalPages, limitCurrent: pageSize });
        }
    }, [totalPages, page, pageSize]);
    
    return (
        <Grid container justifyContent="space-between" alignItems="center" paddingRight="20px">
            <TitleTotalPage>{minNumberItemInPage} - {(maxNumberItemInPage < totalCategory) ? maxNumberItemInPage : totalCategory} {t("Pagintaion.of")} {(maxNumberItemInPage < totalCategory) ? maxNumberItemInPage : totalCategory}</TitleTotalPage>
            <Stack
                direction={{ sm: "row" }}
                justifyContent="flex-end"
                paddingRight="2px"
            >
                <span>
                    <span>
                        <TitleFilePage>{t("Pagintaion.label")}</TitleFilePage>
                        <select value={pageSize} onChange={handlePageSizeChange}>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                    </span>
                    <Button onClick={handlePrevPage} disabled={page === 1} startIcon={<KeyboardArrowLeftOutlinedIcon />} />
                    <span>{page} {t("Pagintaion.of")} {totalPages}</span>
                    <Button onClick={handleNextPage} disabled={page === totalPages} startIcon={<KeyboardArrowRightOutlinedIcon />} />
                </span>
            </Stack>
        </Grid>
    );
}
