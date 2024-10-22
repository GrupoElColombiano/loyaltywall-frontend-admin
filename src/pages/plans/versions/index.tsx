import { t } from "i18next";
import NavHeader from "../../../shared/components/NavHeader";
import { PlansContainer } from "../styled";
import TableComponent from "../../../shared/components/Table";
import CustomPagination from "../../../main/adapters/primary/CompleteGridComponent/CustomPagination";

import {  useEffect, useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import "../../../main/utils/pagination.css";
import { getListPlans, getPlanVersioning } from "../../../service/plans/plans.service";
// MUI X
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import InputSearch from "../../../shared/components/Search";
import { PlanVersionsHeader } from "../../../constants/headers";
import InputSelect from "../../../shared/components/Select";
import { StatusOptions } from "../../../constants/options";
import { useParams } from "react-router-dom";

const VersionPlans = () => {

    const { planId } = useParams();
    
    const [searchText, setSearchText] = useState("");
    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [rows, setRows] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [totalCategory, setTotalCategory] = useState(0);
    const [limit, setLimit] = useState(5);
    const [pageSize, setPageSize] = useState(5); // Estado para almacenar el tamaño de página
    const totalPages = Math.ceil(totalCategory / pageSize);
    // Main Modal selectedUserType
        
    const [isActive, setIsActive] = useState<string | undefined>(undefined);
    const [datePick, setDatePick] = useState<any>();

    const handlePageChange = (params: { searchText: string, page: number, limitCurrent: number }) => {

        setLimit(params.limitCurrent);
        setPage(params.page);
        getListPlans(params.page, params.limitCurrent, params.searchText, "", (result: any) => {
            if (result.code == "ERR_BAD_REQUEST") {
                // toast.error("" + result.response.data.message);
                setRows([]);
                setTotalCategory(0);
                return;
            }

            if (result.status == 200) {
            //     toast.success(result.statusText);
            //    setRows(result.data.data);
            //    setTotalCategory(result.data.totalPlans);
                return;
            }

            if (result.response.data.status == 406) {
                return;
            }

            if (result.response.data.status == 201) {
                return;
            }

            if (result.response.data.status == 404) {
                return;
            }

        });

        
    };

    const handleSearchChange = () => {
        handlePageChange({ searchText: searchText, page: page, limitCurrent: limit });
    };
    // Effects
    useEffect(() => {

        const fetchPlanVersioning = async () => {
            try {
                const response = await getPlanVersioning(parseInt(planId!));
                if(response.status == 200){
                    setRows(response.data.versioningData);
                    setTotalCategory(response.data.versioningData.length)
                }
                // setPlanData(response.data);
                // setLoading(false);
            } catch (err) {
                console.log(" EL err ES ", err);
                // setError(err);
                // setLoading(false);
            }
        };
    
        fetchPlanVersioning();
        handlePageChange({ searchText: searchText, page: 1, limitCurrent: 10 });
    }, []);
    
    return (
        <PlansContainer>
            <NavHeader title={`${t("Plan.viewVersion.tittle")} (${totalCategory})`}  isBack={true} >
                
                <InputSearch onSearch={handleSearchChange} setSearch={setSearchText} search={searchText} />
                <InputSelect
                    item={isActive}
                    label={t("Constants.label.status")}
                    options={StatusOptions}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {                        
                        setIsActive(e.target.value as unknown as string);
                    }}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={datePick} 
                        onChange={(newValue) => setDatePick(newValue)} 
                        label="Fecha de finalización"
                        sx={{ width: "50%", backgroundColor: "#fff" }}
                    />
                </LocalizationProvider>
            </NavHeader>

            <TableComponent module="planVersions" tableHeader={PlanVersionsHeader} tableRows={rows}>
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
        </PlansContainer>
    );
};

export default VersionPlans;
