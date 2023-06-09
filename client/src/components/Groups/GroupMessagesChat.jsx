import React, { useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useSubscription } from '@apollo/client';
import SEND_MESSAGE from '../../gql/sendMessage';

const GroupMessagesChat = ({currentMember}) => {


  const { value, valueGroup, isFetching } = useSelector(
    (state) => state.chat
  );

  let messages = valueGroup
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
              text: data.data.data.sendMessage.message.text,
              sender: sendedby,
              sendedBy: data.data.data.sendMessage.sender,
              isScribble: data.data.data.sendMessage.message.isScribble
            },
        })

    },
    onError: (error) => {
        console.log(error)
    }
  })

  return (
    <Box
      sx={{
        height: "75%",
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
              {
                  message.sender === "sended" ?
              <Box
                // message
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
                key={index}
              >
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
                  {message.isScribble ?
                    <img src={message.text} alt=""/>
                  :
                    <Typography 
                      variant='p'
                    >
                      {message.text}
                    </Typography>
                  }
                  {/* <Typography 
                    variant='p'
                  >
                    {message.text}
                  </Typography> */}
                </Box>
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
              {message.isScribble ?
                <>
                  <Typography 
                    variant='subtitle2'
                    color="white"
                  >
                    {message.sendedBy}
                  </Typography>
                  <img src={message.text} alt=""/>
                </> 
              :
                <>
                  <Typography 
                      variant='subtitle2'
                      color="white"
                    >
                      {message.sendedBy}
                  </Typography>
                  <Typography 
                    variant='p'
                  >
                    {message.text}
                  </Typography>
                </>
              }
{/* 
              <Typography 
                  variant='subtitle2'
                  color="white"
              >
                  {message.sendedBy}
            </Typography>
              <Typography 
                variant='p'
              >
                {message.text}
              </Typography> */}
            </Box>
          </Box>
            }
            </Box>
          )
        })
      }
    </Box>
  )
}

export default GroupMessagesChat