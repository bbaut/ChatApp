import { useState } from 'react';
import {TextField, Button, IconButton, Modal, Typography} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useTranslation } from "react-i18next"
import "./ChatInput.css"
import Canvas from './Canvas';
import GestureIcon from '@mui/icons-material/Gesture';
import EmojiPicker from 'emoji-picker-react';
import { EmojiClickData, EmojiStyle, Emoji } from 'emoji-picker-react';

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
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);

    const {t} = useTranslation();

    const handleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker) 
    }

    const sendChat = (e) => {
        e.preventDefault();
        if(text.length>0){
            handleSendMsg(text, false);
            setText('');
        }
    }

    const handleEmojiClick = (emojiObject, event) => {
        let txt = text;
        txt += emojiObject.emoji;
        setText(txt)
        // setText(emojiData.unified)
    }

    const handleClick = (event) => {
        event.preventDefault();
    
        setOpen(true);
    };

    const handleScribble = (event) => {
        event.preventDefault();
        const canva = document.querySelector("canvas");
    
        const image = canva.toDataURL("image/png").toString();
    
        const messageInput = {
          content: image,
          isScribble: true,
        };

        
         if (image.length < 92000) {
          handleSendMsg(image, true);
          setError(false);
          setOpen(false);
         } 
         else {
          const ctx = canva.getContext("2d");
          ctx.clearRect(0, 0, 600, 400);
          setError(true);
         }
      };

    return (
        
        <BoxContainer 
            component="form"
            onSubmit={sendChat}
            sx={{marginTop: "5px"}}
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
            {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick}/>}
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
            <IconButton
                variant="contained"
                color="primary"
                onClick={handleClick}
                sx={{
                    minWidth: "50px",
                    width: "50px",
                    height: "50px",
                    flexGrow: 0,
                    backgroundColor: "rgb(50, 50, 50)",
                }}>
                <GestureIcon sx={{color: "#f5f5f5"}}/>
            </IconButton>

            <Modal open={open} onSubmit={handleScribble}>
                <Box 
                    component="form" 
                    sx={{
                        position: "absolute", 
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 700,
                        height: 450,
                        bgcolor: "black",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography variant="h6" component="h2">
                        {t("scribble")}
                    </Typography>
                    <Typography sx={{ mt: 1 }}>{t("scribbleInstruction")}</Typography>
                    <Box
                        sx={{
                            margin: 1,
                        }}>
                        <Canvas width={430} height={280} id="canvas" />
                            {error ? (
                            <Typography color="red" sx={{ m: 1, textAlign: "center" }}>
                                {t("scribbleError")}
                            </Typography>
                            ) : null}
                    </Box>

                    <Box >
                        <Button type="submit" variant="contained">
                        {t("send")}
                        </Button>
                        <Button
                        variant="outlined"
                        sx={{color: "white"}}
                        onClick={(event) => {
                            event.preventDefault();
                            setError(false);
                            return setOpen(false);
                        }}>
                        {t("cancel")}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </BoxContainer>
    )
}

export default ChatInput
