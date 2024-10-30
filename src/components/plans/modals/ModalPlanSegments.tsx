// ReactJS
import { useState } from "react";
import { useTranslation } from "react-i18next";

// MUI
import { MenuItem, Modal, Paper, Select, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Tooltip, Typography } from "@mui/material";

// Shared
import { BtnPrimary, BtnSecondary } from "../../../shared/components/Buttons";

// External Dependences
import Swal from "sweetalert2";

// Icons
import { DeleteOutline, SettingsOutlined } from "@mui/icons-material";

// Styled
import { SectionContainer, ModalContainer, BtnContainer, GridContainer, MainTextTitle } from "./styled";

export default function ModalPlanSegments({ modal, setModal, handleRefresh, segments }: any) {
    const { t } = useTranslation();
 
    const [temporalData, setTemporalData] = useState<any[]>(modal?.data || [])
    // Yup
    // const validationScheme = yup.object().shape({
    //     categories: yup.array().of(
    //         yup.object().shape({
    //             quantity: yup.number().required("Este campo es requerido"),
    //             category: yup.string().required("Este campo es requerido"),
    //             duration: yup.number().required("Este campo es requerido"),
    //             limited: yup.boolean().required("Este campo es requerido"),
    //         })
    //     ),
    // });

    // useForm
    // const {
    //     control,
    //     // handleSubmit,
    //     register,
    //     reset,
    //     watch
    // } = useForm({
    //     defaultValues: {
    //         categories: editData?.categories?.map((item: any) => {
    //             return {
    //                 amount: item?.amount,
    //                 category: item?.idCategory,
    //                 duration: item?.duration,
    //                 limited: item?.limited,
    //             };
    //         }) || [],
    //     },
    //     mode: "all",
    //     resolver: yupResolver(validationScheme),
    // });

    // const { fields, append, remove } = useFieldArray({
    //     control,
    //     name: "categories",
    // });

    // useEffect(() => {
    //     remove();
    // }, [modal?.open]);
    
    const onSubmit = () => {
        setModal({
            open: false,
            data: temporalData
        })
    }

    const handleClose = () => {
        // reset();
        handleRefresh && handleRefresh();

        // fields.forEach((_, index) => remove(index));
        
        setModal({
            ...modal,
            open: false
        });
    }; 

    const configuredSegments: number = temporalData?.length || 0;
    const items: string[] = [t('Segments.select.default')];
    for (let i = 0; i < configuredSegments; i++) {
        items.push(`${t('Segments.priority')} ${i + 1}`);
      }

    const handleNewRow = () => {
        let updatedData = [];
        if (temporalData.length === 1) {
            updatedData = [
                {
                    segment: temporalData[0]?.segment || 'default',
                    quantity: 0,
                    priority: temporalData[0]?.priority || t('Segments.select.default')
                },
                {
                    segment: 'default',
                    quantity: 0,
                    priority: t('Segments.select.default')
                }
            ]
        } else {
            updatedData = [
                ...temporalData,
                {
                    segment: 'default',
                    quantity: 0,
                    priority: t('Segments.select.default')
                }
            ]
        }
        setTemporalData(updatedData)
    };

    const handleRemove = (indexToRemove: number) => {
        const updateData = temporalData?.filter((_, index) => index !== indexToRemove);
        setTemporalData(updateData)
    }

    const handleUpdate = ({ index, field, value }: any) => {
        const updateData = temporalData?.map((item: any, position: number) => {
            if (position === index) {
                return {
                   ...item,
                    [field]: value
                };
            }
            return item;
        });
        setTemporalData(updateData);
    }

    const hasDefault = temporalData.some(obj => Object.values(obj).includes('default'));
    const hasZero = temporalData.some(obj => Object.values(obj).includes(0));
    console.log({ temporalData });
    console.log({ hasDefault, hasZero });
    return (
        <Modal
            aria-describedby="modal-modal-description"
            aria-labelledby="modal-modal-title"
            onClose={handleClose}
            open={modal.open}
            id="modal-plan-products"
        >
            <ModalContainer>
                <SectionContainer>
                    <Typography variant="body1" component="h3" sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <SettingsOutlined sx={{ color: "#0045FF", fontSize: 25 }} />
                        {t("Plan.new.segments")}
                    </Typography>

                    <Typography variant="body1" component="span">
                        {t("Plan.new.segments.modal.description")}
                    </Typography>


                    <GridContainer style={ {marginTop: "12px", maxHeight: "45vh" }}>
                        <TableContainer
                            component={Paper}
                            sx={{
                                border: "1px solid rgba(0, 0, 0, 0.23)",
                                borderRadius: "5px",
                                background: "#F8F8F8",
                                color: "#0000008F", 
                                width: "100%", 
                                boxShadow: "none", 
                                height: "266px", 
                                maxHeight: "266px", 
                                overflowY: "scroll"
                            }}
                        >
                            <Table style={{ borderColor: "transparent" }}>
                                <TableBody>
                                    {
                                        Array.isArray(temporalData) && temporalData?.map((segment, index) => {
                                            return (
                                                <div style={{ display: 'flex', flexDirection: 'row', margin: '20px', gap: '4px' }}>
                                                    <Select
                                                        fullWidth
                                                        labelId="demo-multiple-name-label"
                                                        id="demo-multiple-name"
                                                        value={segment?.segment}
                                                        placeholder={t("Placeholders.select")}
                                                        variant="outlined"
                                                        onChange={(event: any) => {
                                                            console.log("Event", event.target.value)
                                                            handleUpdate({ index, field: "segment", value: event.target.value })
                                                        }}
                                                    >
                                                        {segments?.map((segment: any) => (
                                                            <MenuItem disabled={segment.value === 'default'} key={segment.value} value={segment.value}>
                                                                {segment.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                    <TextField
                                                        fullWidth
                                                        id={`categories.${index}.amount`}
                                                        value={segment?.quantity}
                                                        inputProps={{ inputMode: "numeric", min: 1 }}
                                                        label={t("Plan.newPlan.modal.categories.amount")}
                                                        type="number"
                                                        variant="outlined"
                                                        onChange={(event: any) => {
                                                            console.log("Event", event.target.value)
                                                            handleUpdate({ index, field: "quantity", value: Number(event.target.value) })
                                                        }}
                                                    />
                                                    {
                                                        configuredSegments > 1 && (
                                                            <Select
                                                                defaultValue={segment?.category}
                                                                fullWidth
                                                                id={`categories.${index}.name`}
                                                                labelId="select-name-label"
                                                                placeholder={t("Placeholders.select")}
                                                                variant="outlined"
                                                                value={segment?.priority}
                                                                onChange={(event: any) => {
                                                                    console.log("Event", event.target.value)
                                                                    handleUpdate({ index, field: "priority", value: event.target.value })
                                                                }}
                                                            >
                                                                {
                                                                    items?.map((item) => (
                                                                        <MenuItem disabled={item === t('Segments.select.default')} key={item} value={item}>{item}</MenuItem>
                                                                    ))
                                                                }
                                                            </Select>
                                                        )
                                                    }
                                                    {
                                                        temporalData.length < 4 && (
                                                            <div style={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
                                                                <Tooltip title={t("Plan.tooltip.category.delete")}>
                                                                    <DeleteOutline
                                                                        onClick={() => handleRemove(index)}
                                                                        sx={{ color: "red", cursor: "pointer" }}
                                                                    />
                                                                </Tooltip>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                           )
                                       })
                                   }
                                   
                                    {/* {!(categories?.length === fields.length) && !productInfo?.all_product && ( */}
                                        <TableRow>
                                            <TableCell colSpan={7} onClick={handleNewRow} style={{ cursor: "pointer" }}>
                                                <MainTextTitle>+ {t("Plan.newPlan.modal.segments.addSegment")}</MainTextTitle>
                                            </TableCell>
                                        </TableRow>
                                    {/* )} */}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </GridContainer>

                    <BtnContainer justifyContent="space-between">
                        <BtnSecondary
                            onClick={() => {
                                Swal.fire({
                                    title: t("Alert.exit.gamification.title"),
                                    text: t("Alert.exit.gamification.text"),
                                    confirmButtonText: t("Alert.button.confirm"),
                                    confirmButtonColor: "#4073FF",
                                    cancelButtonText: t("Alert.button.cancel"),
                                    cancelButtonColor: "#EF5350",
                                    icon: "error",
                                    showCancelButton: true,
                                    customClass: {
                                        container: "my-swal-container",
                                    }
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        handleClose();                            
                                    }
                                });
                            }}
                        >
                            {t("Constants.button.cancel")}
                        </BtnSecondary>
                        <BtnPrimary
                            type="button"
                            onClick={onSubmit}
                            disabled={hasDefault || hasZero}
                        >
                            {t("Constants.button.confirm")}
                        </BtnPrimary>
                        {/*<BtnPrimary type="submit" disabled={selectedProduct === 0 || disabledButton()}>
                            {t("Constants.button.confirm")}
                        </BtnPrimary>*/}
                    </BtnContainer>
                </SectionContainer>
            </ModalContainer>
        </Modal>
    );
}