// ReactJS
import { useTranslation } from "react-i18next";

// MUI
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// Components
import CustomBody from "./CustomBody";

// Styled
import { StyledTableCell, Container } from "./styled";

export default function TableComponent({
    children,
    height = "710px",
    isLoading,
    isSelectable = false,
    module,
    selected = [],
    setSelected = () => void 0,
    tableHeader,
    tableRows,
    setTableRows
}: ITableComponent) {
    // Translation
    const { t } = useTranslation();

    // Constants
    const numSelected= selected?.length;

    const rowCount = tableRows?.length;

    // Functions
    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = tableRows;

            setSelected(newSelected);

            return;
        }

        setSelected([]);
    };

    const handleClick = (item: any) => {
        const selectedIndex = selected.indexOf(item);
        let newSelected: any[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, item);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected?.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const isSelected = (data: any) => selected.indexOf(data) !== -1;    

    return (
        <Container>
            <TableContainer component={Paper} sx={{ maxHeight: height, height: height, overflow: "auto" }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table" stickyHeader >
                    <TableHead>
                        <TableRow>
                            {isSelectable && (
                                <StyledTableCell padding="checkbox">
                                    <Checkbox
                                        checked={rowCount > 0 && numSelected === rowCount}
                                        color="primary"
                                        indeterminate={numSelected > 0 && numSelected < rowCount}
                                        inputProps={{ "aria-label": "select all desserts" }}
                                        onChange={handleSelectAllClick}
                                    />
                                </StyledTableCell>
                            )}
                            {tableHeader?.map((item: IHeader, index: number) => (
                                <StyledTableCell align={item?.align} key={index}>
                                    {t(item?.key)}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <CustomBody
                            handleClick={handleClick}
                            header={tableHeader}
                            isLoading={isLoading}
                            isSelected={isSelected}
                            module={module}
                            rows={tableRows}
                            selected={selected}
                            setTableRows={setTableRows}
                        />
                    </TableBody>
                </Table>
            </TableContainer>
            {children}
        </Container>

    );
}