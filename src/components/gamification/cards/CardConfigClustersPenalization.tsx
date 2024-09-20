// ReactJS
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// MUI
import { Typography } from "@mui/material";

// Shared
import { BtnPrimary } from "../../../shared/components/Buttons";
import TableComponent from "../../../shared/components/Table";

// Components
import ModalConfigClustersPenalization from "../modals/ModalConfigClustersPenalization";

// Constants
import { EventPenalizationHeader } from "../../../constants/headers";

// Services
import { getClusterPenalization } from "../../../service/gamification";

// Icons
import { Add } from "@mui/icons-material";

// Styled
import { BtnContainer } from "../styled";

export default function CardConfigEventPonderation() {
    // Translation
    const { t } = useTranslation();

    //Storage
    const siteStorage = localStorage.getItem("siteUser");
    const siteJson = siteStorage ? JSON?.parse(siteStorage) : {};

    // States
    const [modal, setModal] = useState<IModalClusterPenalizationState>({
        open: false,
        data: {
            limitTime: null
        }
    });

    // Functions
    const handleAddNewConfig = () => {
        setModal({
            open: true,
            data: modal.data
        });
    };      

    // Effects
    useEffect(() => {
        getClusterPenalization(siteJson.idSite)
            .then((res) => {
                setModal({
                    open: false,
                    data: {
                        limitTime: res?.data?.clusterPenalization?.penaltyClusters ?? null,
                    }
                });
            })
            .catch((err) => {
                console.log(err);
            }); 
    }, []);        

    return (
        <Fragment>
            <BtnContainer>
                {modal?.data?.limitTime === null && (
                    <BtnPrimary onClick={handleAddNewConfig}>
                        <Add />         
                        {t("Constants.button.add.config")}
                    </BtnPrimary>
                )}
                    
                {modal?.data?.limitTime === null && (
                    <Typography variant="body1" component="p">
                        {t("Gamification.clusters.penalization.empty")}
                    </Typography>
                )}
            </BtnContainer>

            {modal?.data?.limitTime !== null && (
                <TableComponent module="event-penalization" tableHeader={EventPenalizationHeader} tableRows={modal.data} height="130px" setTableRows={setModal} />
            )}

            <ModalConfigClustersPenalization modal={modal} setModal={setModal} />
        </Fragment>
    );
}
