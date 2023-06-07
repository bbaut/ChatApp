import React from 'react'
import { Box } from '@mui/material'
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

    const [ currentChat, setCurrentChat] = useState(undefined); 

    const { chatId } = useParams();

    const dispatch = useDispatch();
    const {t} = useTranslation();

    const { groups, username } = useSelector(
      (state) => state.user.value
    );
    const { chatMember } = useSelector(
      (state) => state.chat
    );
  
    let groupsArray = [];
    if (groups.length !== 0) {
        for (let i = 0; i<  groups.length; i++){
            groupsArray.push(groups[i].chatName)
        }
    }

    useSubscription(CREATED_GROUP, {
        onData: (data) => {
            dispatch({
                type: "setNewGroup",
                payload: {
                    groups: data.data.data.createdGroup.groups
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
        },
        onError: (error) => {
            console.log(error)
        }
      })

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
                <Box sx={{padding:"1rem", height: "85vh", width: "85vw", backgroundColor:"#00000076", display: "grid", gridTemplateColumns: "25% 75%"}}>
                    <GroupContacts groupsArray={groupsArray} currentMember={username} changeChat={handleChatChange}/>
                    {currentChat === undefined ? 
                        <Box sx={{color: "white"}}>{t("selectGroup")}</Box> 
                        :
                        <GroupContainer currentChat={currentChat} currentMember={username}/>
                    }
                </Box>
            </BoxContainer>
    )
}

export default Groups