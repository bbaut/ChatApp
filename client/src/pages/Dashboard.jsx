// import Feed from "../components/Feed"

// const Dashboard = () => {
//     return (
//         <Feed/>
//     )
//   }
  
//   export default Dashboard

import React from 'react'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useSubscription } from '@apollo/client';
import Feed from "../components/Feed"
import Sidebar from '../components/Sidebar';
import CONTACT_REQUEST from '../gql/contactRequest';
import ACCEPT_CONTACT_REQUEST from '../gql/acceptContact';
import DELETE_CONTACT from "../gql/deleteContact"


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

const Dashboard = () => {
    const { value } = useSelector(
        (state) => state.display
    );

    const dispatch = useDispatch();

    useSubscription(CONTACT_REQUEST, {
        onData: (data) => {
            dispatch({
                type: "addNewRequest",
                payload: data.data.data.addContactRequest,
            })
        },
        onError: (error) => {
            console.log(error)
        }
    })

    useSubscription(ACCEPT_CONTACT_REQUEST, {
        onData: (data) => {
          console.log(data)
          dispatch({
            type: "isFetchingContact"
          })
  
          dispatch({
            type: "acceptRequest",
            payload: data.data.data.acceptContactRequest,
          })
        },
        onError: (error) => {
            console.log(error)
        }
      })

      useSubscription(DELETE_CONTACT, {
        onData: (data) => {
          dispatch({
            type: "deletedContact",
            payload: data.data.data.deleteContact,
        })
        },
        onError:(error) => {
          console.log(error)
        }
      })

    return (
        <BoxContainer sx={{height: "100vh"}}>
            <Box sx={{padding:"1rem", height: "100vh", width: "100vw", backgroundColor:"#080420", display: "grid", gridTemplateColumns: "25% 75%"}}>
            <Sidebar/>
            <Feed/>
            </Box>
        </BoxContainer>
    )
}

export default Dashboard
