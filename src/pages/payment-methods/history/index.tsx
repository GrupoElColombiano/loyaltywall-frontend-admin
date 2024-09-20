// ReactJS
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// Shared
import CustomPagination from "../../../main/adapters/primary/CompleteGridComponent/CustomPagination";
import InputSearch from "../../../shared/components/Search";
import InputSelect from "../../../shared/components/Select";
import NavHeader from "../../../shared/components/NavHeader";
import TableComponent from "../../../shared/components/Table";

// Constants
import { PaymentsHistoryHeader } from "../../../constants/headers";

// Services
import { getHistoryPaymentMethods, getPaymentMethods } from "../../../service/payment-methods";

// Styled
import { HistoryContainer } from "./styled";

export default function HistoryPage() {
    // Translations
    const { t } = useTranslation();   

    // LocalStorage
    const siteStorage = JSON.parse(localStorage.getItem("siteUser") || "{}");

    // States
    const [searchText, setSearchText] = useState("");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalTransactions, setTotalTransactions] = useState(0);
    
    const [isLoading, setIsLoading] = useState(false);
    
    const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
    const [rows, setRows] = useState<any[]>([]);

    // Constants
    const totalPages = Math.ceil(totalTransactions / pageSize);

    // Functions
    const handlePageChange = (params: { searchText: string, page: number, limitCurrent: number, paymentMethod?: number | string }) => {
        setIsLoading(true);

        setLimit(params.limitCurrent);

        setPage(params.page);

        getHistoryPaymentMethods(siteStorage?.idSite, params.searchText, selectedPaymentMethod)
            .then((result) => {
                setRows(result.data);
                setTotalTransactions(result.data.length);
            })
            .catch(() => {
                setRows([]);
                setTotalTransactions(0);
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
            paymentMethod: selectedPaymentMethod
        });
    };    

    // Effects
    useEffect(() => {
        getPaymentMethods(siteStorage.idSite)
            .then((res) => {
                const paymentMethods = res?.data.map((paymentMethod: any) => {
                    return {
                        label: paymentMethod.name.charAt(0).toUpperCase() + paymentMethod.name.slice(1),
                        value: paymentMethod.name
                    };
                });

                setPaymentMethods([{
                    value: "",
                    label: t("Constants.status.all")
                }, ...paymentMethods]);
            })
            .catch(() => {
                setPaymentMethods([]);
            });
    }, []);   

    useEffect(() => {
        handlePageChange({
            searchText: searchText,
            page: page,
            limitCurrent: limit,
            paymentMethod: selectedPaymentMethod
        });
    }, [selectedPaymentMethod]);   

    return (
        <HistoryContainer>
            <NavHeader title={t("PaymentMethods.history.title")} isBack>
                <InputSearch onSearch={handleSearchChange} setSearch={setSearchText} search={searchText} />

                <InputSelect
                    style={{ width: 175 }}
                    item={selectedPaymentMethod}
                    label={t("Constants.label.paymentMethod")}
                    options={paymentMethods}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setSelectedPaymentMethod(e.target.value);
                    }}
                />                
            </NavHeader>

            <TableComponent module="payment-methods-history" tableHeader={PaymentsHistoryHeader} tableRows={rows} isLoading={isLoading}>
                <CustomPagination
                    handlePageChange={handlePageChange}
                    page={page}
                    pageSize={pageSize}
                    searchText={searchText}
                    setPage={setPage}
                    setPageSize={setPageSize}
                    totalCategory={totalTransactions}
                    totalPages={totalPages}
                />
            </TableComponent>
        </HistoryContainer>
    );
}
