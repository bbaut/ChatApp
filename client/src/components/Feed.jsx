import { Box, Container } from "@mui/material"
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next"
import {useEffect} from "react"
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

  const onChangeLanguage = (e) => {
    i18n.changeLanguage(e.target.id);
    localStorage.setItem("language",e.target.id)
  }

  console.log(auth)

  if (auth.hasOwnProperty('profileUser')){
    return (
      <>
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
  else if (auth.hasOwnProperty('loginUser')){
    return (
      <>
      <Container maxWidth="sm" sx={{marginTop: "8rem", marginBottom: "8rem"}}>
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

  // if (auth.hasOwnProperty('profileUser')){
  //   return (
  //     <>
  //      <Container maxWidth="sm" sx={{marginTop: "8rem", marginBottom: "8rem"}}>
  //        <Box
  //         bgcolor="white"
  //         flex={5}
  //         p={2}
  //       > 
  //         Welcome aboard 
  //         <h1>
  //           {auth.profileUser.username}
  //         </h1>
  //       </Box>
  //      </Container>
  //      <Container sx={{display:"flex", margin:"10rem", flexDirection:"row", justifyContent:"space-evenly", marginBottom:"8rem"}}>
  //       <Box id="en" sx={{margin:"2rem"}}
  //         onClick={onChangeLanguage}
  //       >
  //         English
  //       </Box>
  //       <Box id="es" sx={{margin:"2rem"}}
  //         onClick={onChangeLanguage}
  //       >
  //         Español
  //       </Box>
  //       <Box id="fr" sx={{margin:"2rem"}}
  //         onClick={onChangeLanguage}
  //       >
  //         Français (France)
  //       </Box>
  //       <Box id="br" sx={{margin:"2rem"}}
  //         onClick={onChangeLanguage}
  //       >
  //         Português (Brasil)
  //       </Box>
  //       <Box id="it" sx={{margin:"2rem"}}
  //         onClick={onChangeLanguage}
  //       >
  //         Italiano
  //       </Box>
  //       <Box id="dt" sx={{margin:"2rem"}}
  //         onClick={onChangeLanguage}
  //       >
  //         Deutsch
  //       </Box>
  //     </Container>
  //   </>
  //   )
  // }
  // else if (auth.hasOwnProperty('loginUser')){
  //   return (
  //     <Box
  //     bgcolor="white"
  //     flex={5}
  //     p={2}
  //   >
  //     Welcome aboard 
  //     <h1>
  //     {auth.loginUser.username}
  //     </h1>
  //   </Box>
  //   )
  // }
}


export default Feed