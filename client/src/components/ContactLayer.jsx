import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from 'react-redux';


export default function ContactLayer({item, language, avatar}) {

    const dispatch = useDispatch()

    const friend = item;

    const {t} = useTranslation();

    const { username } = useSelector(
        (state) => state.user.value
    );

    const deleteFriend = () => {
        dispatch({
            type: "deleteContact",
            payload: [
                {
                    username: username
                },
                {
                    username: friend
                }
            ]
        })
    }

    return (
        <ListItem alignItems='flex-start'>
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={avatar} />
            </ListItemAvatar>
            <ListItemText 
            >
                {friend}
                <br/>
                <Button
                    onClick={deleteFriend}
                >
                    {t("deleteFriend")}
                </Button>
            </ListItemText>
    </ListItem>
    )
}