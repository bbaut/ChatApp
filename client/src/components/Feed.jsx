import { Box, Container } from "@mui/material"
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next"
import {useEffect} from "react"
import robot from "../assets/rebel-robot.gif"

const Feed = () => {

  const {t, i18n} = useTranslation();

  const { auth } = useSelector(
    (state) => state.auth
  );

  const { image } = useSelector(
    (state) => state.user.value
  );

  const {language} = useSelector(
    (state) => state.user
  );

  useEffect (() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  },[language])

  const onChangeLanguage = (e) => {
    i18n.changeLanguage(e.target.id);
    localStorage.setItem("language",e.target.id)
  }

  if (auth.hasOwnProperty('profileUser')){
    return (
      <Container maxWidth="sm" sx={{marginTop: "8rem", marginBottom: "8rem", textAlign: "center"}}>
        <h1>
          {t("welcome")}
        </h1>
        <Box
        component="img"
        sx={{
          height: 233,
          width: 350,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        alt="The house from the offer."
        src={robot}
      />
        <h1>
          {auth.profileUser.username}
        </h1>
      </Container>
    )
  }
  else if (auth.hasOwnProperty('loginUser')){
    return (
      <Container maxWidth="sm" sx={{marginTop: "8rem", marginBottom: "8rem", textAlign: "center"}}>
        <h1>
          {t("welcome")}
        </h1>
        <Box
        component="img"
        sx={{
          height: 233,
          width: 350,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        alt="The house from the offer."
        src={robot}
      />
        <h1>
          {auth.loginUser.username}
        </h1>
      </Container>
    )
  }
}

export default Feed