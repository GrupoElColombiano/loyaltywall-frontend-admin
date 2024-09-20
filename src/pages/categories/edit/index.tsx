// ReactJS
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// MUI
import { TextField, Typography } from "@mui/material";

// Shared
// import InputSelect from "../../../shared/components/Select";
import { BtnPrimary } from "../../../shared/components/Buttons";
import Announcement from "../../../shared/components/Announcement";
import NavHeader from "../../../shared/components/NavHeader";
import SelectWithClear from "../../../main/adapters/primary/SelectWithClear";

// Services
import { updateCategory } from "../../../service/categories";
import { getProductsBySite } from "../../../service/products";

// Yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// External Dependencies
import Swal from "sweetalert2";

// Icons
import SaveIcon from "@mui/icons-material/Save";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";


// Styled
import { EditCategoriesContainer } from "./styled";

export default function EditCategoryPage() {
    // Translation
    const { t } = useTranslation();

    // Navigation
    const navigate = useNavigate();

    const location = useLocation();
    const { data: dataCategory } = location.state;

    // States
    const [products, setProducts] = useState<IOption[]>([]);

    const [selectedProduct, setSelectedProduct] = useState(dataCategory?.idProduct);

    const [btnLoading, setBtnLoading] = useState(false);

    // Yup
    const validationScheme = yup.object().shape({
        description: yup.string().required(t("Constants.form.descriptionRequired")),
        name: yup.string().required(t("Constants.form.nameRequired"))
    });

    // Form
    const {
        handleSubmit,
        register,
        formState: { isDirty }
    } = useForm({
        defaultValues: {
            description: dataCategory.description,
            name: dataCategory.name,
        },
        mode: "onChange",
        resolver: yupResolver(validationScheme),
    });

    // Functions
    const onSubmit = (data: any) => {
        if (selectedProduct === 0) {
            Swal.fire({
                confirmButtonColor: "#0045FF",
                confirmButtonText: t("Alert.button.confirm"),
                icon: "error",
                text: t("Alert.error.text"),
                title: t("Alert.error.title"),
            });

            return;
        }
        
        const refactorData = {
            ...data,
            product: selectedProduct,
            site: dataCategory?.idSite,
        };

        setBtnLoading(true);

        updateCategory(dataCategory.idCategory, refactorData)
            .then(() => {
                Swal.fire({
                    confirmButtonColor: "#0045FF",
                    confirmButtonText: t("Alert.button.confirm"),
                    icon: "success",
                    text: t("Alert.edit.text"),
                    title: t("Alert.edit.title"),
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate(-1);
                    }
                });
            })
            .catch(() => {
                Swal.fire({
                    confirmButtonColor: "#0045FF",
                    confirmButtonText: t("Alert.button.confirm"),
                    icon: "error",
                    text: t("Alert.error.text"),
                    title: t("Alert.error.title"),
                });
            })
            .finally(() => {
                setBtnLoading(false);
            });
    };

    // Effects
    useEffect(() => {
        getProductsBySite(dataCategory?.idSite)
            .then((res) => {
                res.data?.products.map((item: IProductsBody) => {
                    setProducts((oldArray) => [...oldArray, { value: item.idProduct, label: item.name }]);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [dataCategory?.idSite]);

    return (
        <EditCategoriesContainer onSubmit={handleSubmit(onSubmit)}>
            <NavHeader title={`${t("Categories.edit.title")}`} description={`${t("Categories.edit.description")}`} isBack isFormDirty={isDirty}>
                <BtnPrimary type="submit" loading={btnLoading}>
                    <SaveIcon />
                    {t("Categories.button.save")}
                </BtnPrimary>
            </NavHeader>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <Announcement text={t("Categories.announcement.create")} />

                <TextField
                    {...register("name")}
                    id="name"
                    label={t("Categories.form.name")}
                    placeholder={t("Categories.form.name.placeholder")}
                    sx={{ backgroundColor: "#fff", width: "50%", marginTop: "10px" }}
                    type="text"
                    variant="outlined"
                />

                <TextField
                    {...register("description")}
                    fullWidth
                    id="description"
                    label={t("Constants.form.description")}
                    multiline
                    placeholder={t("Constants.form.description.placeholder")}
                    rows={4}
                    sx={{ backgroundColor: "#fff" }}
                    type="text"
                    variant="outlined"
                />

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Inventory2OutlinedIcon sx={{ color: "#0045FF", fontSize: 30 }} />

                    <Typography variant="h6" component="h2">
                        {t("Categories.form.title.product")}
                    </Typography>
                </div>

                <Typography variant="body1" component="p">
                    {t("Categories.form.subtitle.product")}
                </Typography>
                
                <SelectWithClear
                    data={products}
                    dataIdKey="value"
                    dataNameKey="label"
                    label={t("Constants.label.product")}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSelectedProduct(e.target.value as unknown as number);
                    }}
                    onClear={() => setSelectedProduct(0)}
                    style={{ width: "50%", backgroundColor: "#fff" }}
                    value={selectedProduct}
                    disabled={dataCategory?.idSite === 0}
                />
            </div>
        </EditCategoriesContainer>
    );
}