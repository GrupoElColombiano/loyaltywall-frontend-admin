// Components
import CardConfigClusters from "../components/gamification/cards/CardConfigClusters";
import CardConfigClustersPenalization from "../components/gamification/cards/CardConfigClustersPenalization";
import CardConfigEventPonderation from "../components/gamification/cards/CardConfigEventPonderation";
//import CardConfigEventRegister from "../components/gamification/cards/CardConfigEventRegister";
import CardConfigPoints from "../components/gamification/cards/CardConfigPoints";
import CardConfigPointsExpiration from "../components/gamification/cards/CardConfigPointsExpiration";

// Icons
import { StarsOutlined } from "@mui/icons-material";

export const CARDS_INFO: ICardInfo[] = [
    {
        children: <CardConfigPoints />,
        description: "Gamification.points.description",
        icon: <StarsOutlined sx={{ color: "#0045FF", fontSize: 30 }} />,
        title: "Gamification.points.title",
        width: "50%"
    },
    /* {
        children: <CardConfigEventRegister />,
        description: "Gamification.event.register.description",
        icon: <StarsOutlined sx={{ color: "#0045FF", fontSize: 30 }} />,
        title: "Gamification.event.register.title"
    }, */
    {
        children: <CardConfigEventPonderation />,
        description: "Gamification.event.ponderation.description",
        icon: <StarsOutlined sx={{ color: "#0045FF", fontSize: 30 }} />,
        title: "Gamification.event.ponderation.title"
    },
    {
        children: <CardConfigPointsExpiration />,
        description: "Gamification.points.expiration.description",
        icon: <StarsOutlined sx={{ color: "#0045FF", fontSize: 30 }} />,
        title: "Gamification.points.expiration.title"
    },
    {
        children: <CardConfigClusters />,
        description: "Gamification.clusters.description",
        icon: <StarsOutlined sx={{ color: "#0045FF", fontSize: 30 }} />,
        title: "Gamification.clusters.title"
    },
    {
        children: <CardConfigClustersPenalization />,
        description: "Gamification.clusters.penalization.description",
        icon: <StarsOutlined sx={{ color: "#0045FF", fontSize: 30 }} />,
        title: "Gamification.clusters.penalization.title"
    },
];