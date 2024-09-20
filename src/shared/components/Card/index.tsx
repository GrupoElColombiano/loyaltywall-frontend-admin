// MUI
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

// Styled
import { CardContainer, CardWrapper, CardHeader, CardBody } from "./styled";

export default function CardComponent({
    children,
    description,
    icon,
    title,
    width = "100%"
}: ICardComponentProps) {
    return (
        <CardContainer sx={{ minWidth: 275, width: width }}>
            <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardWrapper>
                    <CardHeader>
                        {icon}
                        <Typography variant="h5" component="h1">
                            {title}
                        </Typography>
                    </CardHeader>
                    <Typography variant="body1" component="p">
                        {description}
                    </Typography>
                    <CardBody>
                        {children}
                    </CardBody>
                </CardWrapper>
            </Card>
        </CardContainer>
    );
}
