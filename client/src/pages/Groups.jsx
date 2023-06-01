import React from 'react'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import GroupContacts from '../components/Groups/GroupContacts'
import GroupContainer from '../components/Groups/GroupContainerChat'

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

    useEffect(() => {
        console.log("hey")
    }, [groups])

    return (
        <BoxContainer>
                <Box sx={{padding:"1rem", height: "85vh", width: "85vw", backgroundColor:"#00000076", display: "grid", gridTemplateColumns: "25% 75%"}}>
                    <GroupContacts groupsArray={groupsArray} currentMember={username} changeChat={handleChatChange}/>
                    {currentChat === undefined ? 
                        <Box sx={{color: "white"}}>Please create a group to start chating</Box> 
                        :
                        <GroupContainer currentChat={currentChat} currentMember={username}/>
                    }
                </Box>
            </BoxContainer>
    )
}

export default Groups