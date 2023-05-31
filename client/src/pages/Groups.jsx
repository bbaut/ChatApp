import React from 'react'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useSubscription } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import GroupContacts from '../components/Groups/GroupContacts'
import GroupContainer from '../components/Groups/GroupContainerChat'
import PersonAddIcon from '@mui/icons-material/PersonAdd';

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

    console.log(chatMember)
  
    let groupsArray = [];
    if (groups.length !== 0) {
        for (let i = 0; i<  groups.length; i++){
            groupsArray.push(groups[i].chatName)
        }
    }

    const handleChatChange = (chat) => {
        console.log(chat)
        setCurrentChat(chat);

        //Tratemos de pasar el id junto con el chatname, 
        // con ello obtenemos el id en group contacts
        //de esta manera lo regresamos al dispatch e handle chatchange
        //así hacemos la query con el id 
        //se actualiza el chat state
        //y se usa como params en el url 




        // dispatch({
        //     // buscar por group name y id 

        //     // en lugar de id 
        //     //con ello me regresa la información del chat 
        //     type: "queryRoom",
        //     payload: {
        //         getRoomInput:{
        //             id: id
        //         }
        //     }
        // })


        // dispatch({
        //     type: "createNewRoom",
        //     payload: {
        //         newRoom:{
        //             createdBy: username,
        //             member: chat,
        //         }
        //     }
        // })
    }

    return (
        <BoxContainer>
                <Box sx={{padding:"1rem", height: "85vh", width: "85vw", backgroundColor:"#00000076", display: "grid", gridTemplateColumns: "25% 75%"}}>
                    <GroupContacts groupsArray={groupsArray} currentMember={username} changeChat={handleChatChange}/>
                    {currentChat === undefined ? 
                        <Box sx={{color: "white"}}>Please create a group to start chating <Box sx={{textAlign:"right"}}><PersonAddIcon/></Box></Box> 
                        :
                        <GroupContainer currentChat={currentChat} currentMember={username}/>
                    }
                </Box>
            </BoxContainer>
    )
}

export default Groups