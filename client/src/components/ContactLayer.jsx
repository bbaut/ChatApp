import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function ContactLayer({item}) {
    const friend = item;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { username } = useSelector(
        (state) => state.user.value
    );
    const { currentRoom } = useSelector(
        (state) => state.chat
    );

    const handleChatButton = (e ) => {
        e.preventDefault()
        console.log("chat")
        console.log(username)
        console.log(friend)
        dispatch({
            type: "createNewRoom",
            payload: {
                newRoom:{
                    createdBy: username,
                    member: friend,
                }
            }
        })
    }

    useEffect(()=>{
        if (currentRoom){
            navigate(`/dashboard/chat/${currentRoom}`)
        }
    },[currentRoom])

    return (
        <ListItem alignItems='flex-start'>
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText 
            >
                {friend}
                <br/>
                <Button onClick={handleChatButton}>
                    Chat
                </Button>
                <Button>
                    Delete friend
                </Button>
            </ListItemText>
    </ListItem>
    )
}