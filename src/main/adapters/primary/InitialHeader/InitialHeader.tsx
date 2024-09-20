// MUI
import { AppBar } from "@mui/material";

// Assets
import longIcon from "../../../../assets/longIcon.png";

// Styles
import { HeaderBoxContainer, HeaderIconPlacer } from "./InitialHeader.style";

function InitialHeader() {
    return (
        <AppBar
            position="static"
            sx={{ paddingInlineEnd: "0px !important", marginInlineEnd: "12 px" }}
        >
            <HeaderBoxContainer>
                <HeaderIconPlacer>
                    <img
                        style={{
                            height: "36px",
                        }}
                        src={longIcon}
                    />
                </HeaderIconPlacer>
            </HeaderBoxContainer>
        </AppBar>
    );
}

export default InitialHeader;
