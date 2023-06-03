import { Box } from "@mui/material"
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next"

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

  if (auth.hasOwnProperty('profileUser')){
    return (
      <Box
      bgcolor="white"
      flex={5}
      p={2}
    >
      Welcome aboard 
      <h1>
      {auth.profileUser.username}
      </h1>
    </Box>
    )
  }
  else if (auth.hasOwnProperty('loginUser')){
    return (
      <Box
      bgcolor="white"
      flex={5}
      p={2}
    >
      Welcome aboard 
      <h1>
      {auth.loginUser.username}
      </h1>
    </Box>
    )
  }
}


export default Feed