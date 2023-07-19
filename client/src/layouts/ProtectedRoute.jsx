import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";
import { Box, Stack } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { useSelector,useDispatch } from "react-redux";
import SEND_MESSAGE from '../gql/sendMessage';
import { useSubscription } from "@apollo/client";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { useParams } from 'react-router-dom';


const ProtectedRoute = () => {

  const dispatch = useDispatch();

    // const { username } = useSelector(
    //   (state) => state.user.value
    // );
  const isFetching = useSelector(
    (state) => state.user.isFetching
  )

  const { auth, isLoading } = useSelector(
    (state) => state.auth
  );

  const { notifications } = useSelector(
    (state) => state.chat
  )

  let username;

  if (auth.hasOwnProperty('profileUser')){
     username = auth.profileUser.username
  }
  else if (auth.hasOwnProperty('loginUser')){
    username = auth.loginUser.username
  }

  
  useSubscription(SEND_MESSAGE, {
    onData: (data) => {
      console.log(data.data.data.sendMessage)
      const notification = {
        received: username,
        sender: data.data.data.sendMessage.sender,
        chatId: data.data.data.sendMessage.chatId,
        text: data.data.data.sendMessage.message.text
      }
      dispatch({
        type: "chatNotification",
        payload: notification
      })
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const { chatId } = useParams();
  console.log(chatId)
  useEffect(() => {
    if(notifications.sender === undefined){
      return
    }
    else if(chatId !== undefined) {
      return
    }
    else {
      notify()
    }
  }, [notifications])

  const notify = () => 
  toast(`New message received from ${notifications.sender}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });

  
  if(isLoading || isFetching) return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  )
  else if (auth.hasOwnProperty('profileUser')){
     return (
       <Box>
       <Header/>
       <Outlet/>
       <ToastContainer />
       </Box>
    )
  }
  else if (auth.hasOwnProperty('loginUser')){
     return (
       <Box>
       <Header/>
       <Outlet/>
       <ToastContainer />
       </Box>
    )
  }

  return (
    <Navigate to="/"/>
  )
}

export default ProtectedRoute