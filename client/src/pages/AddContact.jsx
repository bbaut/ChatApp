import { Box, Stack, Avatar, Typography, Button } from "@mui/material"
import { useSelector } from "react-redux";
import { gql, useMutation} from '@apollo/client';
import { useNavigate } from "react-router-dom";

const ADD_CONTACT = gql `
    mutation AddContact($addInput: [AddInput]) {
        addContact(addInput: $addInput) {
            username
            email
    }
}
`

const AddContact = () => {

    const navigate = useNavigate()

    const contact = useSelector((state) => state.findContactFunc.contact);
    const user = useSelector((state) => state.authFunc.auth);

    let emailUser;
    const emailContact = contact.existanceContact.email;

    if (user.hasOwnProperty('profileUser')){
        emailUser = user.profileUser.email
    }
    else {
        emailUser = user.loginUser.email
    }

    const[addContact] = useMutation(ADD_CONTACT,{
        variables: {addInput: [
            {"email":emailUser},
            {"email":emailContact}
        ]},
        onError(graphQLErrors){
            console.log(graphQLErrors);
        },
        onCompleted(){
            navigate("/contacts")
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log(contact.existanceContact.email)
        console.log(user)
        console.log(user)

        addContact();
    }

    return (
        <Box
        bgcolor="white"
        flex={5}
        p={2}
        >
        <form onSubmit={handleSubmit}>
            <h1>Add contact</h1>
            {Object.keys(contact).length === 0 ? 
            <h2>No contacts shown</h2>
            :
            <Box sx={{width:500}}>
            <Stack spacing={2} direction="row" alignItems="center">
                <Stack>
                    <Avatar>{contact.existanceContact.username[0]}</Avatar>
                </Stack>
                <Stack sx={{ minWidth: 0 }}>
                    <Typography noWrap>{contact.existanceContact.username}</Typography> 
                </Stack>
                <Button type="submit">Add Contact</Button>
                </Stack>
            </Box> 
            }
            </form>
        </Box>
    )
}

export default AddContact