// ReactJS
import { useTranslation } from "react-i18next";

// MUI Icons
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

// Styles
import { BreadCrumbContainer, StepContainer, StepIndicator, StepText } from "./styled";

// Interface
interface BreadCrumbProps {
    title: string;
    status: string;
}

const BreadCrumb: React.FC<{ breadCrumb: BreadCrumbProps[] }> = ({ breadCrumb }) => {
    // Translation
    const { t } = useTranslation();

    return (
        <BreadCrumbContainer>
            {breadCrumb.map((item: BreadCrumbProps, index: number) => (
                <StepContainer key={index} status={item.status}>
                    <StepIndicator status={item.status}>
                        {item.status === "success" ? <CheckOutlinedIcon sx={{ fontSize: 16 }} /> : index + 1}
                    </StepIndicator>
                    <StepText status={item.status}>
                        {t(item.title)}
                    </StepText>
                </StepContainer>
            ))}
        </BreadCrumbContainer>
    );
};

export default BreadCrumb;