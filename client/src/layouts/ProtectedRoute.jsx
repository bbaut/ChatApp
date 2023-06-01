import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import useAuth from "../hooks/useAuth";
import { Box, Stack } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";


const ProtectedRoute = () => {

  // const auth = useSelector((state) => state.auth.auth);
  // const loadingUser = useSelector((state) => state.loadingFunc.loadingUser)
  const isFetching = useSelector((state) => state.user.isFetching)

  const { auth, isLoading } = useSelector(
    (state) => state.auth
  );
  // const {loadingUser} = useAuth();
  // const {auth, loadingUser} = useAuth();

  console.log(auth)
  console.log(isLoading)

  if(isLoading || isFetching) return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  )
  else if (auth.hasOwnProperty('profileUser')){
    return (<Box>
    <Header/>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        {/* <Sidebar sx={{width:1/2}} /> */}
        <Outlet sx={{width:1/2}}/>
      </Stack>
  </Box>)
  }
  else if (auth.hasOwnProperty('loginUser')){
    return (<Box>
      <Header/>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          {/* <Sidebar sx={{width:1/2}}/> */}
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