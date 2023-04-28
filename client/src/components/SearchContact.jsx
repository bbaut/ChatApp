import { Stack, TextField, Button } from "@mui/material";
import { useState } from "react";
import { gql, useLazyQuery } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { find_contact } from "../redux/reducers/findContactReducer";

const EXISTANCE_CONTACT = gql `
    query ExistanceContact($existanceInput: ExistanceInput) {
        existanceContact(existanceInput: $existanceInput) {
            username,
            email
        }
    }
`

const SearchContact = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    
    const [email, setEmail] = useState('');

    const[existanceContact, {loading,error,data}] = useLazyQuery(EXISTANCE_CONTACT,{
        variables: {existanceInput: {
            email
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

        if(email === ''){
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
                    label="Email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                />
            </Stack>
            <Button variant="contained" type="submit">Search contact</Button>
        </form>
    )
}

export default SearchContact