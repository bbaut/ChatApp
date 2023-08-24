import { useSelector, useDispatch } from "react-redux";
import { Box, Stack, Avatar, Typography, Button } from "@mui/material"
import { useTranslation } from "react-i18next"

const AddContact = () => {
    const dispatch = useDispatch()
    const {t} = useTranslation();

    const contact = useSelector(
        (state) => state.findContactFunc.contact
    );
    const {auth} = useSelector(
        (state) => state.auth
    );

    let emailUser = auth.userAuthenticated.email;

    let emailContact;
    if (Object.keys(contact).length === 0){
        emailContact = "";
    }else {
        emailContact = contact.existanceContact.email;
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
        dispatch({
            type: "setDisplay",
            payload: "welcome",
        })
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
            <Box>
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