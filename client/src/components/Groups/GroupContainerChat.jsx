import React from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GroupInputChat from './GroupInputChat';
import GroupMessagesChat from './GroupMessagesChat';
import { useDispatch } from 'react-redux';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Box, 
    Typography, 
    Button, 
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

    const [open, setOpen] = React.useState(false);

    const [member, setMember] = React.useState("");

    const handleSendMsg = async (msg) => {
        dispatch({
            type: "createNewMessage",
            payload: {
                newMessage: {
                    chatId: chatId,
                    message: {
                      text: msg
                    },
                    sender: currentMember
                  }
            }
        })
    }

    const handleAddMember = () => {
        setOpen(true);
    }

    const handleOnClickAdd = async () => {
        console.log(member)
        if (member === ""){
            alert("Please fill the name of the group")
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
        setMember("");
        setOpen(false);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box 
            sx={{
                paddingTop:"1rem"
            }}
        >
            <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0 2rem"}}>
                <Box sx={{display:"flex", alignItems:"center", gap:"1rem"}}>
                    <Typography variant='h4' color="white">
                        {currentChat}
                    </Typography>
                    <Button sx={{textAlign:"right", color:"white", cursor:"pointer"}} onClick={handleAddMember}><PersonAddIcon/></Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Add member</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            Write the username
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="member"
                            label="Member"
                            type="name"
                            fullWidth
                            variant="standard"
                            onChange={e => setMember(e.target.value)}
                        />
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleOnClickAdd}>Add member</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Box>
            <GroupMessagesChat currentMember={currentMember}/>
            <GroupInputChat handleSendMsg={handleSendMsg}/>
        </Box>
    )
}

export default GroupContainer