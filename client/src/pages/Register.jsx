import { useState } from "react"
import { Link } from "react-router-dom"
import { Container, Stack, TextField, Button, Typography, Input} from "@mui/material"
import { gql, useMutation} from '@apollo/client';
import { useNavigate } from "react-router-dom";

const REGISTER_USER = gql `
    mutation Mutation($registerInput: RegisterInput) {
        registerUser(registerInput: $registerInput) {
            username
        }
    }
`

const Register = () => {
    let navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState('');
    const [alert, setAlert] = useState('');

    const[registerUser] = useMutation(REGISTER_USER,{
        variables: {registerInput: {
            username,
            email,
            password,
            confirmPassword
            
        }},
        onError(graphQLErrors){
            console.log(graphQLErrors);
        },
        onCompleted(){
            console.log("yey")
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        if([username, email, password, confirmPassword].includes('')){
            setAlert("All fields required");
            return;
        }

        // if(password !== confirmPassword) {
        //     setAlert("Passwords are not the same");
        //     return;
        // }

        // if(password.length < 6) {
        //     setAlert("Password must have 6 characters length min");
        //     return;
        // }
        registerUser();

        setAlert('');
        setUsername('');
        setEmail('');
        setImage('');
        setPassword('');
        setConfirmPassword('');
    }

  return (
    <>
        <Container maxWidth="sm">
                <h3>Create your account</h3>
                <p>and become part of the community</p>

                {alert && 
                <Stack spacing={2} paddingBottom={2} color="red">
                    <Typography variant="h5">
                        {alert}
                    </Typography>
                </Stack>
                }

                <form
                    onSubmit={handleSubmit}
                >
                    <Stack spacing={2} paddingBottom={2}>
                        <TextField
                            label="Username"
                            name="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            type="text"
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                        />
                        <TextField
                            label="Password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                        />
                        <TextField
                            label="Confirm password"
                            name="confirmpassword"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            type="password"
                        />
                        {/* <Input
                            laber="Avatar"
                            name="avatar"
                            onChange={e => setImage(e.target.files[0])}
                            type="File"
                        ></Input> */}
                    </Stack>
                    <Button variant="contained" type="submit">Sign up</Button>
                </form>
                <p> Have an account?</p> <Link to="/" style={{textDecoration:"none", color:"Black"}}>Log in now</Link>
        </Container>
    </>
  )
}

export default Register