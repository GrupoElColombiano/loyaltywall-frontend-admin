// ReactJS
import { useTranslation } from "react-i18next";

// Shared
import CardComponent from "../../shared/components/Card";
import NavHeader from "../../shared/components/NavHeader";

// Constants
import { CARDS_INFO } from "../../constants/cardsGamification";

// Styled
import { GamificationContainer } from "./styled";

export default function GamificationPage() {
    // Translation
    const { t } = useTranslation();

    return (
        <GamificationContainer>
            <NavHeader title={t("Gamification.title")} />
            
            {CARDS_INFO.map((info, index) => (
                <CardComponent
                    description={t(info?.description)}
                    key={index}
                    title={t(info?.title)}
                    width={info?.width}
                >
                    {info?.children}
                </CardComponent>
            ))}
        </GamificationContainer>
    );
}