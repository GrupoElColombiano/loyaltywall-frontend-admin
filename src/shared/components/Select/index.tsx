// ReactJS
import { useTranslation } from "react-i18next";

// MUI
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function InputSelect({ item, onChange, label, options, style, disabled }: IInputSelect) {
    // Translation
    const { t } = useTranslation();
  
    return (
        <Box sx={{ ...style, minWidth: 120, backgroundColor: "#fff" }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    disabled={disabled}
                    id="demo-simple-select"
                    label="item"
                    labelId="demo-simple-select-label"
                    onChange={onChange}
                    placeholder={t("Placeholders.select")}
                    value={item}
                >
                    {options.map((option: IOption, index: number) => (
                        <MenuItem key={index} value={option.value}>
                            {t(option.label)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
