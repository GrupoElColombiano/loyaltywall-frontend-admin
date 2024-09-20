// ReactJS
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { ChangeEvent, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactQuill from "react-quill";

// MUI
import { Box, FormControlLabel, Switch, Tab, Tabs, TextField, Typography } from "@mui/material";

// External Dependencies
import Editor from "@monaco-editor/react";

// Yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Shared
import { BtnPrimary } from "../../../shared/components/Buttons";
import NavHeader from "../../../shared/components/NavHeader";

// Services
import { createTemplate, createTemplateWithPlans } from "../../../service/templates";

// External Dependencies
import Swal from "sweetalert2";

// Icons
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

// Styles
import { Form } from "./styled";
import "react-quill/dist/quill.snow.css";

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

const NewTemplate: React.FC = () => {
    // Translations
    const { t } = useTranslation();

    // Navigation
    const navigate = useNavigate();

    // Local Storage
    const siteStorage = JSON.parse(localStorage.getItem("siteUser") || "{}");

    const location = useLocation();
    const { plans } = location.state;

    // Refs
    const editorRef = useRef<any>(null);

    // States
    const [editor, setEditor] = useState("");
    const [templateStatus, setTemplateStatus] = useState(false);

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
        mode: "onChange",
        resolver: yupResolver(validationScheme),
    });

    // Functions
    const onSubmit = (data: any) => {
        const refactoredData = {
            description: data.description,
            html: editor,
            idSite: siteStorage?.idSite,
            isActive: data.status,
            name: data.name,
            plans: plans,
            published: isPublish,
        };

        createTemplate(refactoredData)
            .then(async (res) => {           
                await createTemplateWithPlans({
                    id_template: res.data._id,
                    plans: plans,
                })
                    .then(() => {
                        console.log("Plans created successfully");
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                    
                Swal.fire({
                    title: t("Alert.save.title"),
                    text: t("Alert.save.text"),
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
                    icon: "error",
                    confirmButtonText: t("Alert.button.confirm"),
                });
            });
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

    const handleStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newStatus = event.target.checked;
        if (newStatus !== templateStatus) {
            Swal.fire({
                title: t("Alert.status.title"),
                text: t("Alert.status.text"),
                showCancelButton: true,
                confirmButtonText: t("Alert.button.confirm"),
                cancelButtonText: t("Alert.button.cancel"),
                confirmButtonColor: "#0045FF",
                icon: "question",
                allowOutsideClick: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    setTemplateStatus(newStatus);
                } else {
                    setTemplateStatus(templateStatus);
                }
            });
        }
    };   

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <NavHeader title={t("Templates.new.title")} description={t("Templates.new.description")} isBack isFormDirty={isDirty}>
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
                            id="templateStatus"
                            name="templateStatus"
                            checked={templateStatus}
                            onChange={handleStatusChange}
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
        </Form>
    );
};

export default NewTemplate;
