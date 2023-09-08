import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Avatar } from '@mui/material';
import avatar from "../assets/profile-image.jpeg"

const Chats = () => {
    const dispatch = useDispatch();

    const [ currentChat, setCurrentChat] = useState(undefined); 

    const { value, isFetching } = useSelector(
        (state) => state.contact
      )

      const { contacts, username, email } = useSelector(
        (state) => state.user.value
      );



      let contactsArray = [];
    if (contacts.length !== 0) {
        for (let i = 0; i<  contacts.length; i++){
            contactsArray.push(contacts[i])
        }
    }

    const handleChatChange = (index, chat) => {
        if(chat !== "undefined"){
            // setCurrentChat(chat);
            dispatch({
              type: "currentGroup",
              payload: {
                group: "undefined"
              }
            })
            dispatch({
                type: "createNewRoom",
                payload: {
                    newRoom:{
                        createdBy: username,
                        member: chat
                    }
                }
            })
            dispatch({
              type: "currentChat",
              payload: {
                chat
              }
            })
            // dispatch({
            //   type: "setUser",
            //   payload: {
            //     email
            //   }
            // })
            console.log(email)
        }
        else {
            return
        }
    }

    useEffect(() => {
        if (contactsArray.length !== 0){
            dispatch({
                type: "getContactData",
                payload: {
                    contactDataInput:{
                        usernameArray: contactsArray
                    }
                }
            })
        }
        // dispatch({
        //     type: "setCurrentChat",
        // })
    }, [])


    // console.log(currentChat)
  return (
    <Box>
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
                  onClick={()=>handleChatChange(index, contact)}
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
                  onClick={()=>handleChatChange(index, contact)}
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
            </Box>
  )
}

export default Chats