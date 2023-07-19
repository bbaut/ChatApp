import List from '@mui/material/List';
import { Box, Container } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Search from "../components/SearchContact"
import { useSubscription } from '@apollo/client';
import ACCEPT_CONTACT_REQUEST from "../gql/acceptContact"
import DELETE_CONTACT from "../gql/deleteContact"
import ContactLayer from '../components/ContactLayer';
import { useTranslation } from "react-i18next"
import {useEffect} from "react"
import avatar from "../assets/profile-image.jpeg"

const Contacts = () => {

  const {t, i18n} = useTranslation();

    const dispatch = useDispatch();

    const { contacts } = useSelector(
      (state) => state.user.value
    );

    const {language} = useSelector(
      (state) => state.user
    );

    const { value } = useSelector(
      (state) => state.contact
  )

    useSubscription(ACCEPT_CONTACT_REQUEST, {
      onData: (data) => {
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
  }, [])

    let contactsArray = [];

    console.log(contacts)

    if (contacts.length !== 0) {
        for (let i = 0; i<  contacts.length; i++){
            contactsArray.push(contacts[i])
        }

     return (
       <Box
        bgcolor="white"
        flex={5}
        p={2}
      >
          <h1>{t("friends")}</h1>
          <Search language={language}/>
          {value.length !== 0 ? 
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {contactsArray.map((contact, index) => (
                  <ContactLayer item={contact} key={contact} language={language} avatar={value[index].image}/>
              ))}
          </List>
          : 
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {contactsArray.map((contact, index) => (
              <ContactLayer item={contact} key={contact} language={language} avatar={avatar}/>
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
