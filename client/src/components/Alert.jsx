import { Box } from "@mui/material"

const Alert = ({alert}) => {

    if (alert.error){
        return (
            <Box sx={{backgroundColor: "red", textAlign:"center", padding: "3px", borderRadius: "50%", color:"white", margin:"10px"}}>
                {alert.msg}
            </Box>
        )
    }
    else {
        return (
            <Box sx={{backgroundColor: "green", textAlign:"center", padding: "3px", borderRadius: "50%", color:"white", margin:"10px" }}>
                {alert.msg}
            </Box>
        )
    }
}

export default Alert