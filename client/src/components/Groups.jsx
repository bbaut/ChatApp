import { useEffect, useState } from 'react'
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
import AvatarImg from "../assets/group.svg"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useTranslation } from "react-i18next"

const Groups = () => {

    const [open, setOpen] = useState(false);
    const [groupName, setGroupName] = useState("");
  
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const handleCreateGroup = () => {
        setOpen(true);
    }

    const { currentRoom } = useSelector(
        (state) => state.chat
    );
    
    const { groups, username, image } = useSelector(
        (state) => state.user.value
      );

      let avatarProfile = image;

      const handleGroupChange = (index, chat) => {
        dispatch({
            type: "setCurrentChat",
        })

        var result = groups.find(item => item.chatName === chat);

        dispatch({
            type: "currentChat",
            payload: {
              chat: "undefined"
            }
          })
        dispatch({
            type: "currentGroup",
            payload: {
              group: result.chatName
            }
          })

        dispatch({
            type: "queryGroup",
            payload: {
                id: result.chatId
            }
        })
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
    
      let groupsArray = [];
        if (groups.length !== 0) {  
            for (let i = 0; i<  groups.length; i++){
                groupsArray.push(groups[i].chatName)
            }
        }
  return (
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
                    onClick={()=>handleGroupChange(index, group)}
                  >
                    <Box
                      // groupname
                      sx={{marginLeft:"20px"}}
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
        </Box>
  )
}

export default Groups