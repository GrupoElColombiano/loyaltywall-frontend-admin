// Icons
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// Styled
import { Container, Icon, Paragraph } from "./styled";

export default function Announcement ({ text }: { text: string }) {
    return (
        <Container>
            <Icon>
                <InfoOutlinedIcon />
            </Icon>

            <Paragraph>
                {text}
            </Paragraph>
        </Container>
    );
}
