// ReactJS
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// MUI
import { Typography } from "@mui/material";

// Shared
import { BtnPrimary } from "../../../shared/components/Buttons";
import TableComponent from "../../../shared/components/Table";

// Components
import ModalConfigEventPonderation from "../modals/ModalConfigEventPonderation";

// Constants
import { EventPonderationHeader } from "../../../constants/headers";

// Services
import { getEventsWithPoints, getPointValueBySite } from "../../../service/gamification";

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
    const [modal, setModal] = useState<IModalEventPonderationState>({
        open: false,
        data: []
    });

    const [pointValueSite, setPointValueSite ] = useState<number>(0);

    // Functions
    const handleAddNewConfig = () => {
        setModal({
            open: true,
            data: modal.data
        });
    };

    useEffect(() => {
        getPointValueBySite(siteJson.idSite)
            .then((res: any) => {                
                setPointValueSite(res?.data.point_value);
            })
            .catch((err: any) => console.log(err));
    }, []);
    
    useEffect(() => {
        getEventsWithPoints(siteJson.idSite)
            .then((res: any) => {     
                console.log(res?.data?.events);
                                          
                setModal({
                    open: false,
                    data: res?.data?.events?.map((event: any) => {
                        return {
                            ...event,
                            value: event.points * pointValueSite
                        };
                    })
                });
            })
            .catch((err: any) => console.log(err));
    }, [pointValueSite]);      
    
    return (
        <Fragment>
            <BtnContainer>
                <BtnPrimary onClick={handleAddNewConfig}>
                    <Add />         
                    {t("Constants.button.add.config")}
                </BtnPrimary>
                {modal?.data?.length === 0 && (
                    <Typography variant="body1" component="p">
                        {t("Gamification.event.ponderation.empty")}
                    </Typography>
                )}
            </BtnContainer>

            {modal?.data?.length > 0 && (
                <TableComponent module="event-ponderation" tableHeader={EventPonderationHeader} tableRows={modal.data} height="285px" />
            )}

            <ModalConfigEventPonderation modal={modal} setModal={setModal} editData={null} />
        </Fragment>
    );
}
