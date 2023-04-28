import { Stack, TextField, Button } from "@mui/material";
import { useState } from "react";

const AddContact = () => {

    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if(email === ''){
            return;
        }
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

export default AddContact