import React, { useEffect, useState } from 'react'
import { Box, 
    Typography, 
    Button, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    TextField, 
    DialogActions } from '@mui/material'
import Avatar from "../../assets/avatar.png"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import GroupAddIcon from '@mui/icons-material/GroupAdd';


const GroupContacts = ({groupsArray, currentMember, changeChat}) => {

  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [open, setOpen] = React.useState(false);
  const [groupName, setGroupName] = React.useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentRoom } = useSelector(
    (state) => state.chat
);

const { contacts, username } = useSelector(
    (state) => state.user.value
  );

useEffect(()=>{
    if (currentRoom){
        navigate(`/dashboard/groups/${currentRoom}`)
    }
},[currentRoom])

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact)
  }

  const handleCreateGroup = () => {
      setOpen(true);
  }

  const handleCreate = () => {
    if (groupName === ""){
        alert("Please fill the name of the group")
        return
    }

    dispatch({
        type: "createNewGroup",
        payload: {
          createdBy: username,
          groupName: groupName
        }
    })

    setGroupName("");
    setOpen(false);
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <> 

        <Box 
          sx={{
            display: "grid",
            gridTemplateRows: "10% 75% 15%",
            overflow: "hidden",
            backgroundColor: "#080420"
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem"
            }}
          >
            <Button
              sx={{
                height: "2rem",
                color: "white"
              }}
              onClick={handleCreateGroup}
            >
             <GroupAddIcon/>
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Write the name of the group
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="groupName"
                    label="Group name"
                    type="name"
                    fullWidth
                    variant="standard"
                    onChange={e => setGroupName(e.target.value)}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCreate}>Create group</Button>
                <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Typography
              sx={{
                color:"white",
                textTransform:"uppercase"
              }}
            >
              groups
            </Typography>
          </Box>
          <Box 
            // contacts
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              overflow: "auto",
              gap: "0.8rem",
              "&::-webkit-scrollbar": {
                width: "0.2rem",
                "&-thumb": {
                  backgroundColor: "#ffffff39",
                  width: "0.1rem",
                  borderRadius: "1rem",
                }
              }
            }}
          >
            {groupsArray.map((group, index) => {
                return (
                  <Box 
                    // contact 
                    sx={{
                      backgroundColor: "#ffffff39",
                      minHeight:"5rem",
                      width:"90%",
                      cursor:"pointer",
                      borderRadius:"0.2rem",
                      padding:"0.4rem",
                      gap:"1rem",
                      alignItems: "center",
                      display: "flex",
                      transition: "0.5s ease-in-out"
                    }}
                    key={index}
                    onClick={()=>changeCurrentChat(index, group)}
                  >
                    <Box
                      // avatar
                    >
                      <img style={{height:"3rem"}} src={Avatar} alt='avatar'/>
                    </Box>
                    <Box
                      // username
                    >
                      <h3 
                        style={{
                          color: "white"
                        }}
                      >{group}</h3>
                    </Box>
                  </Box>
                )
              })
            }
          </Box>
          <Box
            // currentuser
            sx={{
              backgroundColor:"#0d0d30",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "2rem"
            }}
          >
            <Box
              // avatar
            >
              <img style={{height:"4rem", maxInlineSize: "100%"}} src={Avatar} alt='avatar'/>
            </Box>
            <Box
              // username
            >
              <h2 
                style={{
                  color: "white"
                }}
              >{currentMember}</h2>
            </Box>
          </Box>
        </Box>
    </>
  )
}

export default GroupContacts