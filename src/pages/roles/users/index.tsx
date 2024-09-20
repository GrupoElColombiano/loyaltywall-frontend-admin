// ReactJS
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// Components
import CustomPagination from "../../../main/adapters/primary/CompleteGridComponent/CustomPagination";

// Shared
import InputSearch from "../../../shared/components/Search";
import InputSelect from "../../../shared/components/Select";
import NavHeader from "../../../shared/components/NavHeader";
import TableComponent from "../../../shared/components/Table";

// Constants
import { RolesUsersHeader } from "../../../constants/headers";
import { StatusOptions } from "../../../constants/options";

// Services
import { getRolesByUser } from "../../../service/roles";

// Styled
import { RolesContainer } from "../styled";

export default function SitesPage() {
    // Translation
    const { t } = useTranslation();

    // LocalStorage
    const accessToken = localStorage.getItem("access_token");
    const myRol = localStorage.getItem("rolToUser");

    // States
    const [isActive, setIsActive] = useState<string | undefined>(undefined);

    const [searchText, setSearchText] = useState("");

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalUsers, setTotalUsers] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    const [rows, setRows] = useState<ISitesBody[]>([]);

    // Constants
    const totalPages = Math.ceil(totalUsers / pageSize);

    const rolCurrent = myRol ? JSON.parse(myRol) : {};

    // Functions
    const handlePageChange = (params: { searchText: string, page: number, limitCurrent: number, isActive?: boolean }) => {
        setIsLoading(true);

        setLimit(params.limitCurrent);

        setPage(params.page);

        getRolesByUser(accessToken as string, rolCurrent?.name)
            .then((response: any) => {
                setRows(response.data);
                setTotalUsers(response?.data?.length);
            })
            .catch(() => {
                setRows([]);
                setTotalUsers(0);
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

    // Effects
    useEffect(() => {
        handlePageChange({
            searchText: searchText,
            page: page,
            limitCurrent: limit,
            isActive: isActive === undefined ? undefined : isActive === "true" ? true : false
        });
    }, [isActive]);

    return (
        <RolesContainer>
            <NavHeader title={`${t("Users.title")} - ${rolCurrent?.name} (${totalUsers})`} isBack >
                <InputSearch onSearch={handleSearchChange} setSearch={setSearchText} search={searchText} />

                <InputSelect
                    item={isActive}
                    label={t("Constants.label.status")}
                    options={StatusOptions}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setIsActive(e.target.value as unknown as string);
                    }}
                />
            </NavHeader>

            <TableComponent module="roles-users" tableHeader={RolesUsersHeader} tableRows={rows} isLoading={isLoading}>
                <CustomPagination
                    handlePageChange={handlePageChange}
                    page={page}
                    pageSize={pageSize}
                    searchText={searchText}
                    setPage={setPage}
                    setPageSize={setPageSize}
                    totalCategory={totalUsers}
                    totalPages={totalPages}
                />
            </TableComponent>
        </RolesContainer>
    );
}