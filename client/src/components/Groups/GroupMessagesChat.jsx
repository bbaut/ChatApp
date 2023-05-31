import React, { useEffect } from 'react'
import { Box, Typography } from '@mui/material'
// import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useSubscription } from '@apollo/client';
// import SEND_MESSAGE from '../gql/sendMessage';
import { useDispatch } from 'react-redux';

const GroupMessagesChat = ({currentMember}) => {


  const { value, isFetching } = useSelector(
    (state) => state.chat
  );

  let messages = value
  let sendedby
  const dispatch = useDispatch();

//   useSubscription(SEND_MESSAGE, {
//     onData: (data) => {
//         if(data.data.data.sendMessage.sender === currentMember){
//           sendedby = "sended"

//         }
//         else {
//           sendedby = "received"
//         }
//         dispatch({
//             type: "addNewMessage",
//             payload: {
//               text: data.data.data.sendMessage.message.text,
//               sender: sendedby
//             },
//         })
//     },
//     onError: (error) => {
//         console.log(error)
//     }
//   })

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
                  <Typography 
                    variant='p'
                  >
                    {message.text}
                  </Typography>
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
              <Typography 
                variant='p'
              >
                {message.text}
              </Typography>
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