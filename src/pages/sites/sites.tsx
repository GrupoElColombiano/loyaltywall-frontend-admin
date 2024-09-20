// ReactJS
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// MUI
import { Add } from "@mui/icons-material";

// Components
import CustomPagination from "../../main/adapters/primary/CompleteGridComponent/CustomPagination";

// Shared
import { BtnPrimary } from "../../shared/components/Buttons";
import InputSearch from "../../shared/components/Search";
import InputSelect from "../../shared/components/Select";
import NavHeader from "../../shared/components/NavHeader";
import TableComponent from "../../shared/components/Table";

// Constants
import { SitesHeader } from "../../constants/headers";
import { StatusOptions } from "../../constants/options";

// Services
import { getSites } from "../../service/sites";

// Styled
import { SitesContainer } from "./styled";

export default function SitesPage() {
    // Translation
    const { t } = useTranslation();

    // Navigation
    const navigate = useNavigate();

    // States
    const [isActive, setIsActive] = useState<string | undefined>(undefined);

    const [searchText, setSearchText] = useState("");

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalSites, setTotalSites] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    const [actionsModule, setActionsModule] = useState<IActionRole[]>([]);
    const [rows, setRows] = useState<ISitesBody[]>([]);

    // Constants
    const totalPages = Math.ceil(totalSites / pageSize);

    // Functions
    const handlePageChange = (params: { searchText: string, page: number, limitCurrent: number, isActive?: boolean }) => {
        setIsLoading(true);

        setLimit(params.limitCurrent);

        setPage(params.page);

        getSites(params.page, params.limitCurrent, params.searchText, params.isActive)
            .then((response: any) => {           
                setRows(response.data?.data);
                setTotalSites(response?.data?.totalSites);
            })
            .catch(() => {
                setRows([]);
                setTotalSites(0);               
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleSearchChange = () => {
        handlePageChange({
            searchText: searchText,
            page: page,
            limitCurrent: limit,
            isActive: isActive === undefined ? undefined : isActive === "true" ? true : false
        });
    };

    const handleAddNew = () => {
        navigate("new");
    };

    // Effects
    useEffect(() => {

        if(localStorage.getItem("5")){
            const productoModuleData = JSON.parse(localStorage.getItem("5") || "{}");
            setActionsModule(productoModuleData); // Guarda el productoModule en el estado
            handlePageChange({ searchText: searchText, page: 1, limitCurrent: 10 });
        }else{
            alert("Por favor inicie de nuevo sesion para recuperar los permisos");
        }

        handlePageChange({
            searchText: searchText,
            page: page,
            limitCurrent: limit,
            isActive: isActive === undefined ? undefined : isActive === "true" ? true : false
        });
    }, [isActive]);

    return (
        <SitesContainer>
            <NavHeader title={`${t("Sites.title")} (${totalSites})`}>
                {actionsModule && actionsModule.find(action => action.description === "Buscar" && action.role != null) && (
                    <InputSearch onSearch={handleSearchChange} setSearch={setSearchText} search={searchText} />
                )}
               

                <InputSelect
                    item={isActive}
                    label={t("Constants.label.status")}
                    options={StatusOptions}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {                        
                        setIsActive(e.target.value as unknown as string);
                    }}
                />

                {actionsModule && actionsModule.find(action => action.description === "Crear" && action.role != null) && (
                    <BtnPrimary onClick={handleAddNew}>       
                        <Add />         
                        {t("Constants.button.add")}
                    </BtnPrimary>
                )}
            </NavHeader>

            {actionsModule && actionsModule.find(action => action.description === "Listar" && action.role != null) && (
                <TableComponent module="sites" tableHeader={SitesHeader} tableRows={rows} isLoading={isLoading}>
                    <CustomPagination
                        handlePageChange={handlePageChange}
                        page={page}
                        pageSize={pageSize}
                        searchText={searchText}
                        setPage={setPage}
                        setPageSize={setPageSize}
                        totalCategory={totalSites}
                        totalPages={totalPages}
                    />
                </TableComponent>
            )}
        </SitesContainer>
    );
}
