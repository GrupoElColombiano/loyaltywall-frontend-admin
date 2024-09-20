import {
    Add,
    MoreVert,
    NavigateBefore,
    NavigateNext,
    Search,
} from "@mui/icons-material";
import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    IconButton,
    Menu,
    Divider,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    Checkbox,
    TableBody,
    Modal,
    SelectChangeEvent,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect, useState } from "react";
// import Swal from "sweetalert2";
import axios from "axios";
import {
    AcceptButton,
    CancelButton,
    ContainerButtonsModal,
    ContentModalText,
    TittleModalContainer,
    TittleModalText,
} from "../../../../pages/plans/styled";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { useTranslation } from "react-i18next";

const ConfigPlan = () => {
    const [searchText, setSearchText] = useState("");
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [menuAnchorElRow, setMenuAnchorElRow] = useState<any[]>([]);
    const [isHeaderCheckboxChecked, setHeaderCheckboxChecked] = useState(false);
    const [checkedRows, setCheckedRows] = useState(new Set());
    const [tableData, setTableData] = useState<
        Array<{
            idPlan: number;
            description: string;
            name: string;
            idVersionPlan: number;
            categories: string;
            contentQuantity: number;
            frequencyType: string;
            durationType: string;
            userType: string;
            isActive: boolean;
            createdAt: string;
            updatedAt: string;
        }>
    >([]);
    const [typeOfUserToCreate, setTypeOfUserToCreate] = useState("");
    const [objectOfTypeUsers, setObjectOfTypeUsers] = useState<
        Array<{
            id: number;
            description: string;
        }>
    >([]);

    const navigate = useNavigate();
    const { t } = useTranslation();
    // Main Modal change password
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const fetchDataModal = async () => {
        const BASE_URL = import.meta.env.VITE_BASE_URL;

        try {
            const response = await axios.get(`${BASE_URL}/usertype`);
            if (response.data) {
                setObjectOfTypeUsers(response.data);
                handleOpen();
            }
        } catch (error: any) {
            console.error(error.response?.data || error.message);
        }
    };

    const fetchData = async () => {
        const BASE_URL = import.meta.env.VITE_BASE_URL;

        try {
            const response = await axios.get(`${BASE_URL}/plans/filter`, {
                params: {
                    name: searchText,
                },
            });
            if (response.data) {
                setTableData(response.data);
            }
        } catch (error: any) {
            const defaultResponse = [
                {
                    idPlan: 1,
                    description: "string",
                    name: "string",
                    idVersionPlan: 1,
                    categories: "string",
                    contentQuantity: 1,
                    frequencyType: "string",
                    durationType: "string",
                    userType: "string",
                    isActive: true,
                    createdAt: "string",
                    updatedAt: "string",
                },
            ];
            setTableData(defaultResponse);
            console.error(error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, [searchText]);

    // Change in search
    const handleSearchChange = (event: any) => {
        setSearchText(event.target.value);
    };

    // Change in page size
    const handlePageSizeChange = (event: any) => {
        setPageSize(event.target.value);
    };

    // Add new site ( go to new site page)
    const handleAddNew = () => {
        fetchDataModal();
    };

    // Función para abrir el menú de opciones
    const handleMenuOpenRow = (event: any, row: any) => {
        const id: number = row.idPlan;
        const helper: Array<any> = [...menuAnchorElRow];
        helper[id] = { element: event.currentTarget };
        setMenuAnchorElRow(helper);
    };
    const handleMenuCloseRow = () => {
        setMenuAnchorElRow([]);
    };

    const handleMenuOpen = (event: any) => {
        setMenuAnchorEl(event.currentTarget);
    };

    // Función para cerrar el menú de opciones
    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    const handleMenuEditSite = async (plan: any) => {
        await navigate("edit-plan", { state: plan });
        // this redirect to edit plan with the plan data
    };

    const handleHeaderCheckboxChange = (event: any) => {
        const isChecked = event.target.checked;
        setHeaderCheckboxChecked(isChecked);

        if (isChecked) {
            const newCheckedRows = new Set(tableData.map((row) => row.idPlan));
            setCheckedRows(newCheckedRows);
        } else {
            setCheckedRows(new Set());
        }
    };

    const handleRowCheckboxChange = (event: any, rowId: any) => {
        const isChecked = event.target.checked;
        const newCheckedRows = new Set(checkedRows);

        if (isChecked) {
            newCheckedRows.add(rowId);
        } else {
            newCheckedRows.delete(rowId);
        }

        setCheckedRows(newCheckedRows);
        setHeaderCheckboxChecked(newCheckedRows.size === tableData.length);
    };

    const totalPages = Math.ceil(tableData.length / pageSize);

    function handleSubmitModal() {
        if (typeOfUserToCreate == "") return;
        navigate(`new/${typeOfUserToCreate}`);
    }

    const handleSelectUserToCreate = (event: SelectChangeEvent) => {
        setTypeOfUserToCreate(event.target.value as string);
    };

    return (
        <>
            <div
                style={{
                    backgroundColor: "#F8F8F8",
                    color: "#000000",
                    padding: "20px",
                    width: "100%",
                }}
            >
                <AppBar
                    position="static"
                    elevation={0}
                    sx={{
                        backgroundColor: "transparent !important",
                        boxShadow: "none",
                        paddingLeft: "0px",
                    }}
                >
                    <Toolbar
                        sx={{
                            paddingLeft: "0px !important",
                        }}
                    >
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    fontFamily: "Roboto",
                                    fontSize: "32px",
                                    fontWeight: 700,
                                    lineHeight: "38px",
                                    letterSpacing: "0em",
                                    textAlign: "left",
                                    fontStyle: "normal",
                                }}
                            >
                                {t("Plan.title")}
                            </Typography>
                        </Box>
                        <TextField
                            sx={{ width: "300px" }}
                            label={t("Plan.searchBar.label")}
                            value={searchText}
                            onChange={handleSearchChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={handleAddNew}
                            sx={{ marginLeft: "10px", width: "121px", height: "42px" }}
                        >
                            {t("Plan.button.add")}
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div
                        style={{
                            padding: "16px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="subtitle1" component="div">
                            {`Planes( ${tableData.length} )`}
                        </Typography>
                    </div>

                    <IconButton onClick={handleMenuOpen}>
                        <MoreVert />
                    </IconButton>
                    <Menu
                        anchorEl={menuAnchorEl}
                        open={Boolean(menuAnchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleMenuClose}>...</MenuItem>
                        <MenuItem onClick={handleMenuClose}>More</MenuItem>
                    </Menu>
                </Box>

                <Divider
                    sx={{
                        marginBottom: "10px",
                    }}
                />
                <TableContainer
                    component={Paper}
                    sx={{
                        backgroundColor: "transparent",
                        width: "auto",
                        boxShadow: "none",
                    }}
                >
                    <Table
                        style={{
                            borderColor: "transparent",
                        }}
                    >
                        <TableHead
                            style={{
                                backgroundColor: "transparent",
                            }}
                        >
                            <TableRow>
                                <TableCell>
                                    <Checkbox
                                        checked={isHeaderCheckboxChecked}
                                        onChange={handleHeaderCheckboxChange}
                                    />
                                </TableCell>
                                {tableData.length > 0 &&
                                    Object.keys(tableData[0]).map((key) => (
                                        <TableCell key={key}>{key}</TableCell>
                                    ))}
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData
                                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                                .map((row, index) => (
                                    <TableRow
                                        key={row.idPlan}
                                        sx={{
                                            backgroundColor: index % 2 === 0 ? "#F3F3F3" : "#FFFFFF",
                                            borderBottom: "none",
                                        }}
                                    >
                                        <TableCell>
                                            <Checkbox
                                                checked={checkedRows.has(row.idPlan)}
                                                onChange={(event) =>
                                                    handleRowCheckboxChange(event, row.idPlan)
                                                }
                                            />
                                        </TableCell>
                                        {row.idPlan &&
                                            Object.entries(row).map(([key, value], index) => (
                                                <TableCell key={index}>
                                                    <Box display="flex" alignItems="center">
                                                        {key === "name" && (
                                                            <>
                                                                <AccountCircleIcon
                                                                    sx={{
                                                                        marginRight: "5px",
                                                                        width: "32px",
                                                                        height: "32px",
                                                                    }}
                                                                />
                                                            </>
                                                        )}
                                                        {typeof value === "boolean"
                                                            ? value
                                                                ? "Activo"
                                                                : "Inactivo"
                                                            : value}
                                                    </Box>
                                                </TableCell>
                                            ))}

                                        <TableCell key={row.idPlan + row.name}>
                                            <IconButton
                                                onClick={(event) => handleMenuOpenRow(event, row)}
                                            >
                                                <EditOutlinedIcon />
                                            </IconButton>
                                            {menuAnchorElRow[row.idPlan] ? (
                                                <Menu
                                                    anchorEl={menuAnchorElRow[row.idPlan].element!}
                                                    open={Boolean(menuAnchorElRow[row.idPlan].element!)}
                                                    onClose={handleMenuCloseRow}
                                                >
                                                    <MenuItem onClick={() => handleMenuEditSite(row)}>
                                                        Editar
                                                    </MenuItem>
                                                </Menu>
                                            ) : (
                                                <></>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginX: "40px",
                        marginTop: "10px",
                        borderWidth: "1px 0px 1px 0px",
                        borderStyle: "solid",
                        borderColor: "#8A8A8A",
                        height: "56px",
                    }}
                >
                    <Box
                        sx={{
                            marginLeft: "15px",
                        }}
                    >
                        <Typography variant="body2" component="div">
                            {(currentPage - 1) * pageSize + 1} -{" "}
                            {Math.min(currentPage * pageSize, tableData.length)} de{" "}
                            {tableData.length}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",

                            marginRight: "15px",
                        }}
                    >
                        <InputLabel>Fila por página</InputLabel>
                        <Select
                            value={pageSize}
                            onChange={handlePageSizeChange}
                            label="Tamaño de página"
                            className="noBorder"
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                        </Select>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                flexDireaction: "row",
                            }}
                        >
                            <IconButton
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                            >
                                <NavigateBefore />
                            </IconButton>
                            <Typography variant="body2" component="div">
                                {currentPage} / {totalPages}
                            </Typography>
                            <IconButton
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                            >
                                <NavigateNext />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        height: "56px",
                    }}
                ></Box>
                <Outlet />
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                        width: "24vw",
                        minWidth: "212px",
                        maxWidth: "80%",
                        borderRadius: "1px",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        padding: "25px",
                    }}
                >
                    <TittleModalContainer>
                        <TittleModalText id="modal-modal-title">
                            {t("Plan.newPlan.alert.create.title")}
                        </TittleModalText>
                    </TittleModalContainer>
                    <ContentModalText>
                        {t("Plan.newPlan.alert.create.description")}
                    </ContentModalText>
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
                            {objectOfTypeUsers.map((userType) => (
                                <MenuItem key={userType.id} value={userType.id}>
                                    {userType.description}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {typeOfUserToCreate ? (
                        <></>
                    ) : (
                        <span style={{color: "red"}}>{t("Plan.newPlan.alert.select.user")}</span>
                    )}
                    <ContainerButtonsModal>
                        <CancelButton onClick={handleClose}>{t("Plan.newPlan.alert.cancel1")}</CancelButton>
                        <AcceptButton onClick={handleSubmitModal}>{t("Plan.newPlan.alert.accept")}</AcceptButton>
                    </ContainerButtonsModal>
                </Box>
            </Modal>
        </>
    );
};


export default ConfigPlan;