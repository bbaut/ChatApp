import List from '@mui/material/List';
import { Box, Container } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Search from "../components/SearchContact"
import { useSubscription } from '@apollo/client';
import ACCEPT_CONTACT_REQUEST from "../gql/acceptContact"
import ContactLayer from '../components/ContactLayer';
import { useTranslation } from "react-i18next"
import {useEffect} from "react"

const Contacts = () => {

  const {t, i18n} = useTranslation();

    const dispatch = useDispatch();

    const { contacts } = useSelector(
      (state) => state.user.value
    );

    const {language} = useSelector(
      (state) => state.user
    );


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

    const onChangeLanguage = (e) => {
      i18n.changeLanguage(e.target.id);
      localStorage.setItem("language",e.target.id)
    }
  
    useEffect (() => {
      i18n.changeLanguage(localStorage.getItem("language"));
    },[language])

    let contactsArray = [];

    if (contacts.length !== 0) {
        for (let i = 0; i<  contacts.length; i++){
            contactsArray.push(contacts[i])
        }

    return (
      <>
      <Box
      bgcolor="white"
      flex={5}
      p={2}
    >
          <h1>{t("friends")}</h1>
          <Search language={language}/>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {contactsArray.map((contact) => (
                  <ContactLayer item={contact} key={contact} language={language}/>
              ))}
          </List>
        </Box>
        <Container sx={{display:"flex", margin:"10rem", flexDirection:"row", justifyContent:"space-evenly", marginBottom:"8rem"}}>
        <Box id="en" sx={{margin:"2rem", cursor:"pointer"}}
          onClick={onChangeLanguage}
        >
          English
        </Box>
        <Box id="es" sx={{margin:"2rem", cursor:"pointer"}}
          onClick={onChangeLanguage}
        >
          Español
        </Box>
        <Box id="fr" sx={{margin:"2rem", cursor:"pointer"}}
          onClick={onChangeLanguage}
        >
          Français (France)
        </Box>
        <Box id="br" sx={{margin:"2rem", cursor:"pointer"}}
          onClick={onChangeLanguage}
        >
          Português (Brasil)
        </Box>
        <Box id="it" sx={{margin:"2rem", cursor:"pointer"}}
          onClick={onChangeLanguage}
        >
          Italiano
        </Box>
        <Box id="dt" sx={{margin:"2rem", cursor:"pointer"}}
          onClick={onChangeLanguage}
        >
          Deutsch
        </Box>
      </Container>
      </>
    );
    }

    else {
    return (
      <>
        <Box
        bgcolor="white"
        flex={5}
        p={2}
      >
          <h1>Contacts</h1>
          <h2> You don't have contacts yet</h2>
          <h3>Start by adding a contact</h3>
          <Search/>
      </Box>
      <Container sx={{display:"flex", margin:"10rem", flexDirection:"row", justifyContent:"space-evenly", marginBottom:"8rem"}}>
      <Box id="en" sx={{margin:"2rem", cursor:"pointer"}}
        onClick={onChangeLanguage}
      >
        English
      </Box>
      <Box id="es" sx={{margin:"2rem", cursor:"pointer"}}
        onClick={onChangeLanguage}
      >
        Español
      </Box>
      <Box id="fr" sx={{margin:"2rem", cursor:"pointer"}}
        onClick={onChangeLanguage}
      >
        Français (France)
      </Box>
      <Box id="br" sx={{margin:"2rem", cursor:"pointer"}}
        onClick={onChangeLanguage}
      >
        Português (Brasil)
      </Box>
      <Box id="it" sx={{margin:"2rem", cursor:"pointer"}}
        onClick={onChangeLanguage}
      >
        Italiano
      </Box>
      <Box id="dt" sx={{margin:"2rem", cursor:"pointer"}}
        onClick={onChangeLanguage}
      >
        Deutsch
      </Box>
    </Container>
    </>
    )
    }
   
    

}
    

export default Contacts
