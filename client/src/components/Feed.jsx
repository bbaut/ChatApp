import {useEffect} from "react"
import { useSelector } from "react-redux";
import { Box, Container } from "@mui/material"
import { useTranslation } from "react-i18next"
import robot from "../assets/rebel-robot.gif"

const Feed = () => {

  const {t, i18n} = useTranslation();

  const { auth } = useSelector(
    (state) => state.auth
  );

  const {language} = useSelector(
    (state) => state.user
  );

  useEffect (() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  },[language])

    return (
      <Container maxWidth="sm" sx={{marginTop: "8rem", marginBottom: "8rem", textAlign: "center", color:"white"}}>
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
        alt="Robot saying hello"
        src={robot}
      />
        <h1>
          {auth.userAuthenticated.username}
        </h1>
      </Container>
    )
}

export default Feed