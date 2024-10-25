// ReactJS
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// import { Button  } from "@mui/material";
// Hooks
// import useModuleActions from "../../hooks/useModuleActions";

// Components
import CustomPagination from "../../../main/adapters/primary/CompleteGridComponent/CustomPagination";

// Shared
import { BtnOutLinedFunction, BtnPrimary } from "../../../shared/components/Buttons";
import InputSearch from "../../../shared/components/Search";
import InputSelect from "../../../shared/components/Select";
import NavHeader from "../../../shared/components/NavHeader";
import TableComponent from "../../../shared/components/Table";

// Constants
import { UsersClientHeader } from "../../../constants/headers";

// Services
import { authenticationClient, getAllSites } from "../../../service/sites";
import { getUsersListClientsPagination } from "../../../service/usersKeycloack/usersKeycloack.service";

// Styled
import { UsersContainer } from "./styled";

// Icons
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DeleteIcon from "@mui/icons-material/Delete";
// import ModalAuthClient from "../modals/ModalAuthClient";
// import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function UsersClientsPage() {
    // Translation
    const { t } = useTranslation();

    // Hooks
    // const { module } = useModuleActions("Sites");

    // LocalStorage
    let accessToken = "";
    const rolStorage = localStorage.getItem("rolUser");
    const rolJson = rolStorage ? JSON?.parse(rolStorage) : {};

    // States
    const [searchText, setSearchText] = useState("");

    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedSite, setSelectedSite] = useState(0);
    const [totalUSers, setTotalUsers] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    const [rows, setRows] = useState<ISitesBody[]>([]);
    const [sites, setSites] = useState<IOption[]>([]);

    // Constants
    const totalPages = Math.ceil(totalUSers / pageSize);

    // Functions
    const handlePageChange = (params: { searchText: string, page: number, limitCurrent: number, isActive?: boolean }) => {
        setIsLoading(true);

        setLimit(params.limitCurrent);

        setPage(params.page);       

        getUsersListClientsPagination(
            localStorage.getItem("accessTokenClient"),
            {
                search: params.searchText,  
                enabled: "true", //params.isActive?.toString() || "false",
                page: params.page.toString(),
                limit: params.limitCurrent.toString(),
                role: rolJson.id
            }, 
            (result) => {

                if (result.code == "ERR_BAD_REQUEST") return;               
    
                if (result.status === 200) {
                    setRows(result?.data?.data ?? []);
                    setTotalUsers(result?.data?.total ?? 0);
                    setIsLoading(false);
                    return;
                }
            }
        );
    };

    const handleSearchChange = () => {
        handlePageChange({
            searchText: searchText,
            page: page,
            limitCurrent: limit,
            isActive: true
        });
    };

    const handleFilterClick = () => {
        setIsFilterVisible(!isFilterVisible);
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
    
    useEffect(() => {        
        handlePageChange({
            searchText: searchText,
            page: page,
            limitCurrent: limit,
            isActive: true
        });
    }, [accessToken]);
    
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
    
    // const [modal, setModal] = useState({
    //     data: [],
    //     open: true
    // });   


    const handleConfirmToken= (token: any) => {
        console.log(" RECUPERANDO EL TOKEN ", token);
        accessToken = token;
        handlePageChange({
            searchText: searchText,
            page: page,
            limitCurrent: limit,
            isActive: true
        });
    };

    useEffect(() => {
        authenticationClient('', '')
        .then((result) => {             
            const accessToken =  result.data.access_token;
            localStorage.setItem("accessTokenClient", accessToken);
            handleConfirmToken(accessToken);
        })
        .catch((err: any) => {
            toast.error("" + err);
        });
    }, [])
    

    // const openModalAuthClient = () =>{
    //     setModal({
    //         data: [],
    //         open: true
    //     });
    // };

    return (
        <UsersContainer>
            <NavHeader title={`${t("Users.client.tittle")} (${totalUSers})`} >
                {/* <Button onClick={openModalAuthClient}>Autenticarse </Button> */}
                <InputSearch onSearch={handleSearchChange} setSearch={setSearchText} search={searchText} />
            </NavHeader>

            {/* <ModalAuthClient modal={modal} setModal={setModal} editData={null} handleConfirmToken={handleConfirmToken}/> */}

            <div 
                className={`animated-component ${isFilterVisible ? "show" : ""}`}
                style={{
                    backgroundColor: "#E9EFFF",
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    gap: "10px",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    borderRadius: "8px",
                }}
            >
                <InputSelect
                    item={selectedSite}
                    label={t("Users.client.filter.site")}
                    onChange={(e) => {
                        setSelectedSite(e.target.value as unknown as number);
                    }}
                    options={sites}
                    style={{ width: "240px", display: isFilterVisible ? "flex" : "none"}}
                />
                <InputSelect
                    item={selectedSite}
                    label={t("Users.client.filter.subscription")}
                    onChange={(e) => {
                        setSelectedSite(e.target.value as unknown as number);
                    }}
                    options={sites}
                    style={{ width: "240px", display: isFilterVisible ? "flex" : "none" }}
                />
                <InputSelect
                    item={selectedSite}
                    label={t("Users.client.filter.userType")}
                    onChange={(e) => {
                        setSelectedSite(e.target.value as unknown as number);
                    }}
                    options={sites}
                    style={{ width: "240px", display: isFilterVisible ? "flex" : "none"}}
                />
                <BtnOutLinedFunction onClick={handleFilterClick}
                    style={{
                        height: "42px", display: isFilterVisible ? "flex" : "none"
                    }}>
                    <DeleteIcon />
                    {t("Users.client.filter.clear")}
                </BtnOutLinedFunction>
                <BtnPrimary onClick={handleFilterClick}
                    style={{
                        height: "42px", display: isFilterVisible ? "flex" : "none", marginRight: "16px"
                    }}>
                    <FilterAltIcon />
                    {t("Users.client.filter.search")}
                </BtnPrimary>
            </div>
            
            <TableComponent module="users-clients" tableHeader={UsersClientHeader} tableRows={rows} isLoading={isLoading}>
                <CustomPagination
                    handlePageChange={handlePageChange}
                    page={page}
                    pageSize={pageSize}
                    searchText={searchText}
                    setPage={setPage}
                    setPageSize={setPageSize}
                    totalCategory={totalUSers}
                    totalPages={totalPages}
                />
            </TableComponent>
        </UsersContainer>
    );
}
