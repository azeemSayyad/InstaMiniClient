import {styled} from "@mui/system";
import { Box } from "@mui/material";

const WidgetWrapper = styled(Box)(({theme})=>({
    // border:"2px solid red",
    padding:"1.5rem 1rem 0.75rem 1rem",
    backgroundColor: theme.palette.background.alt,
    borderRadius: "0.75rem"
}))

export default WidgetWrapper;