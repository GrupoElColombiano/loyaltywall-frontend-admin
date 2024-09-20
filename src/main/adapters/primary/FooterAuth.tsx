import ourLogo from "../../../assets/LOGO.png";
import facebookIcon from "../../../assets/icon_facebook.svg";
import twitterIcon from "../../../assets/brand-twitter-filled.svg";
import youtubeIcon from "../../../assets/brand-youtube.svg";
import instagramIcon from "../../../assets/brand-instagram.svg";
import "../../../App.css";
import CircleIcon from "./CircleIcon";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { IconButton } from "@mui/material";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import YouTubeIcon from "@mui/icons-material/YouTube";
// import InstagramIcon from "@mui/icons-material/Instagram";

function FooterAuth() {
    // const [count, setCount] = useState(0);

    const navigate = useNavigate();

    const handleHomeClick = () => {
    // Navegar a la vista de inicio de sesión
        navigate("/");
    };

    return (
        <footer>
            <div className="column">
                <a href="https://vitejs.dev" target="_blank">
                    <img src={ourLogo} className="logo" alt="Vite logo" />
                </a>
                <div className="row">
                    <CircleIcon url={facebookIcon} />
                    <CircleIcon url={twitterIcon} />
                    <CircleIcon url={instagramIcon} />
                    <CircleIcon url={youtubeIcon} />
                </div>
                <div className="row">
                    <Button onClick={handleHomeClick} variant="text">
                        <Typography
                            color={"white"}
                            fontFamily={"Roboto Slab"}
                            textAlign="center"
                        >
              HOME
                        </Typography>
                    </Button>
                    <Button onClick={handleHomeClick} variant="text">
                        <Typography
                            color={"white"}
                            fontFamily={"Roboto Slab"}
                            textAlign="center"
                        >
              NOSOTROS
                        </Typography>
                    </Button>
                    <Button onClick={handleHomeClick} variant="text">
                        <Typography
                            color={"white"}
                            fontFamily={"Roboto Slab"}
                            textAlign="center"
                        >
              SUSCRÍBETE
                        </Typography>
                    </Button>
                    <Button onClick={handleHomeClick} variant="text">
                        <Typography
                            color={"white"}
                            fontFamily={"Roboto Slab"}
                            textAlign="center"
                        >
              CONTACTO
                        </Typography>
                    </Button>
                </div>
                <div className="copy_right">
          COPYRIGHT © 2023 EL COLOMBIANO S.A.SCOPYRIGHT © 2023 EL COLOMBIANO
          S.A.S
                </div>
            </div>
        </footer>
    );
}

export default FooterAuth;
