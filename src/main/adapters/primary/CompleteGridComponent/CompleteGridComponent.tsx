import React from "react";
import { Toolbar, Typography, Button, Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { Outlet, useNavigate } from "react-router-dom"; 
import { ContainerPagination, ContainerPaginationBorderComponent, StripedDataGrid } from "../../../utils/grid-data.style";
import CustomPagination from "./CustomPagination";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
interface CustomComponentProps {
    // Total number of categories (used in the title)
    totalCategory: any;
    // Value of the search text
    searchText: any; 
    // Function to handle the action of adding a new item
    handleAddNew: any;    
    // Columns for the data table or list
    columns: any;    
    // Rows of data for the data table or list
    rows: any;    
    // Current page being displayed
    page: any;    
    // Function to update the current page
    setPage: any;    
    // Current page size (number of items per page)
    pageSize: any;    
    // Function to update the page size
    setPageSize: any;    
    // Total number of available pages
    totalPages: any;    
    // Function to handle page change
    handlePageChange: any;    
    // Name of the ID in the data row (used to identify each row)
    nameOfIdInRow: string;
    // Tittle label page
    tittlePage: string;
    // Component to render the search filters
    ComponentSearch: any;
    // Label button toolbar
    labelButtonToolbar: string;
    // Has goBack
    goBack: boolean;
}

const CustomComponent : React.FC<CustomComponentProps> = ({ 
    columns,
    ComponentSearch,
    // handleAddNew,
    handlePageChange,
    // labelButtonToolbar,
    nameOfIdInRow,
    page,
    pageSize,
    rows,
    searchText,
    setPage,
    setPageSize,
    tittlePage,
    totalCategory,
    totalPages,
    goBack,

}) => {
    
    const filterBox = ComponentSearch();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div style={{
            backgroundColor: "#F8F8F8",
            color: "#000000",
            display: "flex",
            flexDirection: "column",
            width: "-webkit-fill-available",
            height: "calc(98% - 80px)",
            paddingRight: "33px",
            paddingLeft: "31px",
            paddingTop: "16px",
            justifyContent: "space-around"
        }}>
            <Toolbar
                sx={{
                    paddingLeft: "0px !important",
                    paddingRight: "0px !important",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingBottom: "42px",
                    "@media (min-width: 685px)": {
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBottom: "0px",
                        // padding: "0 20px",
                    },
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "row", flexGrow: 1, width: "-webkit-fill-available", textAlign: "start" }}>
                    {goBack ? <Button onClick={() => {handleGoBack();}}  startIcon={<ArrowBackIosIcon style={{color: "#000000"}} />} /> : <></>}
                    <Typography variant="h4" component="h1">
                        {tittlePage} ({totalCategory})
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        "@media (min-width: 685px)": {
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignItems: "center",
                        },
                    }}
                >
                    {filterBox}
                </Box>
            </Toolbar>
            <br />
            <div style={{
                minHeight: "calc(50vh - 50px)",
                height: "-webkit-fill-available"
            }}>

                <StripedDataGrid
                    sx={{ marginRight: "0px !important", height: "100%" }}
                    rowHeight={64}
                    disableColumnMenu
                    hideFooter
                    columns={columns}
                    rows={rows}
                    getRowId={(row) => row[nameOfIdInRow]}
                    getRowClassName={(params) =>
                        params.indexRelativeToCurrentPage % 2 === 0 ? "odd" : "even"
                    }
                    classes={{
                        footerContainer: "hidden-pagination"
                    }}
                />
                <ToastContainer />
                <Outlet />
            </div>
            <div
                style={{
                    width: "100%",
                    backgroundColor: "#F8F8F8",
                    color: "#000000",
                }}
            >
                <ContainerPagination
                    style={{
                        width: "100%",
                        backgroundColor: "#F8F8F8",
                        color: "#000000",
                    }}
                >
                    <ContainerPaginationBorderComponent>
                        <CustomPagination
                            page={page}
                            setPage={setPage}
                            pageSize={pageSize}
                            setPageSize={setPageSize}
                            totalPages={totalPages}
                            totalCategory={totalCategory}
                            searchText={searchText}
                            handlePageChange={handlePageChange}
                        />
                    </ContainerPaginationBorderComponent>

                </ContainerPagination>
            </div>
        </div>
    );
};

export default CustomComponent;
