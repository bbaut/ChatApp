import React, { useEffect, useState } from 'react'
import { Box, 
    Typography, 
    Button, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    TextField, 
    DialogActions,
    Avatar } from '@mui/material'
import AvatarImg from "../../assets/group.svg"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useTranslation } from "react-i18next"
// import avatar from "../../assets/profile-image.jpeg"


const GroupContacts = ({groupsArray, currentMember, changeChat, avatarProfile}) => {

  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [open, setOpen] = React.useState(false);
  const [groupName, setGroupName] = React.useState("");

  const {t} = useTranslation();
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
                <DialogTitle>{t("createGroup")}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    {t("writeChatName")}
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="groupName"
                    label={t("groupName")}
                    type="name"
                    fullWidth
                    variant="standard"
                    onChange={e => setGroupName(e.target.value)}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCreate}>{t("createGroup")}</Button>
                <Button onClick={handleClose}>{t("cancel")}</Button>
                </DialogActions>
            </Dialog>
            <Typography
              sx={{
                color:"white",
                textTransform:"uppercase"
              }}
            >
              {t("groups")}
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
                      <Avatar style={{height:"3rem", width:"3rem"}} src={AvatarImg} alt='avatar'/>
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
              {avatarProfile ? 
                <img 
                  style={{
                    height:"4rem",
                    width: "4rem",
                    borderRadius: "50%",
                    objectFit: "cover", 
                    maxInlineSize: "100%"
                  }} 
                  src={avatarProfile} 
                  alt='avatar'/>
              :
                <img 
                  style={{
                    height:"4rem", 
                    borderRadius: "50%",
                    objectFit: "cover", 
                    maxInlineSize: "100%"
                  }} 
                  src={AvatarImg} 
                  alt='avatar'
                />
              }
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