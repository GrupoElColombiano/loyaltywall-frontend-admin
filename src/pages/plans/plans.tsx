// ReactJS
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// MUI
import { FormControl, InputLabel, MenuItem, Modal, Select } from "@mui/material";

// Shared
import { BtnPrimary, BtnSecondary } from "../../shared/components/Buttons";
import CardComponent from "../../shared/components/Card";
import InputSearch from "../../shared/components/Search";
import NavHeader from "../../shared/components/NavHeader";
import TableComponent from "../../shared/components/Table";

// Components
import CustomPagination from "../../main/adapters/primary/CompleteGridComponent/CustomPagination";

// Services
import { fetchDataModal, getListPlans } from "../../service/plans/plans.service";

// Constants
import { PlansHeader } from "../../constants/headers";

// External Dependences
import Swal from "sweetalert2";

// Icons
import { Add } from "@mui/icons-material";

// Styles
import { PlansContainer, ModalContainer, BtnContainer } from "./styled";

export default function ListPlans() {
    // Navigation
    const navigate = useNavigate();

    // Translation
    const { t } = useTranslation();

    // States
    const [actionsModule, setActionsModule] = useState<IActionRole[]>([]);
    const [objectOfTypeUsers, setObjectOfTypeUsers] = useState([]);
    const [rows, setRows] = useState([]);

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalCategory, setTotalCategory] = useState(0);

    const [open, setOpen] = useState(false);

    const [searchText, setSearchText] = useState("");
    const [typeOfUserToCreate, setTypeOfUserToCreate] = useState("");

    // Constants
    const totalPages = Math.ceil(totalCategory / pageSize);

    // Functions
    const handlePageChange = (params: { searchText: string, page: number, limitCurrent: number }) => {
        setLimit(params.limitCurrent);
        setPage(params.page);
        console.log("Executed here::1");
        getListPlans(params.page, params.limitCurrent, params.searchText, "", (result: any) => {
            if (result.code == "ERR_BAD_REQUEST") {
                setRows([]);
                setTotalCategory(0);
                return;
            }

            if (result.status == 200) {
                setRows(result.data.data);
                setTotalCategory(result.data.totalPlans);
                return;
            }

            if (result.response.data.status == 406) return;

            if (result.response.data.status == 201) return;

            if (result.response.data.status == 404) return;

        });
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setTypeOfUserToCreate("");
        setOpen(false);
    };

    const handleAddNew = () => {
        fetchDataModal((result) => {
            if (result.code == "ERR_BAD_REQUEST") return;

            if (result.status == 200) {
                setObjectOfTypeUsers(result.data);
                handleOpen();
                return;
            }
          
            return;
        });
    };

    const handleSelectUserToCreate = (event: any) => {
        setTypeOfUserToCreate(event.target.value as string);
    };    

    const handleSearchChange = () => {
        console.log(" EL BUSCADOR OK ", searchText);
        handlePageChange({ searchText: searchText, page: page, limitCurrent: limit });
    };

    const handleConfirm = () => {
        if (typeOfUserToCreate === "") return;       

        navigate(
            "/plans/new",
            {
                state: { typeOfUser: typeOfUserToCreate }
            }
        );
    };
 
    // Effects
    useEffect(() => {
        if(localStorage.getItem("1")){
            const productoModuleData = JSON.parse(localStorage.getItem("1") || "{}");
            setActionsModule(productoModuleData); // Guarda el productoModule en el estado
            handlePageChange({ searchText: searchText, page: 1, limitCurrent: 10 });
        }else{
            alert("Por favor inicie de nuevo sesion para recuperar los permisos");
        }
        handlePageChange({ searchText: searchText, page: 1, limitCurrent: 10 });
    }, []);

    return (
        <PlansContainer>
            <NavHeader title={`${t("Plan.title")} (${totalCategory})`} >
                {actionsModule && actionsModule.find(action => action.description === "Buscar" && action.role != null) && (
                    <InputSearch onSearch={handleSearchChange} setSearch={setSearchText} search={searchText} />
                )}

                {actionsModule && actionsModule.find(action => action.description === "Crear" && action.role != null) && (
                    <BtnPrimary onClick={handleAddNew}>
                        <Add />
                        {t("Sites.button.add")}
                    </BtnPrimary>
                )}
            </NavHeader>

            {actionsModule && actionsModule.find(action => action.description === "Listar" && action.role != null) && (
                <TableComponent module="plans" tableHeader={PlansHeader} tableRows={rows}>
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
            )}

            <Modal
                aria-describedby="modal-modal-description"
                aria-labelledby="modal-modal-title"
                onClose={handleClose}
                open={open}
            >
                <ModalContainer>
                    <CardComponent
                        description={t("Plan.newPlan.alert.create.description")}
                        title={t("Plan.newPlan.alert.create.title")}
                    >
                        <FormControl fullWidth>
                            <InputLabel id="simple-select-label">{t("Plan.newPlan.alert.create.user")}</InputLabel>
                            <Select
                                labelId="simple-select-label"
                                id="simple-select"
                                value={typeOfUserToCreate}
                                label="Usuario"
                                onChange={handleSelectUserToCreate}
                                placeholder="Seleccione..."
                            >
                                {objectOfTypeUsers.map((userType: any) => (
                                    <MenuItem key={userType.id} value={userType.id}>
                                        {userType.description}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    
                        <BtnContainer justifyContent="space-between">
                            <BtnSecondary onClick={() => {
                                Swal.fire({
                                    title: t("Alert.exit.gamification.title"),
                                    text: t("Alert.exit.gamification.text"),
                                    confirmButtonText: t("Alert.button.confirm"),
                                    confirmButtonColor: "#4073FF",
                                    cancelButtonText: t("Alert.button.cancel"),
                                    cancelButtonColor: "#EF5350",
                                    icon: "error",
                                    showCancelButton: true,
                                    customClass: {
                                        container: "my-swal-container",
                                    }
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        handleClose();                            
                                    }
                                });
                            }}>
                                {t("Alert.button.cancel")}
                            </BtnSecondary>
                            <BtnPrimary onClick={handleConfirm}>
                                {t("Alert.button.accept")}
                            </BtnPrimary>
                        </BtnContainer>
                    </CardComponent>
                </ModalContainer>
            </Modal>
        </PlansContainer>
    );
}
