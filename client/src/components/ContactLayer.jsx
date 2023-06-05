import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import { useTranslation } from "react-i18next"


export default function ContactLayer({item, language}) {
    const friend = item;

    const {t} = useTranslation();
    

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
                    {t("deleteFriend")}
                </Button>
            </ListItemText>
    </ListItem>
    )
}