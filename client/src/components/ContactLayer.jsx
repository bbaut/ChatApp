import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';


export default function ContactLayer({item}) {
    const friend = item;

    return (
        <ListItem alignItems='flex-start'>
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText 
            >
                {friend}
                <br/>
                <Button>
                    Delete friend
                </Button>
            </ListItemText>
    </ListItem>
    )
}