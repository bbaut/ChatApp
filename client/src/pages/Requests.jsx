import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button, Box } from '@mui/material';
import { useSelector } from 'react-redux';

export default function AlignItemsList() {
    const { username, requests } = useSelector(
        (state) => state.user.value
    );

    let requestsArray 
    if (requests.length !== 0) {
        requestsArray = requests
    return (
        <>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {requestsArray.map((request, index) => (
                <ListItem alignItems='flex-start' key={index}>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText 
                    >
                        {request}
                        <br/>
                        <Button>
                            Accept contact
                        </Button>
                        <Button>
                            Delete request
                        </Button>
                    </ListItemText>
                </ListItem>
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
          <h2>{username}, you don't have requests yet</h2>
      </Box>
    )
    }
}