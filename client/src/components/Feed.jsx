import { Box } from "@mui/material"
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";

const Feed = () => {

  const auth = useSelector((state) => state.authFunc.auth);
  console.log(auth)
  // const {loadingUser} = useAuth();
  // const {auth, loadingUser} = useAuth();

  // return (
  //   <Box
  //     bgcolor="white"
  //     flex={5}
  //     p={2}
  //   >
  //     Welcome aboard 
  //     <h1>
  //     {auth.profileUser.username}
  //     </h1>
  //   </Box>
  // )

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