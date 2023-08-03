import { useState, useEffect } from "react"
import { Link, useFetcher } from "react-router-dom"
import { Container, Stack, TextField, Button, Typography, Box} from "@mui/material"
import {useDispatch, useSelector} from "react-redux";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ErrorIcon from '@mui/icons-material/Error';
import { useTranslation } from "react-i18next"
import avatar from "../assets/profile-image.jpeg"



const Register = () => {
    let dispatch = useDispatch();

    const {t, i18n} = useTranslation();

    const {language} = useSelector(
        (state) => state.user
    );

    const {isFetching, error} = useSelector(
      (state) => state.register
    )

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alert, setAlert] = useState("");
    const [avatarImg, setAvatarImg] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if([username, email, password, confirmPassword].includes('')){
            setAlert(t("fieldsRequired"));
            setTimeout(() => {
              setAlert('');
            }, 2000)
            return;
        }

        if(password.length < 6) {
            setAlert(t("passwordMin"));
            setTimeout(() => {
              setAlert('');
            }, 2000)
            return
        }

        if(password !== confirmPassword) {
            setAlert(t("passwordsDontMatch"));
            setTimeout(() => {
              setAlert('');
            }, 2000)
            return
        }

        if(avatarImg.length !== 0 && avatarImg.length > 32000){
          setAlert(t("tooLargeImageSize"));
          return
        }

        setAlert('');

        dispatch({
            type:"register",
            payload: {
                register:
                {
                    username,
                    email,
                    password,
                    confirmPassword,
                    image: avatarImg
                }
            }
        })
        
        setSuccess(t("succesfulCreation"))
        setTimeout(() => {
          setSuccess('');
        }, 2000)

        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setAvatarImg('');
    }

      const inputImage = (e) => {
        e.preventDefault()
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
          setAvatarImg(reader.result)
        }
        reader.onerror = error => {
          console.log("Error: ", error)
        }
      }

    useEffect (() => {
        i18n.changeLanguage(localStorage.getItem("language"));
    },[language])

    const onChangeLanguage = (e) => {
        i18n.changeLanguage(e.target.id);
        localStorage.setItem("language",e.target.id)
    }

    useEffect(()=>{
      if(error === "DuplicateEmail"){
        setSuccess("")
        setAlert(t("duplicateEmail"))
        setTimeout(() => {
          setAlert('');
        }, 2000)
      }
      else if (error === "DuplicateUsername"){
        setSuccess("")
        setAlert(t("duplicateUsername"))
        setTimeout(() => {
          setAlert('');
        }, 2000)
      }
      else if(error === "null"){
        setSuccess(t("succesfulCreation"))
        setAlert("")
        setTimeout(() => {
          setSuccess('');
        }, 2000)
      }
    }, [error])

  return (
    <>
        <Container maxWidth="sm" sx={{marginTop: "8rem", marginBottom: "8rem"}}>
                <h3>{t("createAccount")}</h3>
                <p>{t("welcomeText")}</p>

                {alert && 
                <Stack spacing={2} paddingBottom={2} sx={{color:"#990f02"}}>
                    <ErrorIcon/>
                    <Typography variant="h6">
                        {alert}
                    </Typography>
                </Stack>
                }

                {success && 
                <Stack spacing={2} paddingBottom={2} sx={{color: "#000080"}}>
                    <ThumbUpOffAltIcon/>
                    <Typography variant="h6">
                        {success}
                    </Typography>
                </Stack>
                }

                {loading && 
                <Stack spacing={2} paddingBottom={2} sx={{color: "#000000"}}>
                    <Typography variant="h6">
                        loading
                    </Typography>
                </Stack>
                }

                <form
                    onSubmit={handleSubmit}
                >
                    <Stack spacing={2} paddingBottom={2}>
                    { avatarImg ? (
                      <Box 
                      component="img"
                      style={{
                          width: "200px",
                          height: "200px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "2px solid #4f04ff21"
                      }}
                      src={avatarImg} alt="profile image"
                    />
                    )
                    :
                    (
                        <Box 
                        component="img"
                        style={{
                            width: "200px",
                            height: "200px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "2px solid #4f04ff21"
                        }}
                        src={avatar} alt="profile image"
                    />
                    )
                    }
                        <TextField
                          name="avatarImg"
                          onChange={inputImage}
                          type="file"
                        />
                        <TextField
                            label={t("username")}
                            name="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            type="text"
                        />
                        <TextField
                            label={t("email")}
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                        />
                        <TextField
                            label={t("password")}
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                        />
                        <TextField
                            label={t("confirmPassword")}
                            name="confirmpassword"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            type="password"
                        />
                    </Stack>
                    <Button variant="contained" type="submit">{t("register")}</Button>
                </form>
                <p> {t("alreadyAccount")}</p> <Link to="/" style={{color:"Black"}}>{t("login")}</Link>
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

export default Register