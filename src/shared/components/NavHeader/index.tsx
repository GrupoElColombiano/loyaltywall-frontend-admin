// ReactJS
import { useNavigate } from "react-router-dom";

// Icons
import { KeyboardArrowLeftOutlined } from "@mui/icons-material";

// Styled
import { ActionContainer, Container, TextContainer, TextH1, TextParagraph, TitleContainer } from "./styled";

//Swal
import Swal from "sweetalert2";

//Translations
import { useTranslation } from "react-i18next";



export default function NavHeader({ children, description, isBack = false, title, isFormDirty = false }: INavHeaderProps) {
    // Navigation
    const navigate = useNavigate();
    // Translations
    const { t } = useTranslation();

    //Swal message
    const handleGoBack = (isFormDirty: boolean) => {
        if (isFormDirty) {
            Swal.fire({
                title: t("Alert.exit.title"),
                text: t("Alert.exit.text"),
                icon: "question",
                showCancelButton: true,
                confirmButtonText: t("Alert.button.confirm"),
                confirmButtonColor: "#0045FF",
                cancelButtonText: t("Alert.button.cancel"),
                cancelButtonColor: "#7E2EFF",
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.setItem("siteEdit", "");
                    navigate(-1);
                }
            });
        } else {
            navigate(-1);
        }
    };

    return (
        <Container>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <TitleContainer style={{ alignItems: description ? "flex-start" : "center" }}>
                    {isBack && <KeyboardArrowLeftOutlined onClick={() => handleGoBack(isFormDirty)} sx={{ cursor: "pointer" }} fontSize="large" />}
                    <TextContainer>
                        <TextH1>{title}</TextH1>
                    </TextContainer>
                </TitleContainer>
                <ActionContainer>
                    {children}
                </ActionContainer>
            </div>
            {description && <TextParagraph>{description}</TextParagraph>}
        </Container>
    );
}