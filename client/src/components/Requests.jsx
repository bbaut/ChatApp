import * as React from 'react';
import List from '@mui/material/List';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import RequestLayer from './RequestLayer';
import { useTranslation } from "react-i18next"

export default function AlignItemsList() {
    const dispatch = useDispatch();
    const {t, i18n} = useTranslation();

    const { requests } = useSelector(
        (state) => state.user.value
    );

    let requestsArray = [];

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
        <Box
          bgcolor="white"
          flex={5}
          p={2}
        >
          <h2>{t("noRequestsYet")}</h2>
        </Box>
      )
    }
}