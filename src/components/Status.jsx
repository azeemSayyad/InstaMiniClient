import { Box } from "@mui/material";

const Status = (active)=>{
    return(
        <Box 
        backgroundColor={active.color===true?'green':'#db1d1d'}
        sx={{
            width:'0.75rem',
            height:'0.75rem',
            borderRadius:'50%'
        }}></Box>
    )
}

export default Status;