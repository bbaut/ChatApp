import { useState } from 'react';
import {TextField, Button, FormControl, Form, IconButton} from '@mui/material';
import { styled } from '@mui/material/styles';
import Picker from "emoji-picker-react";
import { Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useTranslation } from "react-i18next"
import "./ChatInput.css"

const BoxContainer = styled(Box)(() => ({
    display:"flex",
    alignItems: "center",
    width: "100%",
    padding: "0px",
    gap: "15px",
    backgroundColor: "#080420",
    paddingBottom: '0.3rem'
}));

const BoxButtonContainer = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    color: "white",
    gap: "1rem",
}));

const ChatInput = ({handleSendMsg}) => {

    const [text, setText] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

    const {t} = useTranslation();

    const handleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker) 
    }

    const sendChat = (e) => {
        e.preventDefault();
        if(text.length>0){
            handleSendMsg(text);
            setText('');
        }
    }

    const handleEmojiClick = (event,emoji) => {
        let txt = text;
        txt += emoji.emoji;
        setText(txt)
    }

    return (
        
        <BoxContainer 
            component="form"
            onSubmit={sendChat}
        >
            <IconButton 
                color='primary' 
                sx={{
                    minWidth: "50px",
                    width: "50px",
                    height: "50px",
                    flexGrow: 0,
                    backgroundColor: "#ffffff34",
                    marginLeft: "20px"
                }}
                onClick={handleEmojiPicker}
            >
                <EmojiEmotionsIcon sx={{color: "#ffff00c4"}}/>
            </IconButton>
            {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>}
            <TextField
                direction="column"
                placeholder={t("writeAMessage")}
                inputProps={{
                    maxLength: 5000,
                }}
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                sx={{
                    backgroundColor: "#ffffff34",
                    input: {color:"white"},
                    borderRadius: "25px",
                    flexGrow: 2,
                    paddingLeft: "2px",
                    width: "125vh",
                    maxHeight: "70px",
                    margin: 0,
                    whiteSpace: "normal",
                    overflowY: "scroll",
                    overflowWrap: "break-word",
                    "& fieldset": {
                        border: "none",
                        },
                        "&::-webkit-scrollbar": {
                        width: "0.4em",
                        },
                        "&::-webkit-scrollbar-track": {
                        boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                        webkitBoxShadow: "inset 0 0 6px rgba(,0,0,0.00)",
                        },
                        "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "rgba(145, 136, 153, 0.91)",
                        outline: "1px solid slategrey",
                        },
                }}
            />
            <IconButton
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                    minWidth: "50px",
                    width: "50px",
                    height: "50px",
                    flexGrow: 0,
                    backgroundColor: "#ffffff34",
                }}>
                <SendIcon sx={{color: "#f5f5f5"}}/>
            </IconButton>
        </BoxContainer>
    )
}

export default ChatInput
