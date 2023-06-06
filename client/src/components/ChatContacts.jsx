import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import Avatar from "../assets/avatar.png"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next"

const ChatContacts = ({contactsArray, currentMember, changeChat}) => {

  const [currentSelected, setCurrentSelected] = useState(undefined);


  const {t} = useTranslation();

  const navigate = useNavigate();

  const { currentRoom } = useSelector(
    (state) => state.chat
);

useEffect(()=>{
    if (currentRoom){
        navigate(`/dashboard/chat/${currentRoom}`)
    }
},[currentRoom])

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact)
  }


  return (
    <> 

        <Box 
          sx={{
            display: "grid",
            gridTemplateRows: "10% 75% 15%",
            overflow: "hidden",
            backgroundColor: "#080420"
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem"
            }}
          >
            <Typography
              sx={{
                height: "2rem",
                color: "white"
              }}
            >
              
            </Typography>
            <Typography
              sx={{
                color:"white",
                textTransform:"uppercase"
              }}
            >
              {t("chats")}
            </Typography>
          </Box>
          <Box 
            // contacts
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              overflow: "auto",
              gap: "0.8rem",
              "&::-webkit-scrollbar": {
                width: "0.2rem",
                "&-thumb": {
                  backgroundColor: "#ffffff39",
                  width: "0.1rem",
                  borderRadius: "1rem",
                }
              }
            }}
          >
            {contactsArray.map((contact, index) => {
                return (
                  <Box 
                    // contact 
                    sx={{
                      backgroundColor: "#ffffff39",
                      minHeight:"5rem",
                      width:"90%",
                      cursor:"pointer",
                      borderRadius:"0.2rem",
                      padding:"0.4rem",
                      gap:"1rem",
                      alignItems: "center",
                      display: "flex",
                      transition: "0.5s ease-in-out"
                    }}
                    key={index}
                    onClick={()=>changeCurrentChat(index, contact)}
                  >
                    <Box
                      // avatar
                    >
                      <img style={{height:"3rem"}} src={Avatar} alt='avatar'/>
                    </Box>
                    <Box
                      // username
                    >
                      <h3 
                        style={{
                          color: "white"
                        }}
                      >{contact}</h3>
                    </Box>
                  </Box>
                )
              })
            }
          </Box>
          <Box
            // currentuser
            sx={{
              backgroundColor:"#0d0d30",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "2rem"
            }}
          >
            <Box
              // avatar
            >
              <img style={{height:"4rem", maxInlineSize: "100%"}} src={Avatar} alt='avatar'/>
            </Box>
            <Box
              // username
            >
              <h2 
                style={{
                  color: "white"
                }}
              >{currentMember}</h2>
            </Box>
          </Box>
        </Box>
    </>
  )
}

export default ChatContacts