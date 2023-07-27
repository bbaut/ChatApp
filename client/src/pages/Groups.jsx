import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useSubscription } from '@apollo/client';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import GroupContacts from '../components/Groups/GroupContacts'
import GroupContainer from '../components/Groups/GroupContainerChat'
import CREATED_GROUP from '../gql/createdGroup';
import { useTranslation } from "react-i18next"
import ADDED_MEMBER from '../gql/addedMember';
import REMOVED_MEMBER from '../gql/removedMember';
import { useNavigate } from 'react-router-dom';
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';

const BoxContainer = styled(Box)(() => ({
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "1rem",
    alignItems: "center",
    backgroundColor: "#131324"
  }));

const Groups = () => {

    const [alert, setAlert] = useState("");

    const [ currentChat, setCurrentChat] = useState(undefined); 

    const { chatId } = useParams();

    const dispatch = useDispatch();
    const {t} = useTranslation();

    const navigate = useNavigate();
    const { groups, username, image } = useSelector(
      (state) => state.user.value
    );
  
    let groupsArray = [];
    if (groups.length !== 0) {
        for (let i = 0; i<  groups.length; i++){
            groupsArray.push(groups[i].chatName)
        }
    }

    useSubscription(CREATED_GROUP, {
        onData: (data) => {
            console.log(data)
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
            dispatch({
                type: "setRemovedMember",
                payload: {
                    member: data.data.data.removedMember
                }
            })

            if(data.data.data.removedMember.username === username){
                setAlert(t("removedOfTheGroup"))
            }
            setCurrentChat(undefined)
            navigate("/dashboard/groups/0")
        },
        onError: (error) => {
            console.log(error)
        }
      })

      const handleCloseAlert = () => {
        setAlert("")
      }

    const handleChatChange = (chat) => {

        var result = groups.find(item => item.chatName === chat);
        setCurrentChat(chat);

        dispatch({
            type: "queryGroup",
            payload: {
                id: result.chatId
            }
        })
    }

    useEffect(() => {
        dispatch({
            type:"queryMessages",
            payload: 
            {
                queryInput: {
                    chatId: chatId,
                    from: username
                }
            }
        })
    }, [chatId])

    return (
        <BoxContainer>
                <Box sx={{padding:"1rem", height: "90vh", width: "85vw", backgroundColor:"#00000076", display: "grid", gridTemplateColumns: "25% 75%"}}>
                    <GroupContacts groupsArray={groupsArray} currentMember={username} changeChat={handleChatChange} avatarProfile={image}/>
                    {currentChat === undefined ? 
                        <Box sx={{color: "white"}}>
                            {alert && 
                        <Stack spacing={2} paddingBottom={2} sx={{color:"#f9c507"}}>
                            <Box>
                            <ErrorIcon/>
                            <CloseIcon 
                                onClick={handleCloseAlert}
                                sx={{
                                cursor: "pointer",
                                marginLeft: "3rem",
                                color: "red"
                                }}
                            />
                            </Box>
                            <Typography variant="h6">
                                {alert}
                            </Typography>
                        </Stack>
                    }
                            {t("selectGroup")}
                        </Box> 
                        :
                        <GroupContainer currentChat={currentChat} currentMember={username}/>
                    }
                </Box>
            </BoxContainer>
    )
}

export default Groups