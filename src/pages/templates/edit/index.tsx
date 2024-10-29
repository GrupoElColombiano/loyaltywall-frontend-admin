// ReactJS
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
// import ReactQuill from "react-quill";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { Grid, Select, MenuItem, FormControl, InputLabel } from "@mui/material"; // Button
import ReactQuill from "react-quill";


// MUI
import { Box, FormControlLabel, Tab, Tabs, Switch, TextField, Typography } from "@mui/material";

// External Dependencies
import Editor from "@monaco-editor/react";

// Yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Shared
import { BtnPrimary } from "../../../shared/components/Buttons";
import NavHeader from "../../../shared/components/NavHeader";

// Services
import { createTemplateWithPlans, updateTemplate, updateIsActive } from "../../../service/templates";

// External Dependencies
import Swal from "sweetalert2";

// Icons
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

// Styles
import { Form } from "./styled";
import "react-quill/dist/quill.snow.css";
import { getListPlans } from "../../../service/plans/plans.service";



interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    // Props
    const { children, value, index, ...other } = props;

    return (
        <div
            {...other}
            aria-labelledby={`simple-tab-${index}`}
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            role="tabpanel"
        >
            {value === index && (
                <Box sx={{ padding: "20px 0px" }}>
                    {children}
                </Box>
            )}
        </div>
    );
}


const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
        ["link", "image"],
        ["clean"]
    ],
};

const formats = [
    "header",
    "bold", "italic", "underline", "strike", "blockquote",
    "list", "bullet", "indent",
    "link", "image"
];

//   const planCurrent = [
//         {
//             name: "Plan premium",
//             description: "Prueba de plan",
//             rate: [
//                 {
//                     id: 93,
//                     time: "Quincenal",
//                     rate: "12.00",
//                     rate_special: "15.00",
//                     rate_special_renewal: "18.00",
//                     rate_renewal: "120.00",
//                     duration: 14,
//                     is_special: true,
//                     date_start: "2023-12-05",
//                     date_end: "2023-12-19"
//                 },
//                 {
//                     id: 94,
//                     time: "Quincenal",
//                     rate: "12.00",
//                     rate_special: "15.00",
//                     rate_special_renewal: "18.00",
//                     rate_renewal: "120.00",
//                     duration: 14,
//                     is_special: true,
//                     date_start: "2023-12-05",
//                     date_end: "2023-12-19"
//                 }
//             ],
//             plansProductsCategory: [
//                 {
//                     _id: { $oid: "6675ad0b45b354637ce8d889" },
//                     idPlansProductCategory: 1060,
//                     categorysAccess: [
//                         {
//                             frequency: null,
//                             id: 466,
//                             duration: 7,
//                             unlimited: false,
//                             _id: { $oid: "6675ad0b45b354637ce8d88b" },
//                             typeDuration: null,
//                             amount: 2,
//                             category: {
//                                 name: "Gratis",
//                                 idCategory: 146,
//                                 description: "Gratis",
//                                 rules: "Premium Suscrito",
//                                 is_accessible_for_free: false,
//                                 _id: { $oid: "6675ad0b45b354637ce8d88c" }
//                             }
//                         }
//                     ],
//                     product: {
//                         description: "Producto que permite acceder a la seccion de Mundo curioso",
//                         updatedAt: "2024-02-12T17:44:34.816Z",
//                         idProduct: 117,
//                         all_product: false,
//                         _id: { $oid: "6675ad0b45b354637ce8d88a" },
//                         isActive: true,
//                         name: "Mundo curioso",
//                         createdAt: "2024-02-12T17:44:34.816Z"
//                     }
//                 },
//                 {
//                     idPlansProductCategory: 1059,
//                     _id: { $oid: "6675ad0b45b354637ce8d88d" },
//                     categorysAccess: [
//                         {
//                             duration: 7,
//                             _id: { $oid: "6675ad0b45b354637ce8d88f" },
//                             typeDuration: null,
//                             id: 465,
//                             frequency: null,
//                             amount: 4,
//                             unlimited: false,
//                             category: {
//                                 idCategory: 145,
//                                 name: "Premium",
//                                 rules: "Premium Suscrito",
//                                 is_accessible_for_free: false,
//                                 description: "Premium",
//                                 _id: { $oid: "6675ad0b45b354637ce8d890" }
//                             }
//                         }
//                     ],
//                     product: {
//                         idProduct: 116,
//                         description: "Producto que permite acceder a la seccion de deportes",
//                         _id: { $oid: "6675ad0b45b354637ce8d88e" },
//                         updatedAt: "2024-02-12T17:44:34.816Z",
//                         name: "Deportes",
//                         all_product: false,
//                         isActive: true,
//                         createdAt: "2024-02-12T17:44:34.816Z"
//                     }
//                 }
//             ]
//         },
//         {
//             plan: "Plan Free",
//             description: "Prueba de plan free",
//             rate: [
//                 {
//                     id: 93,
//                     time: "Quincenal",
//                     rate: "12.00",
//                     rate_special: "15.00",
//                     rate_special_renewal: "18.00",
//                     rate_renewal: "120.00",
//                     duration: 14,
//                     is_special: true,
//                     date_start: "2023-12-05",
//                     date_end: "2023-12-19"
//                 },
//                 {
//                     id: 94,
//                     time: "Quincenal",
//                     rate: "12.00",
//                     rate_special: "15.00",
//                     rate_special_renewal: "18.00",
//                     rate_renewal: "120.00",
//                     duration: 14,
//                     is_special: true,
//                     date_start: "2023-12-05",
//                     date_end: "2023-12-19"
//                 }
//             ],
//             plansProductsCategory: [
//                 {
//                     _id: { $oid: "6675ad0b45b354637ce8d889" },
//                     idPlansProductCategory: 1060,
//                     categorysAccess: [
//                         {
//                             frequency: null,
//                             id: 466,
//                             duration: 7,
//                             unlimited: false,
//                             _id: { $oid: "6675ad0b45b354637ce8d88b" },
//                             typeDuration: null,
//                             amount: 2,
//                             category: {
//                                 name: "Gratis",
//                                 idCategory: 146,
//                                 description: "Gratis",
//                                 rules: "Premium Suscrito",
//                                 is_accessible_for_free: false,
//                                 _id: { $oid: "6675ad0b45b354637ce8d88c" }
//                             }
//                         }
//                     ],
//                     product: {
//                         description: "Producto que permite acceder a la seccion de Mundo juridico",
//                         updatedAt: "2024-02-12T17:44:34.816Z",
//                         idProduct: 117,
//                         all_product: false,
//                         _id: { $oid: "6675ad0b45b354637ce8d88a" },
//                         isActive: true,
//                         name: "Mundo curioso",
//                         createdAt: "2024-02-12T17:44:34.816Z"
//                     }
//                 },
//                 {
//                     idPlansProductCategory: 1059,
//                     _id: { $oid: "6675ad0b45b354637ce8d88d" },
//                     categorysAccess: [
//                         {
//                             duration: 7,
//                             _id: { $oid: "6675ad0b45b354637ce8d88f" },
//                             typeDuration: null,
//                             id: 465,
//                             frequency: null,
//                             amount: 4,
//                             unlimited: false,
//                             category: {
//                                 idCategory: 145,
//                                 name: "Premium",
//                                 rules: "Premium Suscrito",
//                                 is_accessible_for_free: false,
//                                 description: "Premium",
//                                 _id: { $oid: "6675ad0b45b354637ce8d890" }
//                             }
//                         }
//                     ],
//                     product: {
//                         idProduct: 116,
//                         description: "Producto que permite acceder a la seccion de farandula",
//                         _id: { $oid: "6675ad0b45b354637ce8d88e" },
//                         updatedAt: "2024-02-12T17:44:34.816Z",
//                         name: "Deportes",
//                         all_product: false,
//                         isActive: true,
//                         createdAt: "2024-02-12T17:44:34.816Z"
//                     }
//                 }
//             ]
//         }
//     ];

const EditTemplate: React.FC = () => {
    // Translations
    const { t } = useTranslation();

    // Navigation
    const navigate = useNavigate();

    const location = useLocation();
    const { data, plans }: { data: any; plans: any[] }  = location.state;
    const id = data?._id;

    // Local Storage
    const siteStorage = JSON.parse(localStorage.getItem("siteUser") || "{}");

    // Refs
    const editorRef = useRef<any>(null);

    // States
    const [editor, setEditor] = useState(data?.html || "");

    const [tab, setTab] = useState(0);

    const [isPublish, setIsPublish] = useState(false);

    // Yup
    const validationScheme = yup.object().shape({
        name: yup.string().required(t("Templates.form.nameRequired")),
        description: yup.string(),
        status: yup.boolean(),
    });

    // Form
    const {
        handleSubmit,
        register,
        formState: { isDirty }
    } = useForm({
        defaultValues: {
            name: data.name,
            description: data.description,
            status: data.isActive,
        },
        mode: "onChange",
        resolver: yupResolver(validationScheme),
    });

  
    const [rows, setRows] = useState<any[]>([]);

    useEffect(() => {

       
        const idPlans = plans.map(plan => plan.idPlan).join(",");

        getListPlans(1, 10, "", idPlans, (result: any) => {

           
            if (result.code == "ERR_BAD_REQUEST") {
                // toast.error("" + result.response.data.message);
                setRows(result.data.data || []);
            
                return;
            }

            if (result.status == 200) {
                console.log(" EL RESULTADO DEL PLAN ", result.data.data);
                // toast.success(result.statusText);
                setRows(result.data.data);
                
                return;
            }

            if (result.response.data.status == 406) {
                //toast.warn(result.response.data.message);
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
    }, []);

    // Functions
    const onSubmit = (data: any) => {
        const refactoredData = {
            description: data.description,
            html: plans.map(plan => plan.idPlan).join(","),
            idSite: siteStorage.idSite,
            isActive: data.status,
            name: data.name,
            plans: plans,
            published: isPublish,
        };

        updateTemplate(id, refactoredData)
            .then(() => {
                createTemplateWithPlans({
                    id_template: id,
                    plans: plans,
                })
                    .then(() => {
                        console.log("Plans created successfully");
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                Swal.fire({
                    title: t("Alert.edit.title"),
                    text: t("Alert.edit.text"),
                    confirmButtonText: t("Alert.button.confirm"),
                    confirmButtonColor: "#0045FF",
                    icon: "success",
                });

                if (refactoredData.published === true) {
                    Swal.fire({
                        title: t("Alert.save.publish.title"),
                        text: t("Alert.save.text"),
                        confirmButtonText: t("Alert.button.confirm"),
                        confirmButtonColor: "#0045FF",
                        icon: "success",
                    });
                }

                navigate(-1);
            })
            .catch(() => {
                Swal.fire({
                    title: t("Alert.error.title"),
                    text: t("Alert.error.text"),
                    confirmButtonText: t("Alert.button.confirm"),
                    confirmButtonColor: "#0045FF",
                    icon: "error",
                });
            });
    };



    const handleSwitchChange = async (event: { target: { checked: any; }; }) => {
        const isActive = event.target.checked;
        const refactoredData = {
            isActive: isActive,
        };
    
        try {
            await updateIsActive(id, refactoredData);
            console.log(`Template ${id} is now ${isActive ? "active" : "inactive"}`);
        } catch (error) {
            console.error("Error updating template status:", error);
        }
    };
    
     const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        event.preventDefault();
        setTab(newValue);
    };

    const handleEditorDidMount = (editor: any, monaco: any) => {
        console.log(monaco);
        editorRef.current = editor;
    };

    const handleChangeEditor = () => {
        setEditor(editorRef.current.getValue());
    };


    const ResponsiveCard = ({ plan, description, products, rates }: any) => (
        <Card variant="outlined" sx={{ width: "100%" }}>
            <Box sx={{ p: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography gutterBottom variant="h4" component="div">
                        {plan}
                    </Typography>
                </Stack>
                <Typography color="text.secondary" variant="body2">
                    {description}
                </Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
                <Typography gutterBottom variant="body2">
                    Select type
                </Typography>
                <Stack direction="column" spacing={1}>
                    {products.map((product: any) => (
                        <Chip label={product.product.description} size="small" />
                    ))}
                </Stack>
            </Box>
            <Divider variant="middle" sx={{ borderBottomWidth: 2 }} />
            <Box sx={{ p: 2 }}>
                <Typography gutterBottom variant="body2">
                    Select rate
                </Typography>
                {rates !== undefined && rates.length > 0 ? (
                    <FormControl fullWidth>
                        <InputLabel id="rate-select-label">Rate</InputLabel>
                        <Select labelId="rate-select-label" label="Rate">
                            {rates.map((rate: any) => (
                                <MenuItem key={rate.id} value={rate.id}>
                                    {`${rate.time} - ${rate.rate}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                ) : (
                    <Typography variant="body2">No rates available</Typography>
                )}
            </Box>
            <Divider variant="middle" sx={{ borderBottomWidth: 2 }} />
             
        </Card>
    );
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: '10px', maxHeight: '90vh' }}>

           
            <NavHeader title={t("Templates.edit.title")} description={t("Templates.edit.description")} isBack isFormDirty={isDirty}>
                <BtnPrimary onClick={() => setIsPublish(true)} type="submit">
                    <SaveOutlinedIcon />
                    {t("Templates.button.save")}
                </BtnPrimary>
            </NavHeader>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">
                    {t("Templates.form.status")}
                </Typography>
                <FormControlLabel
                    control={
                        <Switch
                            {...register("status")}
                            color="primary"
                            defaultChecked
                            name="status"
                            onChange={handleSwitchChange}
                        />
                    }
                    label={`${t("Templates.form.active")} / ${t("Templates.form.inactive")}`}
                />
                <Typography variant="subtitle1" style={{ color: "#6B7280" }}>
                    {t("Templates.new.status.description")}
                </Typography>
            </Box>

            <TextField
                {...register("name")}
                id="name"
                label={t("Templates.form.name")}
                placeholder={t("Templates.form.name.placeholder")}
                sx={{ backgroundColor: "#fff", width: "50%" }}
                type="text"
                variant="outlined"
            />

            <TextField
                {...register("description")}
                id="description"
                label={t("Templates.form.description")}
                multiline
                placeholder={t("Templates.form.description.placeholder")}
                rows={4}
                sx={{ backgroundColor: "#fff", width: "50%" }}
                type="text"
                variant="outlined"
            />

            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label={t("Templates.tabs.editor")} />
                        <Tab label={t("Templates.tabs.html")} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={tab} index={0}>
                    <ReactQuill
                        style={{ backgroundColor: "#fff" }}
                        formats={formats}
                        modules={modules}
                        onChange={setEditor}
                        theme="snow"
                        value={editor}
                    />
                </CustomTabPanel>
                <CustomTabPanel value={tab} index={1}>
                    <Editor
                        defaultLanguage="html"
                        defaultValue={editor}
                        height="200px"
                        onChange={handleChangeEditor}
                        onMount={handleEditorDidMount}
                    />
                </CustomTabPanel>
            </Box>

            <Box>
                <Grid container spacing={2}>
                    {rows.map((plan, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <ResponsiveCard
                                plan={plan.name}
                                description={plan.description}
                                products={plan.plansProductsCategory}
                                rates={plan.rates}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            </div>
        </Form>
    );
};

export default EditTemplate;
