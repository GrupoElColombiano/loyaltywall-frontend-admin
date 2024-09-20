// ReactJS
import { useContext, useState } from "react";

// Context
import { LanguageContext } from "../../../context/language-context/language.context";

// MUI
import LanguageIcon from "@mui/icons-material/Language";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

// Styles
import { Container } from "./styled";

export default function Translate() {
    // Context
    const { changeLanguage } = useContext(LanguageContext);

    // State
    const [language, setLanguage] = useState("es");

    // Functions
    const handleChange = (event: SelectChangeEvent) => {
        setLanguage(event.target.value);
        changeLanguage(event.target.value);
    };

    return (
        <Container>
            <LanguageIcon sx={{ width: "20px", height: "20px", color: "#555555" }} />
            <Select
                onChange={handleChange}
                sx={{ width: "110px", height: "25px", color: "#555555" }}
                value={language}
            >
                <MenuItem value="es">Español</MenuItem>
                <MenuItem value="en">English</MenuItem>
            </Select>
        </Container>
    );
}
