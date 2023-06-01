import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function RequestLayer({item}) {
    const from = item;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { username } = useSelector(
        (state) => state.user.value
    );

    const handleAccept = (e) => {
        e.preventDefault();

        dispatch({
            type: "acceptFriend",
            payload: [
                {
                    username: from
                },
                {
                    username: username
                }
            ]
        })

        navigate("/dashboard/contacts");
    }
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
                <Button onClick={handleAccept}>
                    Accept contact
                </Button>
                <Button onClick={handleDelete}>
                    Delete request
                </Button>
            </ListItemText>
    </ListItem>
    )
}