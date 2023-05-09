import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ContactLayer({item}) {
    const friend = item;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { username } = useSelector(
        (state) => state.user.value
    );
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
                    Chat
                </Button>
                <Button>
                    Delete friend
                </Button>
            </ListItemText>
    </ListItem>
    )
}