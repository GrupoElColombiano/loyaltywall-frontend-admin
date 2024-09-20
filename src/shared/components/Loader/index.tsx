// MUI
import { CircularProgress, Typography } from "@mui/material";

// Styled
import { LoaderContainer } from "./styled";

export default function Loader() {
    return (
        <LoaderContainer>
            <CircularProgress size={80}/>
            <Typography variant="h4">Loading...</Typography>
        </LoaderContainer>
    );
}
