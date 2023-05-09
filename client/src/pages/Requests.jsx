import * as React from 'react';
import List from '@mui/material/List';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import CONTACT_REQUEST from '../gql/contactRequest'
import { useSubscription } from '@apollo/client';
import RequestLayer from '../components/RequestLayer';

export default function AlignItemsList() {
    const dispatch = useDispatch();

    const { requests } = useSelector(
        (state) => state.user.value
    );

    useSubscription(CONTACT_REQUEST, {
        onData: (data) => {
            dispatch({
                type: "addNewRequest",
                payload: data.data.data.addContactRequest[1],
            })
        },
        onError: (error) => {
            console.log(error)
        }
    })

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
          <h2> You don't have requests yet</h2>
      </Box>
    )
    }
}