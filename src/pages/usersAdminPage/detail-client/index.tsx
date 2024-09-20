// ReactJS
import { useTranslation } from "react-i18next";

// MUI
import { Avatar, Box, Chip, Typography } from "@mui/material";
// Shared
import NavHeader from "../../../shared/components/NavHeader";
import { BtnPrimary } from "../../../shared/components/Buttons";
import CollapsibleBox from "../../../shared/components/ContainerCollapsable";

// services

// Styled
import { ProfileClientContainer } from "./styled";
// import { useNavigate } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";

export default function ProfileClientPage() {
    // Translation
    const { t } = useTranslation();

    // LocalStorage
    const user = JSON.parse(localStorage.getItem("client") || "{}");
    
    const [name, setName] = useState<string>(user.name);
    const [email, setEmail] = useState<string>(user.email);
    const [collapsableInfoGen, setCollapsableInfoGen] = useState(false);
    const [collapsableProfileDetail, setCollapsableProfileDetail] = useState(false);    
    const [collapsableInterest, setCollapsableInterest] = useState(false);    
    const [collapsableSubscription, setCollapsableSubscription] = useState(false);
    const [historialData, /* setHistorialData */ ] = useState([{activityName: "Nueva actividad", fecha: "10/10/23"}, {activityName: "activityyy", fecha: "12/10/23"}, {activityName: "Creación", fecha: "10/01/23"}]);    
    const [listProducts, /* setListProducts */] = useState([
        { idProduct: 1, name: "Product1" },
        { idProduct: 2, name: "Product2" },
        { idProduct: 3, name: "Product3" },
        { idProduct: 4, name: "Product4" },
        { idProduct: 5, name: "Product5" },
        { idProduct: 6, name: "Product6" }
    ]);        

    // Functions
    const handleClickGeneralInfo = () => {
        setCollapsableInfoGen(!collapsableInfoGen);
    };
    
    const handleClickProfileDetail = () => {
        setCollapsableProfileDetail(!collapsableProfileDetail);
    };

    const handleClickInterest = () => {
        setCollapsableInterest(!collapsableInterest);
    };
    
    const handleClickSubscription = () => {
        setCollapsableSubscription(!collapsableSubscription);
    };


    //Effects
    
    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
    }, []);
    
    return (
        <ProfileClientContainer>
            <Box style={{ display: "flex", flexDirection: "column", gap: "32px", marginTop: 20 }} >
                <NavHeader title="Nombre usuario" isBack >
                    <BtnPrimary type="submit">
                        <SaveIcon />
                        {t("Profile.button.save")}
                    </BtnPrimary>            
                </NavHeader>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2,  paddingLeft:"20px" }}>
                    <Avatar
                        alt="Avatar"
                        src={`https://ui-avatars.com/api/?name=${name}&background=0045FF&color=FFF&bold=true`}
                        sx={{ width: 145, height: 145 }}
                    />
                    <Box>
                        <Typography variant="h6">{name}</Typography>
                        <Typography variant="body1">Tipo de usuario: registrado / suscrito</Typography>
                        <Chip label={t("Constants.status.active")} style={{ backgroundColor: "#D9D9D9", color: "#000000", height: "32px", width: "107px" }} />
                    </Box>
                </Box>
                
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <Box
                        sx={{ display: "flex", flexDirection: "column", gap: "24px", width: "66%"}}
                    >
                        <CollapsibleBox
                            title="Información general"
                            anchorEl={collapsableInfoGen}
                            style={{ backgroundColor: "white", maxHeight: collapsableInfoGen ? "100%" : "64px" }}
                            onClick={handleClickGeneralInfo}
                        >
                            {
                                collapsableInfoGen 
                                    ? 
                                    <div 
                                        style={{ 
                                            display: "flex", 
                                            flexDirection: "row", 
                                            padding: "32px", 
                                            gap: "62px",
                                        }}>
                                        <div
                                            style={{
                                                display:"flex",
                                                flexDirection: "column",
                                                width: "100%",
                                                gap: "40px"
                                            }}
                                        >
                                            <Typography variant="h2" sx={{ textTransform: "none" }} style={{                                        
                                                fontFamily: "Roboto",
                                                fontSize: "16px",
                                                fontWeight: "700",
                                                lineHeight: "19px",
                                                letterSpacing: "0em",
                                                textAlign: "left",
                                                color: "#1F2126"
                                            }}>Nombres: </Typography>
                                            
                                            <Typography variant="h2" sx={{ textTransform: "none" }} style={{                                        
                                                fontFamily: "Roboto",
                                                fontSize: "16px",
                                                fontWeight: "700",
                                                lineHeight: "19px",
                                                letterSpacing: "0em",
                                                textAlign: "left",
                                                color: "#1F2126"
                                            }}>Apellidos: </Typography>
                                            <Typography variant="h2" sx={{ textTransform: "none" }} style={{                                        
                                                fontFamily: "Roboto",
                                                fontSize: "16px",
                                                fontWeight: "700",
                                                lineHeight: "19px",
                                                letterSpacing: "0em",
                                                textAlign: "left",
                                                color: "#1F2126"
                                            }}>Número de celular: </Typography>
                                            <Typography variant="h2" sx={{ textTransform: "none" }} style={{                                        
                                                fontFamily: "Roboto",
                                                fontSize: "16px",
                                                fontWeight: "700",
                                                lineHeight: "19px",
                                                letterSpacing: "0em",
                                                textAlign: "left",
                                                color: "#1F2126"
                                            }}>Correo electrónico: </Typography>
                                            <Typography variant="h2" sx={{ textTransform: "none" }} style={{                                        
                                                fontFamily: "Roboto",
                                                fontSize: "16px",
                                                fontWeight: "700",
                                                lineHeight: "19px",
                                                letterSpacing: "0em",
                                                textAlign: "left",
                                                color: "#1F2126"
                                            }}>Contraseña: </Typography>
                                        </div>
                                        <div
                                            style={{
                                                display:"flex",
                                                flexDirection: "column",
                                                width: "135",
                                                gap: "40px"
                                            }}
                                        >
                                            
                                            <Typography variant="h3" sx={{ textTransform: "none" }} style={{
                                                fontFamily: "Roboto",
                                                fontSize: "16px",
                                                fontWeight: "400",
                                                lineHeight: "19px",
                                                letterSpacing: "0em",
                                                textAlign: "left",
                                                color: "#00000099"
                                            }}>{name}</Typography>
                                            <Typography variant="h3" sx={{ textTransform: "none" }} style={{
                                                fontFamily: "Roboto",
                                                fontSize: "16px",
                                                fontWeight: "400",
                                                lineHeight: "19px",
                                                letterSpacing: "0em",
                                                textAlign: "left",
                                                color: "#00000099"
                                            }}>Apellido usuario</Typography>
                                            <Typography variant="h3" sx={{ textTransform: "none" }} style={{
                                                fontFamily: "Roboto",
                                                fontSize: "16px",
                                                fontWeight: "400",
                                                lineHeight: "19px",
                                                letterSpacing: "0em",
                                                textAlign: "left",
                                                color: "#00000099"
                                            }}>3000000000</Typography>
                                            <Typography variant="h3" sx={{ textTransform: "none" }} style={{
                                                fontFamily: "Roboto",
                                                fontSize: "16px",
                                                fontWeight: "400",
                                                lineHeight: "19px",
                                                letterSpacing: "0em",
                                                textAlign: "left",
                                                color: "#00000099"
                                            }}>{email}</Typography>
                                            <Typography variant="h3" sx={{ textTransform: "none" }} style={{
                                                fontFamily: "Roboto",
                                                fontSize: "16px",
                                                fontWeight: "400",
                                                lineHeight: "19px",
                                                letterSpacing: "0em",
                                                textAlign: "left",
                                                color: "#00000099"
                                            }}>********</Typography>
                                        </div>
                                    </div>
                                    : 
                                    <></>
                            }             
                        </CollapsibleBox>
                        <CollapsibleBox
                            title="Ej. Detalles del perfil (sección creada por cada sitio)"
                            anchorEl={collapsableProfileDetail}
                            style={{ backgroundColor: "white" }}
                            onClick={handleClickProfileDetail}
                        >
                            <div>
                                {/* Contenido dentro del colapsable */}
                            </div>
                            <div>
                                {/* Otro contenido dentro del colapsable */}
                            </div>
                        </CollapsibleBox>
                        <CollapsibleBox
                            title="Ej. Intereses (sección creada por cada sitio)"
                            anchorEl={collapsableInterest}
                            style={{ backgroundColor: "white" }}
                            onClick={handleClickInterest}
                        >
                            <div>
                                {/* Contenido dentro del colapsable */}
                            </div>
                            <div>
                                {/* Otro contenido dentro del colapsable */}
                            </div>
                        </CollapsibleBox>
                        <CollapsibleBox
                            title="Suscripciones y planes"
                            anchorEl={collapsableSubscription}
                            style={{ backgroundColor: "white" }}
                            onClick={handleClickSubscription}
                        >
                            <div>
                                {/* Contenido dentro del colapsable */}
                            </div>
                            <div>
                                {/* Otro contenido dentro del colapsable */}
                            </div>
                        </CollapsibleBox>
                        <Box
                            sx={{
                                padding: "30px",
                                border: "1px solid #8A8A8A",
                                display: "flex",
                                flexDirection: "column",
                                backgroundColor: "white"
                            }}
                        >
                            <Box
                                sx={{
                                    minHeight: "40px",
                                    border: "1px solid #8A8A8A",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    justifyContent: "center",
                                    paddingLeft: "22px"
                                }}
                            >
                                <Typography variant="h3" sx={{ textTransform: "none" }} style={{                                        
                                    fontFamily: "Roboto",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    lineHeight: "19px",
                                    letterSpacing: "0em",
                                    textAlign: "left",
                                    color: "#000000"
                                }}>Nombre plan/ suscripción</Typography>
                            </Box>
                            <Box
                                sx={{
                                    height: "100%",
                                    border: "1px solid #8A8A8A",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    justifyContent: "center",
                                    paddingLeft: "22px",
                                    paddingY: "17px",
                                    gap: "8px"
                                }}
                            >
                            
                                <Typography variant="h4" sx={{ textTransform: "none" }} style={{                                        
                                    fontFamily: "Roboto",
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    lineHeight: "16px",
                                    letterSpacing: "0em",
                                    textAlign: "left",
                                    color: "#000000"
                                }}>Detalle del plan/ suscripción</Typography>

                                <Typography variant="h5" sx={{ textTransform: "none" }} style={{                                        
                                    fontFamily: "Roboto",
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    lineHeight: "16px",
                                    letterSpacing: "0em",
                                    textAlign: "left",
                                    color: "#000000"
                                }}>Lorem ipsum dolor sit amet consectetur. Rhoncus ut eu imperdiet purus euismod nunc blandit proin. Faucibus purus suspendisse non ac mauris ultrices. Porttitor at fringilla ac faucibus faucibus vitae. Tortor interdum et blandit id eget fringilla faucibus. Aliquet commodo volutpat montes lacus. Placerat turpis tellus risus nisi ut iaculis iaculis. Orci elit cursus faucibus quis quam sodales proin elementum at. </Typography>
                            </Box>
                            <Box
                                sx={{
                                    height: "100%",
                                    border: "1px solid #8A8A8A",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    justifyContent: "center",
                                    padding: "22px"
                                }}
                            >
                                <Typography variant="h3" sx={{ textTransform: "none" }} style={{                                        
                                    fontFamily: "Roboto",
                                    fontSize: "14px",
                                    fontWeight: "700",
                                    lineHeight: "16px",
                                    letterSpacing: "0em",
                                    textAlign: "left",
                                    color: "#000000"
                                }}>Valor tarifa: $00.000</Typography>

                                <Typography variant="h4" sx={{ textTransform: "none" }} style={{                                        
                                    fontFamily: "Roboto",
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    lineHeight: "16px",
                                    letterSpacing: "0em",
                                    textAlign: "left",
                                    color: "#000000",
                                    marginBottom: "18px"
                                }}> Cargo fijo mensual/renovado - vigencia plan
                                    <br />
                                Fecha de corte/pago (DD/MM/AA)</Typography>
                                <Typography variant="h3" sx={{ textTransform: "none" }} style={{                                        
                                    fontFamily: "Roboto",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    lineHeight: "19px",
                                    letterSpacing: "0em",
                                    textAlign: "left",
                                    marginBottom: "15px",
                                    color: "#000000"
                                }}>Nombre del sitio/s del plan</Typography>
                                <Typography variant="h3" sx={{ textTransform: "none" }} style={{                                        
                                    fontFamily: "Roboto",
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    lineHeight: "16px",
                                    letterSpacing: "0em",
                                    textAlign: "left",
                                    color: "#000000"
                                }}>Listado de productos</Typography>
                                <Box
                                    sx={{
                                        marginTop: "12px",
                                        display: "flex",
                                        flexDirection: "column",
                                        paddingLeft: "13px",
                                        gap: "5px"
                                    }}
                                >
                                    {listProducts.map((product, index) => (
                                        <Typography
                                            key={index}
                                            variant="h5"
                                            sx={{ textTransform: "none" }}
                                            style={{
                                                fontSize: "14px",
                                                fontFamily: "Roboto",
                                                fontWeight: "400",
                                                lineHeight: "16px",
                                                letterSpacing: "0em",
                                                textAlign: "left",
                                                color: "#000000"
                                            }}
                                        >
                                            {product.name}
                                        </Typography>
                                    ))}
                                </Box>
                                
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: "#FFFFFF",
                            maxHeight: "350px",
                            overflowY: "auto",
                        }}
                    >
                        <Box
                            sx={{
                                paddingY: "18px",
                                paddingX: "32px",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                gap: 2,
                                border: "1px solid #8A8A8A",
                            }}
                        >
                            <Typography
                                variant="h3"
                                sx={{ textTransform: "none" }}
                                
                                style={{
                                    fontSize: "24px",
                                    fontFamily: "Roboto",
                                    fontWeight: "400",
                                    lineHeight: "28px",
                                    letterSpacing: "0em",
                                    textAlign: "left",
                                    color: "#000000"
                                }}
                            >
                                Historial del usuario
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{ textTransform: "none" }}
                                
                                style={{
                                    fontSize: "16px",
                                    fontFamily: "Roboto",
                                    fontWeight: "400",
                                    lineHeight: "19px",
                                    letterSpacing: "0em",
                                    textAlign: "left",
                                    color: "#000000"
                                }}
                            >
                                Ver todos
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                padding: "32px",
                                gap: "24px",
                                border: "1px solid #8A8A8A"
                            }}
                        >
                            {historialData.map((activity, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <Typography
                                        variant="h4"
                                        sx={{ textTransform: "none" }}
                                        style={{
                                            fontSize: "16px",
                                            fontFamily: "Roboto",
                                            fontWeight: "700",
                                            lineHeight: "19px",
                                            letterSpacing: "0em",
                                            textAlign: "left",
                                            color: "#000000"
                                        }}
                                    >
                                        {activity.activityName}
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        sx={{ textTransform: "none" }}
                                        style={{
                                            fontSize: "16px",
                                            fontFamily: "Roboto",
                                            fontWeight: "400",
                                            lineHeight: "19px",
                                            letterSpacing: "0em",
                                            textAlign: "left",
                                            color: "#000000"
                                        }}
                                    >
                                        Fecha {activity.fecha}
                                    </Typography>
                                </Box>
                            ))}
                            
                        </Box>
                    </Box>
                </Box>
                
            </Box>
        </ProfileClientContainer>
    );
}
