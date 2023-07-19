import React, { useEffect, useState } from 'react'
import { Box, Typography,Badge, Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next"
import avatar from "../assets/profile-image.jpeg"
import { styled } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors';

const ChatContacts = ({contactsArray, currentMember, changeChat, avatarProfile, notifications}) => {

  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [openChat, setOpenChat] = useState(false)
  const [invisible, setInvisible] = useState(true);

  const color = blue[500]
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      // border: `2px solid ${theme.palette.background.paper}`,
      border: `2px solid ${color}`,
      width: "15px",
      height: "15px",
      borderRadius: "50%",
      padding: '0 4px',
    },
  }));

  const {t} = useTranslation();

  const navigate = useNavigate();

  const { currentRoom } = useSelector(
    (state) => state.chat
  );

    const { value } = useSelector(
      (state) => state.contact
    )

    const number = () => {
      if(openChat){
        return 0
      }
        return 4
    }

    useEffect(() => {
      if(notifications.length !== 0){
        
        setInvisible(!invisible);
      }
    },[])

    

useEffect(()=>{
    if (currentRoom){
        navigate(`/dashboard/chat/${currentRoom}`)
    }
},[currentRoom])

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact)
  }

  // console.log(receivedMessages)
  // console.log(currentRoom)


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
                      {value.length !== 0 ?
                      <StyledBadge variant='dot' invisible={invisible}>
                        <Avatar style={{height:"3rem"}} src={value[index].image} alt='avatar'/>
                      </StyledBadge>
                      :
                        <StyledBadge variant='dot' color="secondary" style={{color:"white"}}>
                          <img style={{height:"3rem"}} src={avatar} alt='avatar'/>
                        </StyledBadge>
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