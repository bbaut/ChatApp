import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Button, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

export default function RequestLayer({item}) {
    const from = item;

    const dispatch = useDispatch();

    const { username } = useSelector(
        (state) => state.user.value
    );

    const handleDelete = (e) => {
        e.preventDefault();

        dispatch({
            type: "removeRequest",
            payload: [
                {
                    username: from
                },
                {
                    username: username
                }
            ]
        })
    }
    return (
        <ListItem alignItems='flex-start'>
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText 
            >
                {from}
                <br/>
                <Button>
                    Accept contact
                </Button>
                <Button onClick={handleDelete}>
                    Delete request
                </Button>
            </ListItemText>
    </ListItem>
    )
}