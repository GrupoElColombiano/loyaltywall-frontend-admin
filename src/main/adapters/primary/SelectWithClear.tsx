import { ChangeEvent, FC } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { SearchCategory } from "./ProductSelectionModal/ProductSelectionModal.material.style";


interface SelectWithClearProps {
    value: number | string | boolean | undefined;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
    data: any[];
    dataIdKey: string;
    dataNameKey: string;
    label: string;
    style?: any;
    disabled?: boolean;
}
// dataNameKey =>  it would be the name of the name key from the object data
// dataIdKey => it would be the name of the id key from the object data
// data => it would be the array of objects that we want to iterate over
// label => it would be the label of the select


/**
 * A reusable select component with an option to clear the selected value.
 *
 * @param {number | string | boolean | undefined} value - The currently selected value.
 * @param {function} onChange - A function to handle the change event when a value is selected.
 * @param {function} onClear - A function to clear the selected value.
 * @param {Array} data - An array of objects containing the options for the select.
 * @param {string} dataIdKey - The key name for the ID property in each object.
 * @param {string} dataNameKey - The key name for the display name property in each object.
 * @param {string} label - The label text for the select input.
 * @param {any} style - The styles of the component.
 * @param {boolean} disabled - Disabled controller of the input.
 * @returns {JSX.Element} - The SelectWithClear component.
 * 
 * @example
 * // Implementation example in adapters/primary/productSelectionModal/productSelectionModal.tsx
 * import SelectWithClear from 'path/to/SelectWithClear';
 * // ...
 * <SelectWithClear
        label="Sitio"
        value={siteToSearch}
        onChange={handleSiteSelected}
        onClear={() => setSiteToSearch(0)}
        data={dataSites}
        dataIdKey="idSite"
        dataNameKey="name"
    />
 */
const SelectWithClear: FC<SelectWithClearProps> = ({
    value,
    onChange,
    onClear,
    data,
    dataIdKey,
    dataNameKey,
    label,
    style,
    disabled,
}) => {
    return (            
        <SearchCategory style={style}>
            {/* it only makes it width = 24% */} 
            {value ? (
                <></>
            ) : (
                <InputLabel id="select-label">{label}</InputLabel>
            )}

            <TextField
                disabled = {disabled}
                style={{color: "#606A84" }}
                label = {label}
                select
                value={value ? value.toString() : ""}
                onChange={onChange}
                InputProps={{
                    endAdornment: (
                        <CloseRoundedIcon
                            style={{ cursor: "pointer", marginRight: "15px", color: "#606A84" }}
                            onClick={onClear}
                        />
                    ),
                }}
            >
                {/* it took the Array object, and it iterated over it, and it returned a MenuItem for each element of the array */}
                {data.map((item) => (
                    <MenuItem key={item[dataIdKey]} style={{color: "#606A84"}} value={item[dataIdKey]}>
                        {item[dataNameKey]}
                    </MenuItem>
                ))}
            </TextField>
        </SearchCategory>
    );
};

export default SelectWithClear;
