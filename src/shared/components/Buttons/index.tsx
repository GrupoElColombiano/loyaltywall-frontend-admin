// MUI
import { CircularProgress } from "@mui/material";

// Styled
import { OutlinedButton, PrymaryButton, SecondaryButton } from "./styled";

export function BtnPrimary({ children, onClick, style, type = "button", disabled = false, loading = false }: IButtonProps) {
    return (
        <PrymaryButton
            disabled={disabled || loading}
            onClick={onClick}
            size="large"
            style={style}
            type={type}
            variant="contained"
        >
            {loading ? <CircularProgress size={24} color="inherit" /> : children}
        </PrymaryButton>
    );
}

export function BtnSecondary({ children, onClick, style, type = "button", disabled = false, loading = false }: IButtonProps) {
    return (
        <SecondaryButton
            disabled={disabled || loading}
            onClick={onClick}
            size="large"
            style={style}
            type={type}
            variant="contained"
        >
            {loading ? <CircularProgress size={24} color="inherit" /> : children}
        </SecondaryButton>
    );
}

export function BtnOutLinedFunction({ children, onClick, style, type = "button", disabled = false, loading = false }: IButtonProps) {
    return (
        <OutlinedButton 
            disabled={disabled || loading}
            onClick={onClick}
            size="large"
            style={style}
            type={type}
            variant="contained"
        >
            {loading ? <CircularProgress size={24} color="inherit" /> : children}
        </OutlinedButton>
    );
}