import React, { useEffect, useRef } from 'react'
import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import { useSubscription } from '@apollo/client';
import SEND_MESSAGE from '../gql/sendMessage';
import { useDispatch } from 'react-redux';

const ChatMessages = ({currentMember, currentChat}) => {


  const { value } = useSelector(
    (state) => state.chat
  );

  let messages = value
  let sendedby
  
  const dispatch = useDispatch();

  useSubscription(SEND_MESSAGE, {
    onData: (data) => {
        if(data.data.data.sendMessage.sender === currentMember){
          sendedby = "sended"

        }
        else {
          sendedby = "received"
        }
        dispatch({
            type: "addNewMessage",
            payload: {
              chatId: data.data.data.sendMessage.chatId,
              text: data.data.data.sendMessage.message.text,
              sender: sendedby,
              isScribble: data.data.data.sendMessage.message.isScribble,
              received: currentChat
            },
        })
    },
    onError: (error) => {
        console.log(error)
    }
  })

  const ref = useRef(null)

  useEffect(() => {
    if(messages.length) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block:"end",
      })
    }
  },[messages.length])

  useEffect(() => {
    dispatch({
        type: "setCurrentChat",
    })
}, [])

  return (
    <Box
      sx={{
        height: "80%",
        color: "white",
        padding: "1rem 2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        overflow: "auto",
        "&::-webkit-scrollbar": {
          width: "0.2rem",
          height: "0.2rem",
          "&-thumb": {
            backgroundColor: "#ffffff39",
            width: "0.6rem",
            borderRadius: "1rem",
          }
        }
      }}
    >
      {
        messages.map((message, index) => {
          return (
            <Box>
              {message.sender === "sended" ?
                <Box
                  // message
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end"
                  }}
                  key={index}
                >
                  {message.isScribble ? 
                      <Box
                      // content
                      sx={{
                        maxWidth: "40%",
                        overflowWrap: "break-word",
                        padding: "1rem",
                        borderRadius: "1rem",
                        color: "#d1d1d1",
                        backgroundColor: "#d1d1d1",
                      }}
                    >
                        <img src={message.text} alt="" style={{height: "250px"}}/>
                    </Box>
                    :
                    <Box
                      // content
                      sx={{
                        maxWidth: "40%",
                        overflowWrap: "break-word",
                        padding: "1rem",
                        borderRadius: "1rem",
                        color: "#d1d1d1",
                        backgroundColor: "#4f04ff21",
                      }}
                    >
                        <Typography 
                        variant='p'
                      >
                        {message.text}
                      </Typography>
                    </Box>
                  }
                </Box>
              :  
                <Box
                // message
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start"
                  }}
                >
                  {message.isScribble ? 
                      <Box
                      // content
                      sx={{
                        maxWidth: "40%",
                        overflowWrap: "break-word",
                        padding: "1rem",
                        borderRadius: "1rem",
                        color: "#d1d1d1",
                        backgroundColor: "#d1d1d1",
                      }}
                    >
                        <img src={message.text} alt="" style={{height: "250px"}}/>
                    </Box>
                    :
                    <Box
                      // content
                      sx={{
                        maxWidth: "40%",
                        overflowWrap: "break-word",
                        padding: "1rem",
                        borderRadius: "1rem",
                        color: "#d1d1d1",
                        backgroundColor: "#9900ff20",
                      }}
                    >
                        <Typography 
                        variant='p'
                      >
                        {message.text}
                      </Typography>
                    </Box>
                  }
                </Box>
              }
            </Box>
          )
        })
      }
      <div ref={ref} />
    </Box>
  )
}

export default ChatMessages