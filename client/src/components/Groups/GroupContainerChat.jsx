import React from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GroupInputChat from './GroupInputChat';
import GroupMessagesChat from './GroupMessagesChat';
import { useDispatch } from 'react-redux';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ErrorIcon from '@mui/icons-material/Error';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useTranslation } from "react-i18next"
import { Box, 
    Typography, 
    Button,
    Stack,
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    TextField, 
    DialogActions } from '@mui/material'

const GroupContainer = ({currentChat, currentMember, messages}) => {
    const dispatch = useDispatch();
    const { chatId } = useParams();
    const { contacts, username } = useSelector(
        (state) => state.user.value
    );
    const { chatMember, createdBy } = useSelector(
        (state) => state.chat
    );

    const [open, setOpen] = React.useState(false);
    const [openR, setOpenR] = React.useState(false);
    const [alert, setAlert] = React.useState("");

    const [member, setMember] = React.useState("");

    const {t} = useTranslation();

    const handleSendMsg = async (msg, isScribble) => {
        dispatch({
            type: "createNewMessage",
            payload: {
                newMessage: {
                    chatId: chatId,
                    message: {
                        text: msg,
                        isScribble: isScribble
                    },
                    sender: currentMember
                }
            }
        })
    }

    const handleAddMember = () => {
        setOpen(true);
    }
    const handleRemoveMember = () => {
        setOpenR(true);
    }

    const handleOnClickAdd = async () => {

        if (member === ""){
            setAlert(t("usernameRequired"))
            return
        }

        const contact = contacts.find(element => {
            return element === member
        })

        if (!contact) {
            alert(t("userNotFound"))
            return
        }

        dispatch({
            type: "addMember",
            payload: {
                username: currentMember,
                id: chatId,
                member: member,
                chatName: currentChat
            }
        })

        setAlert("");
        setMember("");
        setOpen(false);
    }

    const handleLeaveGroup = async () => {
        dispatch({
            type: "removeMember",
            payload: {
                username: currentMember,
                id: chatId,
                member: currentMember,
                chatName: currentChat
            }
        })
    }

    const handleOnClickRemove = async () => {
        if (member === ""){
            setAlert(t("usernameRequired"))
            return
        }

        const contact = chatMember.find(element => {
            return element === member
        })

        if (!contact) {
            setAlert(t("userNotFound"))
            return
        }
        dispatch({
            type: "removeMember",
            payload: {
                username: currentMember,
                id: chatId,
                member: member,
                chatName: currentChat
            }
        })
        setAlert("");
        setMember("");
        setOpenR(false);
    }

    const handleAddClose = () => {
        setOpen(false);
        setAlert("");
    };
    const handleRemoveClose = () => {
        setOpenR(false);
        setAlert("");
    };

    return (
        <Box 
            sx={{
                gap:"0.1rem",
                overflow: "hidden",
                paddingTop:"1rem"
            }}
        >
            <Box 
                sx={{
                    display:"flex", 
                    justifyContent:"space-between", 
                    alignItems:"center", 
                    padding:"0 2rem"
                }}>
                <Box 
                    sx={{
                        display:"flex", 
                        alignItems:"center", 
                        gap:"1rem"
                    }}
                >
                    <Typography variant='h4' color="white">
                        {currentChat}
                    </Typography>
                </Box>
                {createdBy === username ? 
                    <Box>
                    <Button sx={{ color:"white", cursor:"pointer"}} onClick={handleAddMember}><PersonAddIcon/></Button>
                        <Dialog open={open} onClose={handleAddClose}>
                            <DialogTitle>{t("addFriend")}</DialogTitle>
                            <DialogContent>
                            {alert && 
                            <Stack spacing={2} paddingBottom={2} sx={{color:"#990f02"}}>
                                <ErrorIcon/>
                                <Typography variant="h6">
                                    {alert}
                                </Typography>
                            </Stack>
                            }
                            <DialogContentText>
                                {t("writeUsername")}
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="member"
                                label={t("username")}
                                type="name"
                                fullWidth
                                variant="standard"
                                onChange={e => setMember(e.target.value)}
                            />
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleOnClickAdd}>{t("addFriend")}</Button>
                            <Button onClick={handleAddClose}>{t("cancel")}</Button>
                            </DialogActions>
                        </Dialog>
                        <Button sx={{color:"white", cursor:"pointer"}} onClick={handleRemoveMember}><PersonRemoveIcon/></Button>
                        <Dialog open={openR} onClose={handleRemoveClose}>
                            <DialogTitle>{t("deleteFriend")}</DialogTitle>
                            <DialogContent>
                            {alert && 
                            <Stack spacing={2} paddingBottom={2} sx={{color:"#990f02"}}>
                                <ErrorIcon/>
                                <Typography variant="h6">
                                    {alert}
                                </Typography>
                            </Stack>
                            }
                            <DialogContentText>
                                {t("writeUsername")}
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="member"
                                label={t("username")}
                                type="name"
                                fullWidth
                                variant="standard"
                                onChange={e => setMember(e.target.value)}
                            />
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleOnClickRemove}>{t("removeFriend")}</Button>
                            <Button onClick={handleRemoveClose}>{t("cancel")}</Button>
                            </DialogActions>
                        </Dialog>
                    </Box>

                :
                    <Box>
                        <Box sx={{color:"white", cursor:"pointer"}} onClick={handleLeaveGroup}>
                            <ExitToAppIcon/>
                        </Box>
                    </Box>
                }
            </Box>
            <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0 2rem"}}>
                <Typography variant='p' color="white" sx={{flexBasis:"100"}}>
                    {chatMember.length} {t("friends")}
                </Typography>
            </Box>
            <GroupMessagesChat currentMember={currentMember}/>
            <GroupInputChat handleSendMsg={handleSendMsg}/>
        </Box>
    )
}

export default GroupContainer