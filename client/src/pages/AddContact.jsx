import { Box, Stack, Avatar, Typography, Button } from "@mui/material"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next"

const AddContact = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {t} = useTranslation();

    const contact = useSelector((state) => state.findContactFunc.contact);
    const dataAuth = useSelector(
        (state) => state.auth
    );
    const user = dataAuth.auth

    let emailUser;
    let emailContact

    if (Object.keys(contact).length === 0){
        emailContact = "";
    }else {
        emailContact = contact.existanceContact.email;
    }
    
    

    if (user.hasOwnProperty('profileUser')){
        emailUser = user.profileUser.email
    }
    else {
        emailUser = user.loginUser.email
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch({
            type: "addFriend",
            payload: {
                add: [
                    {"email":emailUser},
                    {"email":emailContact}
                ]
            }
        })

        navigate("/dashboard/contacts")
    }

    return (
        <Box
        bgcolor="white"
        flex={5}
        p={2}
        >
        <form onSubmit={handleSubmit}>
            <h1>{t("addFriend")}</h1>
            {Object.keys(contact).length === 0 ? 
            <h2>{t("userNotFound")}</h2>
            :
            <Box sx={{width:500}}>
            <Stack spacing={2} direction="row" alignItems="center">
                <Stack>
                    <Avatar>{contact.existanceContact.username[0]}</Avatar>
                </Stack>
                <Stack sx={{ minWidth: 0 }}>
                    <Typography noWrap>{contact.existanceContact.username}</Typography> 
                </Stack>
                <Button type="submit">{t("addFriend")}</Button>
                </Stack>
            </Box> 
            }
            </form>
        </Box>
    )
}

export default AddContact