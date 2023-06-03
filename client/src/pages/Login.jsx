import { useState, useEffect } from "react"
import { Container, Stack, TextField, Button, Typography, Box } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { gql, useMutation} from '@apollo/client';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next"

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

  const {t, i18n} = useTranslation();

  const navigate = useNavigate();

  const {language} = useSelector(
    (state) => state.user
  );

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

  const onChangeLanguage = (e) => {
    i18n.changeLanguage(e.target.id);
    localStorage.setItem("language",e.target.id)
  }

  useEffect (() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  },[language])

  return (
    <>
        <Container maxWidth="sm" sx={{marginTop: "8rem", marginBottom: "8rem"}}>
                <h1>
                  {t("welcome")}
                </h1>
                <h1>
                  my chat app
                </h1>
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
                          label={t("email")}
                          name="email"
                          value= {email}
                          onChange={e => setEmail(e.target.value)}
                          type = "email"
                      />
                      <TextField
                          label={t("password")}
                          name="password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          type="password"
                      />
                  </Stack>
                  <Button variant="contained" type="submit">{t("login")}</Button>
                </form>
                <p>{t("account")}</p> <Link to="register" style={{color:"Black"}}>{t("register")}</Link>
        </Container>
        <Container sx={{display:"flex", margin:"10rem", flexDirection:"row", justifyContent:"space-evenly", marginBottom:"8rem"}}>
          <Box id="en" sx={{margin:"2rem"}}
            onClick={onChangeLanguage}
          >
            English
          </Box>
          <Box id="es" sx={{margin:"2rem"}}
            onClick={onChangeLanguage}
          >
            Español
          </Box>
          <Box id="fr" sx={{margin:"2rem"}}
            onClick={onChangeLanguage}
          >
            Français (France)
          </Box>
          <Box id="br" sx={{margin:"2rem"}}
            onClick={onChangeLanguage}
          >
            Português (Brasil)
          </Box>
          <Box id="it" sx={{margin:"2rem"}}
            onClick={onChangeLanguage}
          >
            Italiano
          </Box>
          <Box id="dt" sx={{margin:"2rem"}}
            onClick={onChangeLanguage}
          >
            Deutsch
          </Box>
        </Container>
    </>
  )
}

export default Login