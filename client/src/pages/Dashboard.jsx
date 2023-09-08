// import Feed from "../components/Feed"

// const Dashboard = () => {
//     return (
//         <Feed/>
//     )
//   }
  
//   export default Dashboard

import React from 'react'
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSubscription } from '@apollo/client';
import Feed from "../components/Feed"
import Sidebar from '../components/Sidebar';
import CONTACT_REQUEST from '../gql/contactRequest';
import ACCEPT_CONTACT_REQUEST from '../gql/acceptContact';
import DELETE_CONTACT from "../gql/deleteContact";
import CREATED_GROUP from '../gql/createdGroup';
import ADDED_MEMBER from '../gql/addedMember';
import REMOVED_MEMBER from '../gql/removedMember';
import ChatContainer from '../components/ChatContainer';
import GroupContainerChat from '../components/Groups/GroupContainerChat';
import { useTranslation } from "react-i18next"

const BoxContainer = styled(Box)(() => ({
    // height: "100vh",
    // width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "1rem",
    alignItems: "center",
    backgroundColor: "#131324"
  }));

const Dashboard = () => {
  const [alert, setAlert] = useState("");
  const {t} = useTranslation();

  // const [ currentChat, setCurrentChat] = useState(undefined); 
    const { value } = useSelector(
        (state) => state.display
    );
    const { currentChat, currentRoom, currentGroup} = useSelector(
        (state) => state.chat
    );
    const {username} = useSelector(
      (state) => state.user.value
    )

    const { groupMembers } = useSelector(
      (state) => state.chat
    );

    const dispatch = useDispatch();

    useSubscription(CONTACT_REQUEST, {
        onData: (data) => {
            dispatch({
                type: "addNewRequest",
                payload: data.data.data.addContactRequest,
            })
        },
        onError: (error) => {
            console.log(error)
        }
    })

    useSubscription(ACCEPT_CONTACT_REQUEST, {
        onData: (data) => {
          dispatch({
            type: "isFetchingContact"
          })
  
          dispatch({
            type: "acceptRequest",
            payload: data.data.data.acceptContactRequest,
          })
        },
        onError: (error) => {
            console.log(error)
        }
      })

      useSubscription(DELETE_CONTACT, {
        onData: (data) => {
          dispatch({
            type: "deletedContact",
            payload: data.data.data.deleteContact,
        })
        },
        onError:(error) => {
          console.log(error)
        }
      })

      useSubscription(CREATED_GROUP, {
        onData: (data) => {
            dispatch({
                type: "setNewGroup",
                payload: {
                    groups: data.data.data.createdGroup
                }
            })
        },
        onError: (error) => {
            console.log(error)
        }
      })


    useSubscription(ADDED_MEMBER, {
        onData: (data) => {
            dispatch({
                type: "setAddedMember",
                payload: {
                    member: data.data.data.addedMember
                }
            })
        },
        onError: (error) => {
            console.log(error)
        }
      })

    useSubscription(REMOVED_MEMBER, {
        onData: (data) => {
          console.log(data)
            dispatch({
                type: "setRemovedMember",
                payload: {
                    member: data.data.data.removedMember
                }
            })

            if(data.data.data.removedMember.username === username){
                setAlert(t("removedOfTheGroup"))
            }
            // setCurrentChat(undefined)
            // navigate("/dashboard/groups")
        },
        onError: (error) => {
            console.log(error)
        }
      })

      if(currentChat !== "undefined"){
        return (
            <BoxContainer>
                <Box sx={{padding:"1rem", height: "100vh", width: "100%", backgroundColor:"#080420", display: "grid", gridTemplateColumns: "25% 75%"}}>
                  <Sidebar/>
                  <ChatContainer currentChat={currentChat} currentMember={username} currentRoom={currentRoom}/>
                </Box>
            </BoxContainer>
        )
      }
      else if (currentGroup !== "undefined"){
        return (
          <BoxContainer sx={{height: "100vh"}}>
              <Box sx={{padding:"1rem", height: "100vh", width: "100vw", backgroundColor:"#080420", display: "grid", gridTemplateColumns: "25% 75%"}}>
                <Sidebar/>
                <GroupContainerChat groupMembers={groupMembers} currentGroup={currentGroup} currentRoom={currentRoom}/>
              </Box>
          </BoxContainer>
        )
      }
      else {
        return (
          <BoxContainer sx={{height: "100vh"}}>
            <Box sx={{padding:"1rem", height: "100vh", width: "100vw", backgroundColor:"#080420", display: "grid", gridTemplateColumns: "25% 75%"}}>
              <Sidebar/>
              <Feed/>
            </Box>
        </BoxContainer>
        )
      }
}

export default Dashboard;