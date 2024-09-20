//ReactJS
import { useAuth } from "react-oidc-context";
import { useTranslation } from "react-i18next";

// MUI
import { Link, Typography } from "@mui/material";

// Icons
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";

// Styled
import { Custom404Container } from "./styled";

export default function Custom404Page () {
    // Translation
    const { t } = useTranslation();

    // Auth
    const auth = useAuth();

    // Functions
    const signoutRedirect = () => {
        auth.signoutRedirect();
        auth.removeUser();
    };

    return (
        <Custom404Container>
            <TimerOutlinedIcon sx={{ fontSize: 60, color: "#FF2E59CC" }} />

            <Typography variant="h6" component="p">
                {t("404.title")}
            </Typography>

            <Typography variant="h6" component="p">
                {t("404.subtitle")}
            </Typography>

            <Link
                color="inherit"
                component="button"
                onClick={signoutRedirect}
                sx={{ color: "#FF2E59CC" }}
                variant="h6"
            >
                {t("404.link")}
            </Link>            
        </Custom404Container>
    );
}