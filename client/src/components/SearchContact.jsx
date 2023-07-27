import { Stack, TextField, Button } from "@mui/material";
import { useState } from "react";
import { gql, useLazyQuery } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { find_contact } from "../redux/reducers/findContactReducer";
import { useTranslation } from "react-i18next"

const EXISTANCE_CONTACT = gql `
    query ExistanceContact($existanceInput: ExistanceInput) {
        existanceContact(existanceInput: $existanceInput) {
            username,
            email
        }
    }
`

const SearchContact = () => {
    const {t} = useTranslation();

    const navigate = useNavigate();
    const dispatch = useDispatch(); 

    const { email } = useSelector(
        (state) => state.user.value
      );
    
    const [contactEmail, setContactEmail] = useState('');

    const[existanceContact, {loading,error,data}] = useLazyQuery(EXISTANCE_CONTACT,{
        variables: {existanceInput: {
            email: contactEmail
        }},
        onError(graphQLErrors){
            console.log(graphQLErrors.networkError.result.msg);
        },
        onCompleted(data) {
          dispatch(find_contact(data));
          navigate("/dashboard/addcontact");
        },
    })


    const handleSubmit = (e) => {
        e.preventDefault();

        if(contactEmail === ''){
            return;
        }

        if(contactEmail === email){
            return;
        }
        existanceContact();
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