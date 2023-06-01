import { useState } from "react"
import { Container, Stack, TextField, Button, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { gql, useMutation} from '@apollo/client';
import { useDispatch } from "react-redux";

const LOGIN_USER = gql `
    mutation Mutation($loginInput: LoginInput) {
      loginUser(loginInput: $loginInput) {
        username,
        email,
        token
    }
  }
`


const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState('');

  const dispatch = useDispatch()

  const[loginUser, {loading,error,data}] = useMutation(LOGIN_USER,{
    variables: {loginInput: {
        email,
        password
    }},
    onError(graphQLErrors){
        setAlert(graphQLErrors.networkError.result.msg);
    },
    onCompleted(data) {
      localStorage.setItem('token', data.loginUser.token);
      
      dispatch({
        type: "setUserAuth",
        payload: {
          data
        }
      })
      dispatch({
        type: "setUser",
        payload: {
          "email" : data.loginUser.email
        }
      })
      navigate("/dashboard")
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([email, password].includes('')){
      setAlert("All fields required");
      return;
    }
    loginUser();
    setAlert('');
  }

  return (
    <>
        <Container maxWidth="sm">
                <h2>Welcome</h2>

                {alert && 
                <Stack spacing={2} paddingBottom={2} sx={{color:"#990f02"}}>
                    <Typography variant="h6">
                        {alert}
                    </Typography>
                </Stack>
                }

                <form
                    onSubmit={handleSubmit}
                >
                  <Stack spacing={2} paddingBottom={2}>
                      <TextField
                          label="Email"
                          name="email"
                          value= {email}
                          onChange={e => setEmail(e.target.value)}
                          type = "email"
                      />
                      <TextField
                          label="Password"
                          name="password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          type="password"
                      />
                  </Stack>
                  <Button variant="contained" type="submit">Log in</Button>
                </form>
                <p> Don't have an account?</p> <Link to="register" style={{color:"Black"}}>Register</Link>
        </Container>
    </>
  )
}

export default Login