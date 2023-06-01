import { useState } from "react"
import { Link } from "react-router-dom"
import { Container, Stack, TextField, Button, Typography} from "@mui/material"
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";


const Register = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();


    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alert, setAlert] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if([username, email, password, confirmPassword].includes('')){
            setAlert("All fields required");
            return;
        }

        if(password !== confirmPassword) {
            setAlert("Passwords do not coincide");
            return
        }

        dispatch({
            type:"register",
            payload: {
                register:
                {
                    username,
                    email,
                    password,
                    confirmPassword
                }
            }
        })

        setAlert('');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        navigate('/');
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
                    </Stack>
                    <Button variant="contained" type="submit">Sign up</Button>
                </form>
                <p> Have an account?</p> <Link to="/" style={{textDecoration:"none", color:"Black"}}>Log in now</Link>
        </Container>
    </>
  )
}

export default Register