// ReactJS
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// MUI
import { Avatar, Box, TextField, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

// Shared
import { BtnPrimary } from "../../shared/components/Buttons";
import NavHeader from "../../shared/components/NavHeader";

// Yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Services
import { editUsers } from "../../service/usersKeycloack/usersKeycloack.service";
import { getUserById } from "../../service/auth";

// External Dependencies
import Swal from "sweetalert2";

// Styled
import { ProfileContainer } from "./styled";

function UserForm ({ user }: any) {
    // Translation
    const { t } = useTranslation();

    // Navigation
    const navigate = useNavigate();

    const userData = JSON.parse(localStorage.getItem("user") || "{}");    

    const role = JSON.parse(localStorage.getItem("rolUser") || "{}");

    const accessToken = localStorage.getItem("access_token");

    // Yup
    const validationScheme = yup.object().shape({
        firstName: yup.string().required(t("Constants.form.firstNameRequired")),
        lastName: yup.string().required(t("Constants.form.lastNameRequired")),
    });

    // Form
    const {
        handleSubmit,
        register,
    } = useForm({
        defaultValues: {
            firstName: user?.firstName,
            lastName: user?.lastName,
        },
        mode: "all",
        resolver: yupResolver(validationScheme),
    });

    // Functions
    const onSubmit = async (data: any) => {  
        const refactoredData = {
            firstName: data.firstName,
            lastName: data.lastName,
            sub: userData.profile?.sub,
        };

        handleEditProfileInfo(refactoredData);
    };    

    const handleEditProfileInfo = (data: any) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "La información de tu perfil se actualizará",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4073FF",
            cancelButtonColor: "#EF5350",
            confirmButtonText: "Ok",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                handleChangeData({ user: data });
            }
        });
    };

    const handleChangeData = (params: { user: any}) => {        
        editUsers( accessToken, params.user, (result: any) => {
            if (result.code == "ERR_BAD_REQUEST") {
                // toast.error("" + result.response.data.message);
                return;
            }

            if (result.status == 200) {
                // toast.success(result.statusText);
                Swal.fire({
                    title: "Exitoso",
                    text: "Se ha actualizado la información de tu perfil",
                    icon: "success",
                    confirmButtonText: "Ok",
                    customClass: {
                        container: "my-swal-container",
                    },
                });
                
                navigate(-1);
                return;
            }

            if (result.response.data.status == 406) {
                // toast.warn(result.response.data.message);
                return;
            }

            if (result.response.data.status == 201) {
                // toast.success(result.statusText);
                return;
            }

            if (result.response.data.status == 404) {
                // toast.warn(result.response.data.message);
                return;
            }

        });
    }; 

    return (
        <form style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 20 }} onSubmit={handleSubmit(onSubmit)}>
            <NavHeader title={t("Profile.title")} isBack >
                <BtnPrimary type="submit">
                    <SaveIcon />
                    {t("Profile.button.save")}
                </BtnPrimary>            
            </NavHeader>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
                <Avatar
                    alt="Avatar"
                    src={`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=0045FF&color=FFF&bold=true`}
                    sx={{ width: 145, height: 145 }}
                />
                <Box>
                    <Typography variant="h6">{user?.firstName} {user?.lastName}</Typography>
                    <Typography variant="body1">{user?.email}</Typography>
                </Box>
            </Box>

            <TextField
                {...register("firstName")}
                defaultValue={user?.firstName}
                id="name"
                label={t("Profile.form.name")}
                placeholder={t("Profile.form.name.placeholder")}
                sx={{ backgroundColor: "#fff", width: "50%" }}
                type="text"
                variant="outlined"
            />

            <TextField
                {...register("lastName")}
                defaultValue={user?.lastName}
                id="lastName"
                label={t("Profile.form.lastName")}
                placeholder={t("Profile.form.lastName.placeholder")}
                sx={{ backgroundColor: "#fff", width: "50%" }}
                type="text"
                variant="outlined"
            />

            <TextField
                defaultValue={role?.name}
                disabled
                id="name"
                label={t("Profile.form.role")}
                placeholder={t("Profile.form.role.placeholder")}
                sx={{ backgroundColor: "#fff", width: "50%" }}
                type="text"
                variant="outlined"
            />

            <TextField
                defaultValue={user?.email}
                disabled
                id="name"
                label={t("Profile.form.email")}
                placeholder={t("Profile.form.email.placeholder")}
                sx={{ backgroundColor: "#fff", width: "50%" }}
                type="text"
                variant="outlined"
            />
        </form>
    );
}

export default function ProfilePage() {
    // LocalStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");    
    
    const [userDetail, setUser] = useState(null);

    const [loading, setLoading] = useState(false);

    //Effects    
    useEffect(() => {
        setLoading(true);
        // TODO()
        getUserById(user?.profile?.sub, user?.access_token)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [user?.profile?.sub]);   
    
    if (loading) return null;
    
    return (
        <ProfileContainer>            
            <UserForm user={userDetail} />
        </ProfileContainer>
    );
}
