// ReactJS
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Services
import { getListProducts } from "../../service/products/products.service";

// Components
import CustomPagination from "../../main/adapters/primary/CompleteGridComponent/CustomPagination";

// Shared
import { BtnPrimary } from "../../shared/components/Buttons";
import InputSearch from "../../shared/components/Search";
import NavHeader from "../../shared/components/NavHeader";
import TableComponent from "../../shared/components/Table";

// Assets
import { Add } from "@mui/icons-material";

// Constants
import { ProductsHeader } from "../../constants/headers";

// Styled
import { ProductsContainer } from "./styled";

// import { useContext } from "react";

// import { AuthContext } from "../../context/AuthContext";

export default function ProductsPage() {

    // Navigation
    const navigate = useNavigate();

    // Translation
    const { t } = useTranslation();

    // States
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalProducts, setTotalProducts] = useState(0);

    const [rows, setRows] = useState<IProductsBody[]>([]);

    const [searchText, setSearchText] = useState("");

    // Constants
    const totalPages = Math.ceil(totalProducts / pageSize);

    // Functions
    const handleSearchChange = () => {
        handlePageChange({ searchText: searchText, page: page, limitCurrent: limit });
    };

    const handleAddNew = () => {
        localStorage.setItem("product", "");
        navigate("/products/new");
    };

    const handlePageChange = (params: { searchText: string, page: number, limitCurrent: number }) => {
        setLimit(params.limitCurrent);
        setPage(params.page);

        getListProducts(params.searchText, params.page, params.limitCurrent, (result) => {

            if (result.code == "ERR_BAD_REQUEST") {
                toast.error("" + result.response.data.message);
                setRows([]);
                setTotalProducts(0);
                return;
            }

            if (result.status == 200) {
                // toast.success(result.statusText);
                setRows(result.data.data);
                setTotalProducts(result.data.totalProducts);
                return;
            }

            if (result.response.data.status == 406) {
                toast.warn(result.response.data.message);
                return;
            }

            if (result.response.data.status == 201) {
                toast.success(result.statusText);
                return;
            }

            if (result.response.data.status == 404) {
                toast.warn(result.response.data.message);
                return;
            }
        });
    };

    const [actionsModule, setActionsModule] = useState<IActionRole[]>([]);

    // Effects
    useEffect(() => {
        if(localStorage.getItem("2")){
            const productoModuleData = JSON.parse(localStorage.getItem("2") || "{}");
            setActionsModule(productoModuleData); // Guarda el productoModule en el estado
            handlePageChange({ searchText: searchText, page: 1, limitCurrent: 10 });
        }else{
            alert("Por favor inicie de nuevo sesion para recuperar los permisos");
        }
    }, []);    

    return (
        <ProductsContainer>
            <NavHeader title={`${t("Products.title")} (${totalProducts})`}>

                {actionsModule && actionsModule.find(action => action.description === "Buscar" && action.role != null) && (
                    <InputSearch onSearch={handleSearchChange} setSearch={setSearchText} search={searchText} />
                )}

                {actionsModule && actionsModule.find(action => action.description === "Crear" && action.role != null) && (
                    <BtnPrimary onClick={handleAddNew}>
                        <Add />         
                        {t("Constants.button.add")}
                    </BtnPrimary>
                )}
            </NavHeader>

            {actionsModule && actionsModule.find(action => action.description === "Listar" && action.role != null) && (
                <TableComponent module="products" tableHeader={ProductsHeader} tableRows={rows}>
                    <CustomPagination
                        handlePageChange={handlePageChange}
                        page={page}
                        pageSize={pageSize}
                        searchText={searchText}
                        setPage={setPage}
                        setPageSize={setPageSize}
                        totalCategory={totalProducts}
                        totalPages={totalPages}
                    />
                </TableComponent>
            )}
           
        </ProductsContainer>
    );
}
