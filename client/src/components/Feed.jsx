import { Box } from "@mui/material"
import { useSelector } from "react-redux";

const Feed = () => {

  const auth = useSelector((state) => state.authFunc.auth);

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