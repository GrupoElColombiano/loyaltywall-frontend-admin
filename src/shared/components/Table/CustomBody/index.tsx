// ReactJS
import { Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// MUI
import { Checkbox, Chip, IconButton, Tooltip } from "@mui/material";
import { EditOutlined, ManageAccountsOutlined, PeopleAltOutlined, ViewComfyAltOutlined, WebOutlined, VisibilityOutlined } from "@mui/icons-material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import RestoreRoundedIcon from "@mui/icons-material/RestoreRounded";

// Components
import { TableSkeleton } from "../../Skeletons";
import ModalConfigClustersPenalization from "../../../../components/gamification/modals/ModalConfigClustersPenalization";
import ModalConfigEventPonderation from "../../../../components/gamification/modals/ModalConfigEventPonderation";
import ModalConfigPointsExpiration from "../../../../components/gamification/modals/ModalConfigPointsExpiration";
import ModalRolSites from "../../../../main/adapters/primary/ModalAssignmentSites/ModalAssignmentSites";
import ModalSites from "../../../../components/roles/ModalSites";
import ModalTemplate from "../../../../components/templates/modals/ModalTemplate";

// Constants
import { formatMoneyCOP } from "../../../../constants/functions";

// Service
import { getPointValueBySite, removePointEvent, deleteOneCluesterEvent } from "../../../../service/gamification";

// External Dependencies
import Swal from "sweetalert2";

// Styled
import { StyledTableCell, StyledTableRow } from "../styled";

function RolesBody({ tableRows }: { tableRows: IRolesBody[] }) {
    // Translation
    const { t } = useTranslation();

    // States
    const [rolName, setRolName] = useState("");
    const [selectedId, setSelectedId] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [showModalSites, setShowModalSites] = useState(false);

    // Functions
    const handleViewUsers = (data: IRolesBody) => {
        const rolCurrent = {
            id: data.id,
            name: data.name,
            composite: data.composite,
            clientRole: data.clientRole,
            containerId: data.containerId
        };
        localStorage.setItem("rolToUser", JSON.stringify(rolCurrent));
    };

    const handleEdit = (data: IRolesBody) => {
        const rolCurrent = {
            id: data.id,
            name: data.name,
            composite: data.composite,
            clientRole: data.clientRole,
            containerId: data.containerId
        };

        localStorage.setItem("rol", JSON.stringify(rolCurrent));
    };

    const handleShowModalConfig = (data: IRolesBody) => {
        if (data?.id) {
            setShowModal(true);
            setSelectedId(data?.id);
            setRolName(data?.name);
        }
    };

    const handleShowModalSites = (data: IRolesBody) => {        
        if (data?.id) {
            setShowModalSites(true);
            setSelectedId(data?.id);
            setRolName(data?.name);
        }
    };  

    return (
        <Fragment>
            {tableRows?.map((row: IRolesBody) => (
                <StyledTableRow key={row.id}>
                    <StyledTableCell align="left">{row.name}</StyledTableCell>
                    <StyledTableCell align="left">{row.description || "-"}</StyledTableCell>
                    <StyledTableCell align="center">
                        <Link to="/roles/permissions" state={{ data: row }} onClick={() => handleEdit(row)}>
                            <Tooltip title={t("Constants.tooltip.permissions")}>
                                <IconButton>
                                    <ManageAccountsOutlined />
                                </IconButton>
                            </Tooltip>
                        </Link>
                        <Link to="/roles/users" onClick={() => handleViewUsers(row)}>
                            <Tooltip title={t("Constants.tooltip.users")}>
                                <IconButton>
                                    <PeopleAltOutlined />
                                </IconButton>
                            </Tooltip>
                        </Link>
                        <Tooltip title={t("Constants.tooltip.assign")}>
                            <IconButton onClick={() => handleShowModalConfig(row)}>
                                <WebOutlined />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={t("Constants.tooltip.sites")}>
                            <IconButton onClick={() => handleShowModalSites(row)}>
                                <ViewComfyAltOutlined />
                            </IconButton>
                        </Tooltip>
                    </StyledTableCell>

                </StyledTableRow>
            ))}
            
            {showModal && <ModalRolSites idRol={selectedId} openProp={true} setShowModal={setShowModal} setSelectedId={setSelectedId} roleName={rolName} />}

            {showModalSites && <ModalSites handleClose={() => setShowModalSites(false)} open={showModalSites} idPlan={selectedId} roleName={rolName} />}
        </Fragment>
    );
}

function SitesBody({ tableRows }: { tableRows: ISitesBody[] }) {
    // Translation
    const { t } = useTranslation();

    const [actionsModule, setActionsModule] = useState<IActionRole[]>([]);

    useEffect(() => {

        if(localStorage.getItem("5")){
            const productoModuleData = JSON.parse(localStorage.getItem("5") || "{}");
            setActionsModule(productoModuleData); // Guarda el productoModule en el estado
        }else{
            alert("Por favor inicie de nuevo sesion para recuperar los permisos");
        }
    }, []);

    return (
        tableRows?.map((row: ISitesBody) => (
            <StyledTableRow key={row.idSite}>
                <StyledTableCell component="th" scope="row">#{row.idSite}</StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.description}</StyledTableCell>
                <StyledTableCell align="center">{row.url}</StyledTableCell>
                <StyledTableCell align="center">
                    {row.isActive
                        ? <Chip label={t("Constants.status.active")} style={{ backgroundColor: "#4CAF50", color: "#1B5E20" }} />
                        : <Chip label={t("Constants.status.inactive")} style={{ backgroundColor: "#0000001F", color: "#606A84" }} />
                    }
                </StyledTableCell>
                <StyledTableCell align="center">{row.createAt.split("T")[0]}</StyledTableCell>
                <StyledTableCell align="center">{row.updateAt.split("T")[0]}</StyledTableCell>
                <StyledTableCell align="center">
                    {actionsModule && actionsModule.find(action => action.description === "Actualizar" && action.role != null) && (

                        <Link to={`/sites/edit/${row.idSite}`} state={{ data: row }}>
                            <Tooltip title={t("Constants.tooltip.edit")}>
                                <IconButton>
                                    <EditOutlined />
                                </IconButton>
                            </Tooltip>
                        </Link>
                    )}
                </StyledTableCell>
            </StyledTableRow>
        ))
    );
}

function UsersBody({ tableRows }: { tableRows: IUsersBody[] }) {
    // Translation
    const { t } = useTranslation();

    return (
        tableRows?.map((row: IUsersBody) => (
            <StyledTableRow key={row.idSite}>
                <StyledTableCell component="th" scope="row">#{row.idSite}</StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.description}</StyledTableCell>
                <StyledTableCell align="center">{row.url}</StyledTableCell>
                <StyledTableCell align="center">
                    {row.isActive
                        ? <Chip label={t("Constants.status.active")} color="success" />
                        : <Chip label={t("Constants.status.inactive")} color="default" />
                    }
                </StyledTableCell>
                <StyledTableCell align="center">{row.createAt.split("T")[0]}</StyledTableCell>
                <StyledTableCell align="center">{row.updateAt.split("T")[0]}</StyledTableCell>
                <StyledTableCell align="center">
                    <Link to="/">
                        <Tooltip title={t("Constants.tooltip.edit")}>
                            <IconButton>
                                <EditOutlined />
                            </IconButton>
                        </Tooltip>
                    </Link>
                </StyledTableCell>
            </StyledTableRow>
        ))
    );
}

function ProductsBody({ tableRows }: { tableRows: IProductsBody[] }) {
    // Translation
    const { t } = useTranslation();

    const [productoModule, setProductoModule] = useState<IActionRole[]>([]);

    useEffect(() => {

        if(localStorage.getItem("2")){
            const productoModuleData = JSON.parse(localStorage.getItem("2") || "{}");
            setProductoModule(productoModuleData); // Guarda el productoModule en el estado
        }else{
            alert("Por favor inicie de nuevo sesion para recuperar los permisos");
        }
    }, []);   
    
    return (
        tableRows?.map((row: IProductsBody) => (
            <StyledTableRow key={row.idProduct}>
                <StyledTableCell align="left">{row.name}</StyledTableCell>
                <StyledTableCell align="left">{row.description}</StyledTableCell>
                <StyledTableCell align="center">
                    {row.isActive
                        ? <Chip label={t("Constants.status.active")} style={{ backgroundColor: "#4CAF50", color: "#1B5E20" }} />
                        : <Chip label={t("Constants.status.inactive")} style={{ backgroundColor: "#0000001F", color: "#606A84" }} />
                    }
                </StyledTableCell>
                <StyledTableCell align="center">
                    {row.all_product
                        ? <Chip label={t("Constants.status.true")} style={{ backgroundColor: "#4CAF50", color: "#FFF" }} />
                        : <Chip label={t("Constants.status.false")} style={{ backgroundColor: "#EF5350", color: "#FFF" }} />
                    }
                </StyledTableCell>
                <StyledTableCell align="center">
                    {productoModule && productoModule.find(action => action.description === "Actualizar" && action.role != null) && (
                        <Link to={`/products/edit/${row.idProduct}`} state={{ data: row }}>
                            <Tooltip title={t("Constants.tooltip.edit")}>
                                <IconButton>
                                    <EditOutlined />
                                </IconButton>
                            </Tooltip>
                        </Link>
                    )
                    }
                </StyledTableCell>
            </StyledTableRow>
        ))
    );
}

function CategoriesBody({ tableRows }: { tableRows: ICategoriesBody[] }) {
    // Translation
    const { t } = useTranslation();

    const [actionsModule, setActionsModule] = useState<IActionRole[]>([]);

    useEffect(() => {

        if(localStorage.getItem("3")){
            const productoModuleData = JSON.parse(localStorage.getItem("3") || "{}");
            setActionsModule(productoModuleData); // Guarda el productoModule en el estado
        }else{
            alert("Por favor inicie de nuevo sesion para recuperar los permisos");
        }
    }, []);

    return (
        tableRows?.map((row: ICategoriesBody) => (
            <StyledTableRow key={row.idSite}>
                <StyledTableCell align="left">{row.name}</StyledTableCell>
                <StyledTableCell align="left">{row.description}</StyledTableCell>
                <StyledTableCell align="center">{row.productName}</StyledTableCell>
                <StyledTableCell align="center">
                    {actionsModule && actionsModule.find(action => action.description === "Actualizar" && action.role != null) && (

                        <Link to={`/categories/edit/${row.idCategory}/${row.idProduct}`} state={{ data: row }}>
                            <Tooltip title={t("Constants.tooltip.edit")}>
                                <IconButton>
                                    <EditOutlined />
                                </IconButton>
                            </Tooltip>
                        </Link>
                    )
                    }
                </StyledTableCell>
            </StyledTableRow>
        ))
    );
}

function PlansBody({ tableRows }: { tableRows: IPlansBody[] }) {
    // Translation
    const { t } = useTranslation();

    const [actionsModule, setActionsModule] = useState<IActionRole[]>([]);

    useEffect(() => {

        if(localStorage.getItem("1")){
            const productoModuleData = JSON.parse(localStorage.getItem("1") || "{}");
            setActionsModule(productoModuleData); // Guarda el productoModule en el estado
        }else{
            alert("Por favor inicie de nuevo sesion para recuperar los permisos");
        }
    }, []);

    return (
        tableRows?.map((row: IPlansBody) => (
            <StyledTableRow key={row.idPlan}>
                <StyledTableCell component="th" scope="row">#{row.idPlan}</StyledTableCell>
                <StyledTableCell align="left">{row.name}</StyledTableCell>
                <StyledTableCell align="left">{row.description}</StyledTableCell>
                <StyledTableCell align="center">{row.userType}</StyledTableCell>
                <StyledTableCell align="center">
                    {row.isActive
                        ? <Chip label={t("Constants.status.active")} style={{ backgroundColor: "#4CAF50", color: "#1B5E20" }} />
                        : <Chip label={t("Constants.status.inactive")} style={{ backgroundColor: "#0000001F", color: "#606A84" }} />
                    }
                </StyledTableCell>
                <StyledTableCell align="center">{row.createdAt.split("T")[0]}</StyledTableCell>
                <StyledTableCell align="center">{row.updatedAt.split("T")[0]}</StyledTableCell>
                <StyledTableCell align="center">
                    <Link to={`/plans/view/${row.idPlan}`} state={{ data: row }}>
                        <Tooltip title={t("Constants.tooltip.view")}>
                            <IconButton>
                                <VisibilityOutlined />
                            </IconButton>
                        </Tooltip>
                    </Link>
                    {actionsModule && actionsModule.find(action => action.description === "Actualizar" && action.role != null) && (
                        <Link to={`/plans/edit/${row.idPlan}`} state={{ plan: row, typeOfUser: row?.userType }}>
                            <Tooltip title={t("Constants.tooltip.edit")}>
                                <IconButton>
                                    <EditOutlined />
                                </IconButton>
                            </Tooltip>
                        </Link>
                    )}
                    <IconButton style={row?.userType !== "Suscrito" ? { opacity: 0.5 } : {}} disabled={row?.userType !== "Suscrito"}>
                        <Link to={`/plans/versions/${row.idPlan}`} state={{ data: row }} style={{ color: "#606A84" }}>
                            <Tooltip title={t("Constants.tooltip.version")}>
                                <RestoreRoundedIcon />
                            </Tooltip>
                        </Link>
                    </IconButton>
                </StyledTableCell>
            </StyledTableRow>
        ))
    );
}

function PlansVersionBody({ tableRows }: { tableRows: IPlansBody[] }) {
    // Translation
    const { t } = useTranslation();
    console.log(" AQUI ", tableRows);
    return (
        tableRows?.map((row: IPlansBody) => (
          
            <StyledTableRow key={row.idPlan}>
                <StyledTableCell component="th" scope="row">{row.idVersionPlan}</StyledTableCell>
                <StyledTableCell align="left">{row.name}</StyledTableCell>
                <StyledTableCell align="left">{row.description}</StyledTableCell>
                <StyledTableCell align="left">{row.userType}</StyledTableCell>
                <StyledTableCell align="center">
                    {row.isActive
                        ? <Chip label={t("Constants.status.active")} style={{ backgroundColor: "#4CAF50", color: "#1B5E20" }} />
                        : <Chip label={t("Constants.status.inactive")} style={{ backgroundColor: "#0000001F", color: "#606A84" }} />
                    }
                </StyledTableCell>
                <StyledTableCell align="left">{row.createdAt}</StyledTableCell>
                <StyledTableCell align="center">
                    <Link to={`/plans/view/${row.idPlan}/${row.idVersionPlan}`}>
                        <Tooltip title={t("Constants.tooltip.edit")}>
                            <IconButton>
                                <RemoveRedEyeOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                    </Link>
                </StyledTableCell>
            </StyledTableRow>
        ))
    );
}

function TemplatesBody({ tableRows, isSelected, handleClick }: { tableRows: ITemplatesBody[], isSelected: (data: any) => boolean, handleClick: (data: any) => void }) {
    // Translation
    const { t } = useTranslation();

    // States
    const [modal, setModal] = useState(false);

    const [selectedData, setSelectedData] = useState(null);

    const [actionsModule, setActionsModule] = useState<IActionRole[]>([]);

    // Functions
    const handleConfirm = (data: any) => {
        setSelectedData(data);
        setModal(true);
    };

    const handleGoBack = () => {
        Swal.fire({
            title: t("Alert.exit.title"),
            text: t("Alert.exit.text"),
            icon: "question",
            showCancelButton: true,
            confirmButtonText: t("Alert.button.confirm"),
            confirmButtonColor: "#0045FF",
            cancelButtonText: t("Alert.button.cancel"),
            cancelButtonColor: "#7E2EFF",
            customClass: {
                container: "my-swal-container",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                setModal(false);
            }
        });
    };

    // Effects
    useEffect(() => {
        if (localStorage.getItem("7")){
            const productoModuleData = JSON.parse(localStorage.getItem("7") || "{}");
            setActionsModule(productoModuleData); // Guarda el productoModule en el estado
            
        } else {
            alert("Por favor inicie de nuevo sesion para recuperar los permisos");
        }

    }, []);

    return (
        <>
            {tableRows?.map((row: ITemplatesBody) => {
                const isItemSelected = isSelected(row);
            
                return (
                    <StyledTableRow
                        aria-checked={isItemSelected}
                        key={row._id}
                        role="checkbox"
                        selected={isItemSelected}
                        tabIndex={-1}
                    >
                        <StyledTableCell padding="checkbox">
                            <Checkbox color="primary" checked={isItemSelected} onClick={() => handleClick(row)} />
                        </StyledTableCell>
                        <StyledTableCell align="left">{row.name}</StyledTableCell>
                        <StyledTableCell align="left">{row.description}</StyledTableCell>
                        <StyledTableCell align="center">
                            {row.isActive
                                ? <Chip label={t("Constants.status.active")} style={{ backgroundColor: "#4CAF50", color: "#1B5E20" }} />
                                : <Chip label={t("Constants.status.inactive")} style={{ backgroundColor: "#0000001F", color: "#606A84" }} />
                            }
                        </StyledTableCell>
                        {/* <StyledTableCell align="center">
                            {row.published
                                ? t("Templates.form.isPublished")
                                : t("Templates.form.isNotPublished")
                            }
                        </StyledTableCell> */}
                        <StyledTableCell align="center">
                            {actionsModule && actionsModule.find(action => action.description === "Actualizar" && action.role != null) && (
                                <Tooltip title={t("Templates.tooltip.edit")}>
                                    <IconButton onClick={() => handleConfirm(row)}>
                                        <EditOutlined sx={{ color: "#606A84" }} />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </StyledTableCell>
                    </StyledTableRow>
                );
            })}
            <ModalTemplate open={modal} onClose={handleGoBack} data={selectedData} isEdit />
        </>
    );
}

function AssignPlansBody({ tableRows, selected, isSelected, handleClick }: { tableRows: IAssignPlansBody[], selected: any[], isSelected: (data: any) => boolean, handleClick: (data: any) => void }) {
    // Translation
    const { t } = useTranslation();

    return (
        tableRows?.map((row: IAssignPlansBody) => {
            const isItemSelected = selected?.length > 0
                ? selected?.find((item: any) => item.idPlan === row.idPlan)
                : isSelected(row);           

            return (
                <StyledTableRow
                    aria-checked={isItemSelected}
                    key={row.idPlan}
                    role="checkbox"
                    selected={isItemSelected}
                    tabIndex={-1}
                >
                    <StyledTableCell padding="checkbox">
                        <Checkbox color="primary" checked={isItemSelected} onClick={() => handleClick(row)} />
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" padding="none">
                        {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.description}</StyledTableCell>
                    <StyledTableCell align="left">{row.userType}</StyledTableCell>
                    <StyledTableCell align="center">
                        {row.isActive
                            ? <Chip label={t("Constants.status.active")} style={{ backgroundColor: "#4CAF50", color: "#1B5E20" }} />
                            : <Chip label={t("Constants.status.inactive")} style={{ backgroundColor: "#0000001F", color: "#606A84" }} />
                        }
                    </StyledTableCell>
                </StyledTableRow>
            );
        })
    );
}

function GamificationBody({ tableRows }: { tableRows: IGamificationBody[] }) {
    // Translation
    const { t } = useTranslation();

    return (
        tableRows?.map((row: IGamificationBody) => (
            <StyledTableRow key={row.idSite}>
                <StyledTableCell component="th" scope="row">#{row.idSite}</StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.description}</StyledTableCell>
                <StyledTableCell align="center">{row.url}</StyledTableCell>
                <StyledTableCell align="center">
                    {row.isActive
                        ? <Chip label={t("Constants.status.active")} color="success" />
                        : <Chip label={t("Constants.status.inactive")} color="default" />
                    }
                </StyledTableCell>
                <StyledTableCell align="center">{row.createAt.split("T")[0]}</StyledTableCell>
                <StyledTableCell align="center">{row.updateAt.split("T")[0]}</StyledTableCell>
                <StyledTableCell align="center">
                    <Link to="/">
                        <Tooltip title={t("Constants.tooltip.edit")}>
                            <IconButton>
                                <EditOutlined />
                            </IconButton>
                        </Tooltip>
                    </Link>
                </StyledTableCell>
            </StyledTableRow>
        ))
    );
}

function RolesUsersBody({ tableRows }: { tableRows: IRolesUsersBody[] }) {
    // Translation
    const { t } = useTranslation();

    // States
    // const [selectedId, setSelectedId] = useState("");
    // const [showModalSites, setShowModalSites] = useState(false);

    // Functions
    // const handleShowModalSites = (data: IRolesUsersBody) => {
    //     if (data?.id) {
    //         setShowModalSites(true);
    //         setSelectedId(data?.id);
    //     }
    // };

    return (
        tableRows?.map((row: IRolesUsersBody) => (
            <StyledTableRow key={row.id}>
                <StyledTableCell align="left">{row.firstName + " " + row.lastName}</StyledTableCell>
                <StyledTableCell align="left">{row.email}</StyledTableCell>
                <StyledTableCell align="center">
                    {row.enabled
                        ? <Chip label={t("Constants.status.active")} style={{ backgroundColor: "#4CAF50", color: "#1B5E20" }} />
                        : <Chip label={t("Constants.status.inactive")} style={{ backgroundColor: "#0000001F", color: "#606A84" }} />
                    }
                </StyledTableCell>
                {/* <StyledTableCell align="center">
                    <Link to="/roles/users" onClick={() => handleShowModalSites(row)}>
                        <Tooltip title={t("Constants.tooltip.sites")}>
                            <IconButton>
                                <ViewComfyAltOutlined />
                            </IconButton>
                        </Tooltip>
                    </Link>
                </StyledTableCell>
                {showModalSites && selectedId && <ModalSites handleClose={() => setShowModalSites(false)} open={showModalSites} />} */}
            </StyledTableRow>
        ))
    );
}

function RolesSitesBody({ tableRows }: { tableRows: IRolesSitesBody[] }) {
    return (
        tableRows?.map((row: IRolesSitesBody) => (
            <StyledTableRow key={row.id}>
                <StyledTableCell align="left">{row.name}</StyledTableCell>
            </StyledTableRow>
        ))
    );
}

function PaymentMethodsHistoryBody({ tableRows }: { tableRows: IPaymentMethodsHistoryBody[] }) {
    // Translation
    const { t } = useTranslation();

    return (
        tableRows?.map((row: IPaymentMethodsHistoryBody) => (
            <StyledTableRow key={row.id}>
                <StyledTableCell align="left">{row.userId}</StyledTableCell>
                <StyledTableCell align="center">{formatMoneyCOP(row.amount)}</StyledTableCell>
                <StyledTableCell align="center">
                    {row.status
                        ? <Chip label={t("Constants.status.accepted")} style={{ backgroundColor: "#4CAF50", color: "#1B5E20" }} />
                        : <Chip label={t("Constants.status.rejected")} style={{ backgroundColor: "#0000001F", color: "#606A84" }} />
                    }
                </StyledTableCell>
                <StyledTableCell align="center">{row.gateway?.name}</StyledTableCell>
            </StyledTableRow>
        ))
    );
}

function EventPonderation({ tableRows }: { tableRows: IEventPonderationBody[] }) {
    // Translation
    const { t } = useTranslation();

    //Storage
    const siteStorage = localStorage.getItem("siteUser");
    const siteJson = siteStorage ? JSON?.parse(siteStorage) : {};

    // States
    const [modal, setModal] = useState({
        open: false,
        data: tableRows 
    });
    const [editModal, setEditModal] = useState<IEventPonderationBody>();

    const [pointValueSite, setPointValueSite ] = useState<number>(0);

    // Functions
    const handleDelete = (eventToDelete: IEventPonderationBody) => {
        Swal.fire({
            title: t("Alert.delete.title"),
            confirmButtonText: t("Alert.button.confirm"),
            confirmButtonColor: "#4073FF",
            cancelButtonText: t("Alert.button.cancel"),
            cancelButtonColor: "#EF5350",
            icon: "question",
            showCancelButton: true,
            customClass: {
                container: "my-swal-container",
            }
        }).then((result) => {
            if (result.isConfirmed) {
                removePointEvent(eventToDelete.eventIdEvent, siteJson.idSite)
                    .then(() => {
                        const updatedTableRows = modal.data.filter((row) => row.event?.name !== eventToDelete?.event?.name);

                        setModal({...modal, data: updatedTableRows});
                    })
                    .catch((err: any) => console.log(err));                          
            }
        });        
    };

    const handleEdit = (eventToEdit: IEventPonderationBody) => {
        const modalData = {
            ...eventToEdit,
            label: eventToEdit.event?.name,
        };

        setEditModal(modalData);

        setModal({
            ...modal,
            open: true
        });
    };

    // Effects
    useEffect(() => {
        getPointValueBySite(siteJson.idSite)
            .then((res: any) => {                
                setPointValueSite(res?.data.point_value);
            })
            .catch((err: any) => console.log(err));
    }, []);
    
    return (
        <>
            {modal?.data.map((row: IEventPonderationBody) => (
                <StyledTableRow key={row.eventIdEvent}>
                    <StyledTableCell align="center">{row?.event?.name}</StyledTableCell>
                    <StyledTableCell align="center">{row.points} {row.points > 1 ? t("Constants.table.header.eventPonderation.points") : t("Constants.table.header.eventPonderation.point")}</StyledTableCell>
                    <StyledTableCell align="center">{formatMoneyCOP(row?.points * pointValueSite)}</StyledTableCell>
                    <StyledTableCell align="center">
                        <IconButton onClick={() => handleEdit(row)}>
                            <Tooltip title={t("Constants.tooltip.edit")}>
                                <EditOutlined sx={{ color: "#4073FF" }} />
                            </Tooltip>
                        </IconButton>
                        <IconButton onClick={() => handleDelete(row)}>
                            <Tooltip title={t("Constants.tooltip.delete")}>
                                <DeleteOutlineOutlinedIcon sx={{ color: "#EF5350" }} />
                            </Tooltip>
                        </IconButton>
                    </StyledTableCell>
                </StyledTableRow>
            ))}
            {editModal ? <ModalConfigEventPonderation modal={modal} setModal={setModal} editData={editModal} /> : <></>}
        </>
    );
}

function EventPenalization({ tableRows, setTableRows }: { tableRows: IEventPenalizationBody, setTableRows: any}) {
    // Translation
    const { t } = useTranslation();

    // States
    const [modal, setModal] = useState<IModalClusterPenalizationState>({
        open: false,
        data: tableRows 
    });
    const [editModal, setEditModal] = useState<IEventPenalizationBody>();

    // Functions
    const handleEdit = (eventToEdit: IEventPenalizationBody) => {
        setEditModal(eventToEdit);
        setModal({
            ...modal,
            open: true
        });
    };
    
    useEffect(() => {
        setModal({
            ...modal,
            data: tableRows
        });
    }, []);
    
    useEffect(()=>{
        setTableRows({open: false, data: modal.data});
    }, [modal]);     
    
    return (
        <StyledTableRow>
            <StyledTableCell align="left">{modal?.data?.limitTime} {modal?.data?.limitTime ?? 1 > 1 ? t("Constants.days") : t("Constants.day")}</StyledTableCell>
            <StyledTableCell align="right">
                <IconButton onClick={() => handleEdit(modal?.data ?? { limitTime: 1})}>
                    <Tooltip title={t("Constants.tooltip.edit")}>
                        <EditOutlined sx={{ color: "#4073FF" }} />
                    </Tooltip>
                </IconButton>
            </StyledTableCell>

            {editModal ? <ModalConfigClustersPenalization modal={modal} setModal={setModal} editData={editModal} /> : <></>}
        </StyledTableRow>
    );
}

function EventExpiration({ tableRows, setTableRows}: { tableRows: IEventExpirationBody, setTableRows: any}) {
    // Translation
    const { t } = useTranslation();

    // States
    const [modal, setModal] = useState<IModalEventPonderatioExpirationState>({
        open: false,
        data: tableRows
    });
    const [editModal, setEditModal] = useState<IEventExpirationBody>();

    // Functions
    const handleEdit = (eventToEdit: IEventExpirationBody) => {
        setEditModal(eventToEdit);
        setModal({
            ...modal,
            open: true
        });
    };
    
    useEffect(() => {
        setModal({
            ...modal, data: tableRows
        });
    }, []);
    
    useEffect(()=>{
        setTableRows({open: false, data: modal.data});
    }, [modal]);
    
    return (
        <StyledTableRow key={modal?.data.days}>
            <StyledTableCell align="left">{parseInt(modal?.data.days, 10) > 1 ? `${modal?.data.days} ${t("Constants.days")}` : `${modal?.data.days} ${t("Constants.day")}`}</StyledTableCell>
            <StyledTableCell align="right">
                <IconButton onClick={() => handleEdit(modal?.data)}>
                    <Tooltip title={t("Constants.tooltip.edit")}>
                        <EditOutlined sx={{ color: "#4073FF" }} />
                    </Tooltip>
                </IconButton>
            </StyledTableCell>
            
            {editModal ? <ModalConfigPointsExpiration modal={modal} setModal={setModal} editData={editModal} /> : <></>}
        </StyledTableRow>
    );
}

function UsersClients({ tableRows }: { tableRows: IUsersClientsBody[]}) {
    return (
        tableRows?.map((row: IUsersClientsBody) => (
            <StyledTableRow key={row?.email}>
                <StyledTableCell align="left">{row?.firstName}</StyledTableCell>
                <StyledTableCell align="left">{row?.email}</StyledTableCell>
            </StyledTableRow>
        ))
    );
}

function EventClusters({ tableRows }: { tableRows: IEventClusters[]}) {
    // Translation
    const { t } = useTranslation();

    // States
    const [modal, setModal] = useState({
        open: false,
        data: tableRows 
    });

    // Functions
    const handleDelete = (eventToDelete: IEventClusters) => {
        Swal.fire({
            title: t("Alert.delete.title"),
            confirmButtonText: t("Alert.button.confirm"),
            confirmButtonColor: "#4073FF",
            cancelButtonText: t("Alert.button.cancel"),
            cancelButtonColor: "#EF5350",
            icon: "question",
            showCancelButton: true,
            customClass: {
                container: "my-swal-container",
            }
        }).then((result) => {
            if (result.isConfirmed) {                
                const updatedTableRows = modal?.data?.filter((row) => row?.events?.name !== eventToDelete?.events?.name);                

                deleteOneCluesterEvent(
                    eventToDelete?.clusters?.id_cluster,
                    eventToDelete?.events?.id_event
                )
                    .then(() => {
                        setModal({...modal, data: updatedTableRows});
                    })
                    .catch((err: any) => console.log(err));                          
            }
        });        
    };

    return (
        tableRows?.map((row: IEventClusters) => (
            <StyledTableRow key={row?.id_event_cluster}>
                <StyledTableCell align="left">{row?.events?.name}</StyledTableCell>
                <StyledTableCell align="center">{row?.event_repeats}</StyledTableCell>
                <StyledTableCell align="center">{row?.porcentual_value}%</StyledTableCell>
                <StyledTableCell align="center">
                    <IconButton>
                        <Tooltip title={t("Constants.tooltip.edit")}>
                            <EditOutlined sx={{ color: "#4073FF" }} />
                        </Tooltip>
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row)}>
                        <Tooltip title={t("Constants.tooltip.delete")}>
                            <DeleteOutlineOutlinedIcon sx={{ color: "#EF5350" }} />
                        </Tooltip>
                    </IconButton>
                </StyledTableCell>
            </StyledTableRow>
        ))
    );
}

function RolesAssignSitesBody({ tableRows }: { tableRows: IRolesAssignSitesBody[] }) {
    // Translation
    const { t } = useTranslation();

    // Functions
    const handleDelete = (data: IRolesAssignSitesBody) => {
        console.log(data);        
    };

    return (
        tableRows?.map((row: IRolesAssignSitesBody) => (
            <StyledTableRow key={row.id}>
                <StyledTableCell align="left">{row.name}</StyledTableCell>
                <StyledTableCell align="right">
                    <IconButton onClick={() => handleDelete(row)}>
                        <Tooltip title={t("Constants.tooltip.delete")}>
                            <DeleteOutlineOutlinedIcon sx={{ color: "#EF5350" }} />
                        </Tooltip>
                    </IconButton>
                </StyledTableCell>
            </StyledTableRow>
        ))
    );
}

function EmptyBody() {
    // Translation
    const { t } = useTranslation();

    return (
        <StyledTableRow>
            <StyledTableCell align="center" colSpan={8}>{t("Alert.search.title")}</StyledTableCell>
        </StyledTableRow>
    );
}

export default function CustomBody({ module, rows, header, isLoading = false, selected, isSelected, handleClick, setTableRows }: ICustomBody) {
    const DEFAULT_BODY = <SitesBody tableRows={rows} />;      

    const TABLE_BODY: Record<string, React.ReactNode> = {
        "assign-plan": <AssignPlansBody tableRows={rows} selected={selected} isSelected={isSelected} handleClick={handleClick} />,
        "event-clusters": <EventClusters tableRows={rows} />,
        "event-expiration": <EventExpiration tableRows={rows} setTableRows={setTableRows} />,
        "event-penalization": <EventPenalization tableRows={rows} setTableRows={setTableRows}/>,
        "event-ponderation": <EventPonderation tableRows={rows} />,
        "payment-methods-history": <PaymentMethodsHistoryBody tableRows={rows} />,
        "roles-assign-sites": <RolesAssignSitesBody tableRows={rows} />,
        "roles-sites": <RolesSitesBody tableRows={rows} />,
        "roles-users": <RolesUsersBody tableRows={rows} />,
        "users-clients": <UsersClients tableRows={rows} />,
        categories: <CategoriesBody tableRows={rows} />,
        gamification: <GamificationBody tableRows={rows} />,
        plans: <PlansBody tableRows={rows} />,
        planVersions: <PlansVersionBody tableRows={rows} />,
        products: <ProductsBody tableRows={rows} />,
        roles: <RolesBody tableRows={rows} />,
        sites: <SitesBody tableRows={rows} />,
        templates: <TemplatesBody tableRows={rows} isSelected={isSelected} handleClick={handleClick} />,
        users: <UsersBody tableRows={rows} />
    };

    if (isLoading) return <TableSkeleton rowsNum={10} columnsNum={header?.length} />;

    if (rows?.length === 0) return <EmptyBody />;

    return TABLE_BODY[module] || DEFAULT_BODY;
}
