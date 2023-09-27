import { Stack, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next"


const SearchContact = () => {
    const {t} = useTranslation();

    const dispatch = useDispatch(); 

    const { email } = useSelector(
        (state) => state.user.value
      );
    
    const [contactEmail, setContactEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if(contactEmail === ''){
            return;
        }

        if(contactEmail === email){
            return;
        }
        dispatch({
            type: "existanceContact",
            payload: {
                email: contactEmail
            }
        })
        dispatch({
            type: "setDisplay",
            payload: "addContact",
        })
    }
    return (
        <form
            onSubmit={handleSubmit}
        >
            <Stack spacing={2}  paddingBottom={2}>
                <TextField
                    label={t("email")}
                    name="email"
                    value={contactEmail}
                    onChange={e => setContactEmail(e.target.value)}
                    type="email"
                />
            </Stack>
            <Button variant="contained" type="submit">{t("searchContact")}</Button>
        </form>
    )
}

export default SearchContact