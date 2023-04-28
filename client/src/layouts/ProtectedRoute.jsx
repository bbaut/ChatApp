import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import useAuth from "../hooks/useAuth";
import { Box, Stack } from "@mui/system";
import { useSelector } from "react-redux";


const ProtectedRoute = () => {

  const auth = useSelector((state) => state.authFunc.auth);
  console.log(auth)
  const loadingUser = useSelector((state) => state.loadingFunc.loadingUser)
  // const {loadingUser} = useAuth();
  // const {auth, loadingUser} = useAuth();

  if(loadingUser) return 'Loading'
  else if (auth.hasOwnProperty('profileUser')){
    console.log("hey")
    return (<Box>
    <Header/>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar sx={{width:1/2}} />
        <Outlet sx={{width:1/2}}/>
      </Stack>
  </Box>)
  }
  else if (auth.hasOwnProperty('loginUser')){
    return (<Box>
      <Header/>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar sx={{width:1/2}}/>
          <Outlet
           sx={{width:1/2}} />
        </Stack>
    </Box>)
  }

  return (
    <Navigate to="/"/>
  )
}

export default ProtectedRoute