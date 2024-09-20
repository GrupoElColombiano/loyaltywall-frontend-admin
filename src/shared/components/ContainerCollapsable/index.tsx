import React from "react";


// MUI
import { Box, Button, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface CollapsableBoxProps {
    title: string;
    anchorEl: boolean;
    children: any;
    style: any;
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
const CollapsibleBox: React.FC<CollapsableBoxProps> = ({ title, anchorEl, children, style, onClick }) => {

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                backgroundColor: "#FFFFFF",
                ...style
            }}
        >
            <Button
                sx={{
                    paddingY: "18px",
                    paddingX: "32px",
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 2,
                    border: "1px solid #8A8A8A"
                }}
                color="inherit"
                onClick={onClick} 
                aria-controls="user-menu"
                aria-haspopup="true"
                endIcon={anchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            >
                <Typography
                    variant="h3"
                    sx={{ textTransform: "none" }}
                    style={{
                        fontSize: "24px",
                        fontFamily: "Roboto",
                        fontWeight: "400",
                        lineHeight: "28px",
                        letterSpacing: "0em",
                        textAlign: "left",
                        color: "#000000"
                    }}
                >
                    {title}
                </Typography>
            </Button>
            {anchorEl ?
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        padding: "32px",
                        gap: "62px",
                        border: "1px solid #8A8A8A"
                    }}>
                    {children}
                </div>
                :
                <></>
            }
        </Box>
    );
};


export default CollapsibleBox;