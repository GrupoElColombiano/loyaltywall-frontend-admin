// ReactJS
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

// MUI
import { IconButton, InputAdornment } from "@mui/material";

// Shared
import { BtnPrimary } from "../Buttons";

// Icons
import { Clear, Search as IconSearch } from "@mui/icons-material";

// Styled
import { Search } from "./styled";

export default function InputSearch({ onSearch, search, setSearch }: IInputSearch) {
    // Translation
    const { t } = useTranslation();

    // Functions
    const handleClearSearch = useCallback(() => {
        setSearch("");
        onSearch();
    }, [setSearch]);

    const handleKeyPress = (e: { key: string; }) => {
        if (e.key === "Enter") {
            onSearch();
        }
    };

    return (
        <Search
            defaultValue={search}
            id="search"
            InputProps={{
                endAdornment: (
                    <InputAdornment
                        position="end"
                        style={{ display: "flex", gap: "10px" }}
                    >
                        {search && (
                            <IconButton onClick={handleClearSearch} edge="end">
                                <Clear />
                            </IconButton>
                        )}
                        <BtnPrimary onClick={onSearch}>
                            <IconSearch />
                        </BtnPrimary>
                    </InputAdornment>
                )
            }}
            label={t("Constants.search")}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleKeyPress} // Detectar tecla "Enter"
            placeholder={`${t("Constants.search")}...`}
            value={search}
        />
    );
}

