import List from '@mui/material/List';
import { Box, Stack, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Search from "../components/SearchContact"
import { useSubscription } from '@apollo/client';
import ACCEPT_CONTACT_REQUEST from "../gql/acceptContact"
import DELETE_CONTACT from "../gql/deleteContact"
import ContactLayer from '../components/ContactLayer';
import { useTranslation } from "react-i18next"
import {useEffect, useState} from "react"
import avatar from "../assets/profile-image.jpeg"
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';

const Contacts = () => {
  const [alert, setAlert] = useState("");

  const {t, i18n} = useTranslation();

    const dispatch = useDispatch();

    const { contacts } = useSelector(
      (state) => state.user.value
    );

    const {auth} = useSelector (
      (state) => state.auth
    )

    console.log(auth)

    const {language, error} = useSelector(
      (state) => state.user
    );

    const { value, isFetching } = useSelector(
      (state) => state.contact
  )
    useSubscription(ACCEPT_CONTACT_REQUEST, {
      onData: (data) => {
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
  
    useEffect (() => {
      i18n.changeLanguage(localStorage.getItem("language"));
    },[language])

    useEffect(() => {
      if (contacts.length !== 0){
          dispatch({
              type: "getContactData",
              payload: {
                  contactDataInput:{
                      usernameArray: contacts
                  }
              }
          })
      }
  },[contacts])

  useEffect(()=>{
    if(error === "User already in your contact list"){
      setAlert(t("alreadyContactError"));
    }
    else if (error === "You have already sent a request to this contact"){
      setAlert(t("alreadySentReqError"));
    }
    else if (error === "You already have a request from this friend"){
      setAlert(t("alreadyHaveReqError"));
    }
    else{
      setAlert("");
    }
  }, [error])

  const handleCloseAlert = () => {
    dispatch({
      type: "setError"
  })
  }

    if (contacts.length !== 0) {

     return (
       <Box
        bgcolor="white"
        flex={5}
        p={2}
      >
          {alert && 
            <Stack spacing={2} paddingBottom={2} sx={{color:"#990f02"}}>
                <Box>
                  <ErrorIcon/>
                  <CloseIcon 
                    onClick={handleCloseAlert}
                    sx={{
                      cursor: "pointer",
                      marginLeft: "3rem"
                    }}
                  />
                </Box>
                <Typography variant="h6">
                    {alert}
                </Typography>
            </Stack>
          }
          <h1>{t("friends")}</h1>
          <Search language={language}/>
          {value.length === 0 || isFetching ? 
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {contacts.map((contact, index) => (
                <ContactLayer item={contact} key={contact} language={language} avatar={avatar}/>
            ))}
             </List>
          : 
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {contacts.map((contact, index) => (
                  <ContactLayer item={contact} key={contact} language={language} avatar={value[index].image ? value[index].image : avatar}/>
              ))}
          </List>
          }
        </Box>
    );
  }
    else {
       return (
         <Box
          bgcolor="white"
          flex={5}
          p={2}
        >
          <h1>{t("friends")}</h1>
          <h2>{t("noFriends")}</h2>
          <h3>{t("addingAFriend")}</h3>
          <Search/>
      </Box>
    )
  }
}
    

export default Contacts
