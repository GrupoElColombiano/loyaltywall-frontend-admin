// MUI
import { Box, FormControlLabel, Switch, TextField, Typography } from "@mui/material";

// Components
import InitialHeader from "../../main/adapters/primary/InitialHeader/InitialHeader";

// Styles
import { ChPssContainer } from "./change-password.style";

const ChangePassword = () => {
    return (
        <ChPssContainer>
            <InitialHeader />
            <div style={{ color: "#F8F8F8" }}>
                <Box
                    component="form"
                    sx={{
                        marginTop: "20px",
                        width: "50%",
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            sx={{
                                width: "100%",
                                height: "56px",
                                backgroundColor: "#FFFFFF",
                            }}
                            required
                            id="siteName"
                            name="siteName"
                            label="Nombre del sitio"
                            placeholder="Nombre del sitio"
                        />
                    </div>
                    <div
                        style={{
                            marginTop: "20px",
                        }}
                    >
                        <TextField
                            sx={{
                                width: "100%",
                                height: "56px",
                                backgroundColor: "#FFFFFF",
                            }}
                            required
                            label="URL del sitio"
                            placeholder="url"
                            id="siteURL"
                            name="siteURL"
                        />
                    </div>
                    <div
                        style={{
                            marginTop: "20px",
                        }}
                    >
                        <TextField
                            sx={{
                                width: "100%",
                                height: "130px",
                                backgroundColor: "#FFFFFF",
                            }}
                            multiline
                            rows={4}
                            required
                            label="Description"
                            placeholder="text area"
                            id="siteDescription"
                            name="siteDescription"
                        />
                    </div>
                    <div>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                height: "24px",
                                fontFamily: "Roboto",
                                fontSize: "18px",
                                fontWeight: 700,
                                lineHeight: "21px",
                                letterSpacing: "0em",
                                textAlign: "left",
                                color: "#000000",
                            }}
                        >
              Status
                        </Typography>
                        <FormControlLabel
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "start",
                            }}
                            control={<Switch id="siteStatus" name="siteStatus" />}
                            label="Inactivo / Activo"
                        />
                        <Typography
                            variant="h2"
                            component="div"
                            sx={{
                                width: "50%",
                                height: "23px",
                                fontFamily: "Roboto",
                                fontSize: "12px",
                                fontWeight: 400,
                                lineHeight: "20px",
                                letterSpacing: "0.4000000059604645px",
                                textAlign: "left",
                                color: "#0000008F",
                            }}
                        >
              Descripción breve de la acción status
                        </Typography>
                    </div>
                </Box>
            </div>

            <strong>This is change password</strong>
        </ChPssContainer>
    );
};

export default ChangePassword;
