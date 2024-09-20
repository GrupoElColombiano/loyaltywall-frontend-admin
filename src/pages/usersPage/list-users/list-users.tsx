import { Search, Clear } from "@mui/icons-material";
import { TextField, InputAdornment, Button, IconButton } from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { getListPlans } from "../../../service/plans/plans.service";
import SelectWithClear from "../../../main/adapters/primary/SelectWithClear";
import CustomComponent from "../../../main/adapters/primary/CompleteGridComponent/CompleteGridComponent";

const ListUsers = () => {
    // Translation
    const { t } = useTranslation();

    // Navigation
    const navigate = useNavigate();

    // States
    const [searchText, setSearchText] = useState("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [rows, setRows] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [totalCategory, setTotalCategory] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pageSize, setPageSize] = useState(10); // Estado para almacenar el tamaño de página
    const totalPages = Math.ceil(totalCategory / pageSize);
    const [isActive, setIsActive] = useState<string | undefined>("");
    const [/* filterStatus */, setFilterStatus] = useState<boolean>();
    const statusOptions = [
        { activityID: 1, activity: t("User.filter.active"), value: true },
        { activityID: 2, activity: t("User.filter.inactive"), value: false },
    ];
    const [tittlePage, setTittlePage] = useState<string>(t("User.tittle"));
    const location = useLocation();

    // Functions

    const handlePageChange = (params: { searchText: string, page: number, limitCurrent: number, isActive?: boolean }) => {

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
                // toast.success(result.statusText);
                setRows(result.data.data);
                setTotalCategory(result.data.totalPlans);
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

    const columns: GridColDef[] = [
        { field: "name", headerName: t("User.headerName.name"), flex: 1, minWidth: 150 },
        { field: "email", headerName: t("User.headerName.email"), flex: 1, minWidth: 200 },
        { field: "role", headerName: t("User.headerName.role"), flex: 1, minWidth: 150 },
        {
            field: "isActive", headerName: t("User.headerName.status"), flex: 1,
            valueGetter: (params) => (params.value ? "Activo" : "Inactivo"),
            minWidth: 150,
            renderCell: renderStatusCell
        },
        { field: "actions", headerName: t("User.headerName.actions"), width: 150, renderCell: renderActionsCell, headerAlign: "center" }
    ];

    function renderStatusCell(params: any) {
        const status = params.value == "Activo" ? "Activo" : "Inactivo";
        const statusColor = params.value == "Activo" ? "#4CAF50" : "#BDBDBD";
        const labelColor = params.value == "Activo" ? "#1B5E20" : "#606A84";
        return (
            <div style={{
                background: statusColor,
                borderRadius: "100px",
                color: labelColor,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "13px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "18px",
                letterSpacing: "0.16px",
                width: "58px",
                height: "32px"
            }}
            >
                {status}
            </div>
        );
    }

    function renderActionsCell(params: GridRenderCellParams<any>) {

        const handleEdit = () => {
            navigate("edit", { state: params.row });
        };
        return (
            <>
                <Button onClick={() => { handleEdit(); }} startIcon={<EditOutlinedIcon style={{ color: "#000000" }} />} />
            </>

        );
    }



    const handleKeyDown = (event: any) => {
        if (event.keyCode == 13) {
            const boleanActive = isActive == "1";
            handlePageChange({ searchText: searchText, page: page, limitCurrent: limit, isActive: boleanActive });
        }

    };

    const handleFilterStatus = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedValue = event.target.value;
        const newFilterStatus = selectedValue == "1";
        setFilterStatus(newFilterStatus);
    };

    const handleSearchChange = (event: any) => {
        setSearchText(event.target.value);
    };

    const handleClearSearch = () => {
        setSearchText("");
        const boleanActive = isActive == "1";
        handlePageChange({ searchText: "", page: 1, limitCurrent: limit, isActive: boleanActive });
    };

    const handleAddNew = () => {
        navigate("new");
    };

    function renderFilterBox() {
        return (
            <>
                <TextField
                    sx={{
                        width: "100%",
                        marginBottom: "10px",
                        "@media (min-width: 685px)": {
                            width: "300px",
                            marginRight: "10px",
                            marginBottom: "0",
                        },
                    }}
                    label={t("Sites.searchBar.label")}
                    value={searchText}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                {searchText && (
                                    <IconButton onClick={handleClearSearch} edge="end">
                                        <Clear />
                                    </IconButton>
                                )}
                            </InputAdornment>
                        ),
                    }}
                />
                <SelectWithClear
                    style={{ width: "50%", marginRight: "10px" }}
                    label="Rol"
                    value={isActive}
                    onChange={handleFilterStatus}
                    onClear={() => { setFilterStatus(undefined); setIsActive(undefined); }}
                    data={statusOptions}
                    dataIdKey="activityID"
                    dataNameKey="activity"
                />
            </>

        );
    }

    // Effects
    useEffect(() => {
        handlePageChange({ searchText: searchText, page: 1, limitCurrent: 10, isActive: undefined });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        if (location.state) {
            setTittlePage(tittlePage + " - " + location.state.message);
        }
    }, [location.state]);

    return (
        <CustomComponent
            labelButtonToolbar={t("User.button.add")}
            tittlePage={tittlePage}
            ComponentSearch={renderFilterBox}
            totalCategory={totalCategory}
            searchText={searchText}
            handleAddNew={handleAddNew}
            columns={columns}
            rows={rows}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            nameOfIdInRow={"idPlan"}
            goBack={true}
        />
    );
};

export default ListUsers;
