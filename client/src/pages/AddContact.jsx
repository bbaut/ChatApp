import { Box, Stack, Avatar, Typography, Button } from "@mui/material"
import { useSelector } from "react-redux";

const AddContact = () => {

    const contact = useSelector((state) => state.findContactFunc.contact);

    return (
    <Box
      bgcolor="white"
      flex={5}
      p={2}
    >
        <h1>Add contact</h1>
        <Box sx={{width:500}}>
        <Stack spacing={2} direction="row" alignItems="center">
            <Stack>
                <Avatar>{contact.existanceContact.username[0]}</Avatar>
            </Stack>
            <Stack sx={{ minWidth: 0 }}>
                <Typography noWrap>{contact.existanceContact.username}</Typography> 
            </Stack>
            <Button>Add Contact</Button>
            </Stack>
        </Box> 
    </Box>
    )
}

export default AddContact