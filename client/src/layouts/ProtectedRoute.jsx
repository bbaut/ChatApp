import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useSubscription } from "@apollo/client";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import SEND_MESSAGE from '../gql/sendMessage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next"

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const { auth, isLoading } = useSelector(
    (state) => state.auth
  );

  const { notifications, currentRoom } = useSelector(
    (state) => state.chat
  )

  const {value, isFetching} = useSelector(
    (state) => state.user
  )

  let username;
  if (auth.hasOwnProperty('userAuthenticated')){
     username = auth.userAuthenticated.username
  }
  
  useSubscription(SEND_MESSAGE, {
    onData: (data) => {
        const notification = {
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

  useEffect(() => {
    if(notifications.sender === undefined || notifications.sender === username || currentRoom === notifications.chatId){
      return
    }
    else {
      for(let index in value.groups){
        if(value.groups[index].chatId === notifications.chatId){
          notify(value.groups[index].chatName, "group");
          return
        }
      }
      notify(notifications.sender, "messages")
    }
  }, [notifications])

  const notify = (name, type) => {
    if(type === "messages"){
      toast(t("newMessage")+` ${name} `+t("inMessages"), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
    else {
      toast(t("newMessage")+` ${notifications.sender} `+t("in")+` ${name}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  }

  if( isLoading || isFetching) return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  )
  else if (auth.hasOwnProperty('userAuthenticated')){
     return (
       <Box>
       {/* <Header/> */}
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