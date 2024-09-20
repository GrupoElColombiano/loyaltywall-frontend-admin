// ReactJS
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// MUI
import { Typography } from "@mui/material";

// Shared
import { BtnPrimary } from "../../../shared/components/Buttons";
import TableComponent from "../../../shared/components/Table";

// Components
import ModalConfigPointsExpiration from "../modals/ModalConfigPointsExpiration";

// Constants
import { EventExpirationHeader } from "../../../constants/headers";

// Icons
import { Add } from "@mui/icons-material";

// Styled
import { BtnContainer } from "../styled";
import { getListActiveExpireTimePointsBySiteId } from "../../../service/gamification";

export default function CardConfigPointsExpiration() {
    // Translation
    const { t } = useTranslation();

    // States
    const [modal, setModal] = useState<IModalPointsExpirationState>({
        open: false,
        data: null
    });

    //Storage
    const siteStorage = localStorage.getItem("siteUser");
    const siteJson = siteStorage ? JSON?.parse(siteStorage) : {};

    // Functions
    const handleAddNewConfig = () => {
        setModal({
            open: true,
            data: modal.data
        });
    };       
    
    //Effects
    useEffect(()=>{
        getListActiveExpireTimePointsBySiteId(siteJson.idSite)
            .then((res: any) => {
                setModal({
                    open: false,
                    data: {
                        days: res.data[0].expire_time
                    }
                });
            })
            .catch((err: any) => console.log(err));
    }, []);  

    return (
        <Fragment>
            <BtnContainer>
                {modal?.data === null && (
                    <BtnPrimary onClick={handleAddNewConfig}>
                        <Add />         
                        {t("Constants.button.add.config")}
                    </BtnPrimary>
                )}

                {modal?.data=== null && (
                    <Typography variant="body1" component="p">
                        {t("Gamification.points.expiration.empty")}
                    </Typography>
                )}
            </BtnContainer>
            {modal?.data !== null && (
                <TableComponent module="event-expiration"  tableHeader={EventExpirationHeader} tableRows={modal.data} height="100%" setTableRows={setModal} />
            )}

            <ModalConfigPointsExpiration modal={modal} setModal={setModal} />
        </Fragment>
    );
}
