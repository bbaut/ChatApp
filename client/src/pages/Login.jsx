import { useState, useEffect } from "react"
import { Container, Stack, TextField, Button, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { gql, useMutation} from '@apollo/client';
import useAuth from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { get_data } from "../redux/reducers/authReducer";


// const LOGIN_USER = gql `
//     mutation LoginUser ($input: loginUser!) {
//         loginUser (input: $input) @rest(type: "User", method: "POST", path: "api/auth/login" ){
//             user
//             token
//         }
//     }
// `
const LOGIN_USER = gql `
    mutation Mutation($loginInput: LoginInput) {
      loginUser(loginInput: $loginInput) {
        username,
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
  // const {auth, setAuth} = useAuth();

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
      dispatch(get_data(data))
      // setAuth(data)
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
                <h3>Log in</h3>
                <p>and let the fun begin!</p>

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
                  <Button variant="contained" type="submit">Next</Button>
                </form>
                <p> Don't have an account?</p> <Link to="register" style={{textDecoration:"none", color:"Black"}}>Register</Link>
        </Container>
    </>
  )
}

export default Login