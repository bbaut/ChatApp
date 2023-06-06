import * as React from 'react';
import List from '@mui/material/List';
import { Box, Container } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import CONTACT_REQUEST from '../gql/contactRequest'
import { useSubscription } from '@apollo/client';
import RequestLayer from '../components/RequestLayer';
import { useTranslation } from "react-i18next"

export default function AlignItemsList() {
    const dispatch = useDispatch();
    const {t, i18n} = useTranslation();

    const { requests } = useSelector(
        (state) => state.user.value
    );

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

    let requestsArray = [];


    const onChangeLanguage = (e) => {
        i18n.changeLanguage(e.target.id);
        localStorage.setItem("language",e.target.id)
      }

    if (requests.length !== 0) {
        for (let i = 0; i<  requests.length; i++){
            requestsArray.push(requests[i].from)
    }

    return (
        <>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {requestsArray.map((request) => (
                <RequestLayer item={request} key={request}/>
            ))}
        </List>
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
          <h2>{t("noRequestsYet")}</h2>
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