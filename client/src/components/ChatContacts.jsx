import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import Avatar from "../assets/avatar.png"

const ChatContacts = ({contactsArray, currentChat}) => {

  const [currentUsername, setCurrentUsername] = useState("hello");
  const [currentSelected, setCurrentSelected] = useState(undefined);

  console.log(currentUsername)
  console.log(currentChat)

  useEffect(() => {
    if(currentChat){
      setCurrentUsername(currentChat)
    }
  }, [currentChat])

  const changeCurrentChat = (index, contact) => {}
  
  return (
    <> {
      currentUsername && (
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
                height: "2rem"
              }}
            >
              Hello
            </Typography>
            <Typography
              sx={{
                color:"white",
                textTransform:"uppercase"
              }}
            >
              You
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
              >{currentChat}</h2>
            </Box>
          </Box>
        </Box>
      )
    }
    </>
  )
}

export default ChatContacts