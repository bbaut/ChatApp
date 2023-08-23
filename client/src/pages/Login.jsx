import { useState, useEffect } from "react"
import { Link, Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { Container, Stack, TextField, Button, Typography, Box } from "@mui/material"
import { useTranslation } from "react-i18next"

const Login = () => {

  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();

  const {language} = useSelector(
    (state) => state.user
  );

  const {auth} = useSelector(
    (state) => state.auth
  )

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes('')){
      setAlert("All fields required");
      return;
    }
    dispatch({
      type: "login",
      payload: {
        email,
        password
      }
    })
    setAlert('');
  }

  const onChangeLanguage = (e) => {
    i18n.changeLanguage(e.target.id);
    localStorage.setItem("language",e.target.id)
  }

  useEffect (() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  },[language])


  if(Object.keys(auth).length !== 0){
    return <Navigate to="/dashboard"/>
  }

  return (
    <>
        <Container maxWidth="sm" sx={{marginTop: "8rem", marginBottom: "8rem"}}>
                <h1>
                  {t("welcome")}
                </h1>
                <h1>
                  inTouch
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
          <Box id="en" sx={{margin:"2rem", cursor:"pointer"}}
            onClick={onChangeLanguage}
          >
            English
          </Box>
          <Box id="es" sx={{margin:"2rem", cursor:"pointer"}}
            onClick={onChangeLanguage}
          >
            Español
          </Box>
          <Box id="fr" sx={{margin:"2rem", cursor:"pointer"}}
            onClick={onChangeLanguage}
          >
            Français (France)
          </Box>
          <Box id="br" sx={{margin:"2rem", cursor:"pointer"}}
            onClick={onChangeLanguage}
          >
            Português (Brasil)
          </Box>
          <Box id="it" sx={{margin:"2rem", cursor:"pointer"}}
            onClick={onChangeLanguage}
          >
            Italiano
          </Box>
          <Box id="dt" sx={{margin:"2rem", cursor:"pointer"}}
            onClick={onChangeLanguage}
          >
            Deutsch
          </Box>
        </Container>
    </>
  )
}

export default Login