import { useEffect } from "react";
import { Outlet, Navigate, useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useSubscription } from "@apollo/client";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import SEND_MESSAGE from '../gql/sendMessage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const { chatId } = useParams();

  const { auth, isLoading } = useSelector(
    (state) => state.auth
  );

  const { notifications } = useSelector(
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
    if(notifications.sender === undefined || notifications.sender === username){
      return
    }
    else if(chatId === notifications.chatId) {
      return
    }
    else if(value.chatContacts.includes(notifications.chatId) || value.groups.chatId) {
      notify(notifications.sender, "messages")
    }
    else {
      for(let index in value.groups){
        if(value.groups[index].chatId === notifications.chatId){
          notify(value.groups[index].chatName, "group");
          return
        }
      }
    }
  }, [notifications])

  const notify = (name, type) => {
    if(type === "messages"){
      toast(`New message received from ${name}  in messages`, {
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
      toast(`New message received from ${notifications.sender} in ${name} group`, {
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