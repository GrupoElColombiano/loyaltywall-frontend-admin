// ReactJS
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// Hooks
// import useModuleActions from "../../hooks/useModuleActions";

// Components
import CustomPagination from "../../main/adapters/primary/CompleteGridComponent/CustomPagination";

// Shared
import InputSearch from "../../shared/components/Search";
import InputSelect from "../../shared/components/Select";
import NavHeader from "../../shared/components/NavHeader";
import TableComponent from "../../shared/components/Table";

// Constants
import { RolesHeader } from "../../constants/headers";

// Services
import { getRolesPagination } from "../../service/roles";
import { getAllSites } from "../../service/sites";

// Styled
import { RolesContainer } from "./styled";

export default function SitesPage() {
    // Translation
    const { t } = useTranslation();

    // Hooks
    // const { module } = useModuleActions("Sites");

    // LocalStorage
    const accessToken = localStorage.getItem("access_token");

    // States
    const [searchText, setSearchText] = useState("");

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedSite, setSelectedSite] = useState(0);
    const [totalRoles, setTotalRoles] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    const [rows, setRows] = useState<ISitesBody[]>([]);
    const [sites, setSites] = useState<IOption[]>([]);

    // Constants
    const totalPages = Math.ceil(totalRoles / pageSize);

    // Functions
    const handlePageChange = (params: { searchText: string, page: number, limitCurrent: number, isActive?: boolean }) => {
        setIsLoading(true);

        setLimit(params.limitCurrent);

        setPage(params.page);

        const siteToSend = selectedSite > 0 ? selectedSite : "";

        getRolesPagination(params.page, params.limitCurrent, siteToSend, accessToken as string, params.searchText)
            .then((res: any) => {
                setRows(res.data);
                setTotalRoles(res.data.length);
            })
            .catch(() => {
                setRows([]);
                setTotalRoles(0);
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
            isActive: true
        });
    };

    // Effects
    useEffect(() => {
        handlePageChange({
            searchText: searchText,
            page: page,
            limitCurrent: limit,
            isActive: true
        });
    }, []);

    // Effects
    useEffect(() => {
        getAllSites()
            .then((res: any) => {
                setSites([{
                    value: undefined,
                    label: t("Constants.status.all")
                }]);
                res.data.map((item: ISitesBody) => {
                    setSites((oldArray) => [...oldArray, { value: item.idSite, label: item.name }]);
                });
            })
            .catch((err: any) => {
                console.log(err);
            });

        handlePageChange({
            searchText: searchText,
            page: page,
            limitCurrent: limit,
        });

    }, [selectedSite]);

    return (
        <RolesContainer>
            <NavHeader title={`${t("Roles.title")} (${totalRoles})`}>
                <InputSearch onSearch={handleSearchChange} setSearch={setSearchText} search={searchText} />
                <InputSelect
                    item={selectedSite}
                    label={t("Constants.label.site")}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setSelectedSite(e.target.value as unknown as number);
                    }}
                    options={sites}
                    style={{ width: "50%" }}
                />
            </NavHeader>

            <TableComponent module="roles" tableHeader={RolesHeader} tableRows={rows} isLoading={isLoading}>
                <CustomPagination
                    handlePageChange={handlePageChange}
                    page={page}
                    pageSize={pageSize}
                    searchText={searchText}
                    setPage={setPage}
                    setPageSize={setPageSize}
                    totalCategory={totalRoles}
                    totalPages={totalPages}
                />
            </TableComponent>
        </RolesContainer>
    );
}
