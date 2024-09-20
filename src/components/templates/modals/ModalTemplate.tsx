// ReactJS
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

// MUI
import { FormControl, InputLabel, MenuItem, Modal, Select } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Shared
import { BtnPrimary, BtnSecondary } from "../../../shared/components/Buttons";
import CustomPagination from "../../../main/adapters/primary/CompleteGridComponent/CustomPagination";
import InputSearch from "../../../shared/components/Search";
import TableComponent from "../../../shared/components/Table";

// Service
import { getPlans/* , getVersionsPlan */ } from "../../../service/templates";
import { getSitesByRol } from "../../../service/roles";

// Constants
import { AssignPlanHeader } from "../../../constants/headers";

// Styles
import { ModalContainer } from "./styled";

interface DataModal {
    id: number;
    description: string;
    name: string;
    status: boolean;
    userType: string;
}

interface ModalTemplateProps {
    data?: any;
    isEdit?: boolean;
    onClose: () => void;
    open: boolean;
}

export default function ModalTemplate(props: ModalTemplateProps) {
    // Props
    const { onClose, open, isEdit = false, data = null } = props;

    // LocalStorage
    const accessToken = localStorage.getItem("access_token") || "";
    const roleUser = JSON.parse(localStorage.getItem("rolUser") || "{}");
    const siteStorage = JSON.parse(localStorage.getItem("siteUser") || "{}"); 

    // Translations
    const { t } = useTranslation();

    const [isLoading, setIsLoading] = useState(false);

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPlans, setTotalPlans] = useState(0);

    const [rows, setRows] = useState<DataModal[]>([]);
    const [rates, setRates] = useState<any[]>([]);
    const [selected, setSelected] = useState<DataModal[]>(data?.plans || []);
    const [sites, setSites] = useState<any[]>([]);

    const [searchText, setSearchText] = useState("");
    const [selectedRate, setSelectedRate] = useState("");
    const [selectedSite, setSelectedSite] = useState(siteStorage.idSite || "");

    // Constants
    const totalPages = Math.ceil(totalPlans / pageSize);

    // Functions
    const handlePageChange = (params: { searchText: string, page: number, limitCurrent: number, isActive?: boolean }) => {
        setIsLoading(true);

        setLimit(params.limitCurrent);

        setPage(params.page);

        setIsLoading(true);

        getPlans(params.searchText, params.page, params.limitCurrent, selectedRate, selectedSite)
            .then((res) => {
                console.log(" LA LISTA DE PLANES ES ESTA ACTUAL ", res.data);
                setRows(res.data);

                const rates = res?.data?.map((item: any) => {
                    return item?.rates?.map((rate: any) => {
                        return { id: rate?.id, name: rate?.rate, value: rate?.rate };
                    });
                });

                const ratesConcat = rates?.reduce((acc: any, val: any) => acc.concat(val), []);

                setRates([{
                    value: "",
                    name: t("Constants.status.all")
                }, ...ratesConcat]);               

                setTotalPlans(res?.data?.length);
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

    // Effects
    useEffect(() => {
        getSitesByRol(accessToken, roleUser.id)
            .then((res) => {                
                const sites = res?.data?.data
                    .map((item: any) => {
                        return { id: item.idSite, name: item.name, value: item.idSite };
                    });

                setSites([{
                    value: "",
                    label: t("Constants.status.all")
                }, ...sites]);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        setSelected(data?.plans);
    }, [data]);

    useEffect(() => {
        handlePageChange({
            searchText: searchText,
            page: page,
            limitCurrent: limit
        });
    }, [selectedRate, selectedSite]);    

    return (
        <Modal open={open} onClose={onClose}>
            <ModalContainer>
                <Typography variant="h4" component="h1">
                    {t("Templates.title.asign")}
                </Typography>

                <Typography variant="subtitle1" style={{ color: "#6B7280" }}>
                    {t("Templates.title.asign.description")}
                </Typography>

                <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
                    <InputSearch onSearch={handleSearchChange} setSearch={setSearchText} search={searchText} />
                    <FormControl style={{ width: "50%" }}>
                        <InputLabel id="demo-simple-select-label">{t("Templates.rate")}</InputLabel>
                        <Select
                            id="rate"
                            label={t("Templates.rate")}
                            labelId="select-site-label"
                            onChange={(e) => setSelectedRate(e.target.value)}
                            placeholder={t("Placeholders.select")}
                            value={selectedRate}
                            variant="outlined"

                        >
                            {rates.map((time) => <MenuItem key={time?.id} value={time?.value}>{time?.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl style={{ width: "50%" }}>
                        <InputLabel id="demo-simple-select-label">{t("Templates.site")}</InputLabel>
                        <Select
                            disabled
                            id="site"
                            label={t("Templates.site")}
                            labelId="select-site-label"
                            onChange={(e) => setSelectedSite(e.target.value)}
                            placeholder={t("Placeholders.select")}
                            value={selectedSite}
                            variant="outlined"

                        >
                            {sites.map((time) => <MenuItem key={time?.id} value={time?.value}>{time?.name || time?.label}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Box>

                <TableComponent
                    isLoading={isLoading}
                    isSelectable
                    module="assign-plan"
                    selected={selected}
                    setSelected={setSelected}
                    tableHeader={AssignPlanHeader}
                    tableRows={rows}
                    height="490px"
                >
                    <CustomPagination
                        handlePageChange={handleSearchChange}
                        page={page}
                        pageSize={pageSize}
                        searchText={searchText}
                        setPage={setPage}
                        setPageSize={setPageSize}
                        totalCategory={totalPages}
                        totalPages={totalPages}
                    />
                </TableComponent>

                <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <BtnSecondary onClick={onClose}>
                        {t("Templates.button.cancel")}
                    </BtnSecondary>
                    <BtnPrimary disabled={selected?.length === 0}>
                        <Link
                            state={{ data: data, plans: selected }}
                            style={{ color: "#ffffff", textDecoration: "none" }}
                            to={isEdit ? `/templates/edit/${data?._id}` : "/templates/new"}
                        >
                            {t("Templates.button.confirm")}
                        </Link>
                    </BtnPrimary>
                </Box>
            </ModalContainer>
        </Modal>
    );
}