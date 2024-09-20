// ReactJS
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Services
import { getCategories } from "../../service/categories";
import { getProductsBySite } from "../../service/products";

// Components
import CustomPagination from "../../main/adapters/primary/CompleteGridComponent/CustomPagination";

// Shared
import { BtnPrimary } from "../../shared/components/Buttons";
import InputSearch from "../../shared/components/Search";
import InputSelect from "../../shared/components/Select";
import NavHeader from "../../shared/components/NavHeader";
import TableComponent from "../../shared/components/Table";

// Assets
import { Add } from "@mui/icons-material";

// Constants
import { CategoriesHeader } from "../../constants/headers";

// Styled
import { CategoriesContainer } from "./styled";

export default function CategoriesPage() {
    // Navigation
    const navigate = useNavigate();

    // Translation
    const { t } = useTranslation();

    // States
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalCategory, setTotalCategory] = useState(0);


    const [rows, setRows] = useState<ICategoriesBody[]>([]);
    const [products, setProducts] = useState<IOption[]>([]);

    const [selectedProduct, setSelectedProduct] = useState("");

    const [searchText, setSearchText] = useState("");

    // Constants
    const totalPages = Math.ceil(totalCategory / pageSize);
    
    const siteStorage = JSON.parse(localStorage.getItem("siteUser") || "{}"); 
    // Functions
    const handleSearchChange = () => {
        handlePageChange({ searchText: searchText, page: page, limitCurrent: limit });
    };

    const handlePageChange = (params: { searchText: string, page: number, limitCurrent: number, selectedProduct?: number | string }) => {
        setLimit(params.limitCurrent);

        setPage(params.page);

        getCategories(params.searchText, params.page, params.limitCurrent, selectedProduct, siteStorage.idSite)
            .then((res: any) => {
                setRows(res.data?.data);
                setTotalCategory(res?.data?.totalCategory);
            })
            .catch(() => {
                setRows([]);
            });
    };

    const handleAddNew = () => {
        navigate("/categories/new");
    };

    // Effects
    useEffect(() => {
        handlePageChange({
            searchText: searchText,
            page: page,
            limitCurrent: limit,
            selectedProduct: selectedProduct
        });
    }, [selectedProduct]);

    useEffect(() => {

        if(localStorage.getItem("3")){
            const productoModuleData = JSON.parse(localStorage.getItem("3") || "{}");
            setActionsModule(productoModuleData); // Guarda el productoModule en el estado
        }else{
            alert("Por favor inicie de nuevo sesion para recuperar los permisos");
        }

        getProductsBySite(siteStorage.idSite)
            .then((res) => {
                setProducts([{
                    value: "",
                    label: t("Constants.status.all")
                }]);
                res.data.products.map((item: IProductsBody) => {
                    setProducts((oldArray) => [...oldArray, { value: item.idProduct, label: item.name }]);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [actionsModule, setActionsModule] = useState<IActionRole[]>([]);


    return (
        <CategoriesContainer>
            <NavHeader title={`${t("Categories.title")} (${totalCategory})`}>
                {actionsModule && actionsModule.find(action => action.description === "Buscar" && action.role != null) && (

                    <InputSearch onSearch={handleSearchChange} setSearch={setSearchText} search={searchText} />
                )
                }
                <InputSelect
                    item={selectedProduct}
                    label={t("Constants.label.product")}
                    options={products}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setSelectedProduct(e.target.value);
                    }}
                />

                {actionsModule && actionsModule.find(action => action.description === "Crear" && action.role != null) && (

                    <BtnPrimary onClick={handleAddNew}>
                        <Add />
                        {t("Constants.button.add")}
                    </BtnPrimary>
                )
                }
            </NavHeader>

            {actionsModule && actionsModule.find(action => action.description === "Listar" && action.role != null) && (

                <TableComponent module="categories" tableHeader={CategoriesHeader} tableRows={rows}>
                    <CustomPagination
                        handlePageChange={handlePageChange}
                        page={page}
                        pageSize={pageSize}
                        searchText={searchText}
                        setPage={setPage}
                        setPageSize={setPageSize}
                        totalCategory={totalCategory}
                        totalPages={totalPages}
                    />
                </TableComponent>
            )
            }
        </CategoriesContainer>
    );
}