// ReactJS
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";

// MUI
import { Add, ContentCopy } from "@mui/icons-material";

// Shared
import { BtnPrimary } from "../../shared/components/Buttons";
import CustomPagination from "../../main/adapters/primary/CompleteGridComponent/CustomPagination";
import InputSearch from "../../shared/components/Search";
import NavHeader from "../../shared/components/NavHeader";
import TableComponent from "../../shared/components/Table";

// Components
import ModalTemplate from "../../components/templates/modals/ModalTemplate";

// Service
import { createTemplate, getAllTemplates } from "../../service/templates";

// Constants
import { TemplatesHeader } from "../../constants/headers";

// External Dependencies
import Swal from "sweetalert2";

// Styles
import { TemplateContainer } from "./styled";

interface Data {
    id: number;
    _id: string;
    actions?: string;
    html: string;
    description: string;
    name: string;
    published: string;
    isActive?: boolean;
    status: boolean;
}

const Template: React.FC = () => {
    // Translations
    const { t } = useTranslation();

    //Storage
    const siteStorage = localStorage.getItem("siteUser");
    const siteJson = siteStorage ? JSON?.parse(siteStorage) : {};

    // States
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalTemplates, setTotalTemplates] = useState(0);

    const [actionsModule, setActionsModule] = useState<IActionRole[]>([]);
    const [rows, setRows] = useState<Data[]>([]);
    const [selected, setSelected] = useState<Data[]>([]);

    const [searchText, setSearchText] = useState("");

    // Constants
    const totalPages = Math.ceil(totalTemplates / pageSize);

    // Functions
    const handlePageChange = (params: { searchText: string, page: number, limitCurrent: number, isActive?: boolean }) => {
        setIsLoading(true);

        setLimit(params.limitCurrent);

        setPage(params.page);

        setIsLoading(true);

        getAllTemplates(params.searchText, params.page, params.limitCurrent, siteJson?.idSite)
            .then((res: any) => {
                if (res === undefined) return;               

                setRows(res.data?.data);                

                setTotalTemplates(res?.data?.totalTemplates);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleSearchChange = () => {
        handlePageChange({
            searchText: searchText,
            page: page,
            limitCurrent: limit
        });
    };

    const handleDuplicate = () => {
        const newSelected = selected.map((item) => {
            const newItem = {
                ...item,
                name: `${item.name} - (Copia)`,
            };

            newItem.id = rows?.length + 1;

            return newItem;
        });

        setRows([...rows, ...newSelected]);

        Swal.fire({
            cancelButtonColor: "#7E2EFF",
            cancelButtonText: t("Alert.button.cancel"),
            confirmButtonColor: "#0045FF",
            confirmButtonText: t("Alert.button.confirm"),
            icon: "question",
            showCancelButton: true,
            text: t("Alert.duplicate.text"),
            title: t("Alert.duplicate.title"),
        }).then((result) => {
            if (result.isConfirmed) {
                for (let i = 0; i < newSelected?.length; i++) {
                    const item = {
                        description: newSelected[i].description,
                        html: newSelected[i].html,
                        isActive: newSelected[i].isActive,
                        name: newSelected[i].name,
                        published: newSelected[i].published,
                    };

                    createTemplate(item)
                        .then(() => {
                            Swal.fire({
                                title: t("Alert.save.title"),
                                text: t("Alert.save.text"),
                                confirmButtonText: t("Alert.button.confirm"),
                                confirmButtonColor: "#0045FF",
                                icon: "success",
                            });
                        })
                        .catch(() => {
                            Swal.fire({
                                confirmButtonColor: "#0045FF",
                                confirmButtonText: t("Alert.button.confirm"),
                                icon: "error",
                                text: t("Alert.error.text"),
                                title: t("Alert.error.title"),
                            });
                        });
                }
            }
        });
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

        if(localStorage.getItem("7")){
            const productoModuleData = JSON.parse(localStorage.getItem("7") || "{}");
            setActionsModule(productoModuleData); // Guarda el productoModule en el estado
        }else{
            alert("Por favor inicie de nuevo sesion para recuperar los permisos");
        }

        handlePageChange({
            searchText: searchText,
            page: page,
            limitCurrent: limit
        });
    }, []);    

    return (
        <TemplateContainer>
            <NavHeader title={`${t("Templates.title")} (${totalTemplates})`}>
                {actionsModule && actionsModule.find(action => action.description === "Buscar" && action.role != null) && (
                    <InputSearch onSearch={handleSearchChange} setSearch={setSearchText} search={searchText} />
                )}

                <BtnPrimary onClick={handleDuplicate} disabled={selected?.length === 0}>
                    <ContentCopy />
                    {t("Constants.button.duplicate")}
                </BtnPrimary>

                {actionsModule && actionsModule.find(action => action.description === "Crear" && action.role != null) && (
                    <BtnPrimary onClick={() => setModal(true)}>
                        <Add />
                        {t("Constants.button.add")}
                    </BtnPrimary>

                )}
            </NavHeader>

            {actionsModule && actionsModule.find(action => action.description === "Listar" && action.role != null) && (
                <TableComponent
                    isLoading={isLoading}
                    isSelectable
                    module="templates"
                    selected={selected}
                    setSelected={setSelected}
                    tableHeader={TemplatesHeader}
                    tableRows={rows}
                >
                    <CustomPagination
                        handlePageChange={handlePageChange}
                        page={page}
                        pageSize={pageSize}
                        searchText={searchText}
                        setPage={setPage}
                        setPageSize={setPageSize}
                        totalCategory={totalTemplates}
                        totalPages={totalPages}
                    />
                </TableComponent>

            )}

            <ModalTemplate open={modal} onClose={handleGoBack} />
        </TemplateContainer >
    );
};

export default Template;
