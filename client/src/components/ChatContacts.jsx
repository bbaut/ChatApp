import React, { useEffect, useState } from 'react'
import { Box, Typography, Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next"
import avatar from "../assets/profile-image.jpeg"

const ChatContacts = ({contactsArray, currentMember, changeChat, avatarProfile, notifications}) => {

  const [currentSelected, setCurrentSelected] = useState(undefined);
  // const [openChat, setOpenChat] = useState(false)
  const [invisible, setInvisible] = useState(true);

  const {t} = useTranslation();

  const navigate = useNavigate();

  const { currentRoom } = useSelector(
    (state) => state.chat
  );

    const { value, isFetching } = useSelector(
      (state) => state.contact
    )

    // const number = () => {
    //   if(openChat){
    //     return 0
    //   }
    //     return 4
    // }

    useEffect(() => {
      if(notifications.length !== 0){
        
        setInvisible(!invisible);
      }
    },[])
    

useEffect(()=>{
    if (currentRoom){
        navigate(`/dashboard/chats/chat/${currentRoom}`)
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
          {value.length === 0 || isFetching ? 
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
                        <Avatar style={{height:"3rem", width:"3rem"}} src={avatar} alt='avatar'/>
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
                )}
              )}
          </Box>
            : 
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
                    key={contact}
                    onClick={()=>changeCurrentChat(index, contact)}
                  >
                    <Box
                      // avatar
                    >
                        <Avatar style={{height:"3rem", width:"3rem"}} src={value[index].image ? value[index].image : avatar} alt='avatar'/>
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
                )}
              )}
          </Box>
            }
            {/* {contactsArray.map((contact, index) => {
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
                      {value.length !== 0 || value[index].image ?
                        <Avatar style={{height:"3rem"}} src={value[index].image} alt='avatar'/>
                      :
                          <img style={{height:"3rem"}} src={avatar} alt='avatar'/>
                      } 
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
            } */}
          {/* </Box> */}
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
              {avatarProfile ? 
                <img 
                  style={{
                    height:"4rem",
                    width: "4rem",
                    borderRadius: "50%",
                    objectFit: "cover", 
                    maxInlineSize: "100%"
                  }} 
                  src={avatarProfile} 
                  alt='avatar'/>
              :
                <img 
                  style={{
                    height:"4rem", 
                    borderRadius: "50%",
                    objectFit: "cover", 
                    maxInlineSize: "100%"
                  }} 
                  src={avatar} 
                  alt='avatar'
                />
              }
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