import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import {AccountBox, Home, Person, Settings} from "@mui/icons-material";


const Sidebar = ({users}) => {
  return (
    // <>
    //     <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam temporibus dignissimos impedit alias debitis veritatis eius perspiciatis? Illum voluptas deserunt nobis aliquam maiores, ipsam itaque est dolore soluta dolorem nemo.</h1>
    // </>
    <Box
        flex={1}
        p={2}
        sx ={{display: {xs: "none", sm: "block"}}}
    >
        <List>
            <ListItem dissablePadding>
                <ListItemButton component="a" href="#home">
                    <ListItemIcon>
                        <Home/>
                    </ListItemIcon>
                    <ListItemText primary="Homepage"/>
                </ListItemButton>
            </ListItem>

            <ListItem dissablePadding>
                <ListItemButton component="a" href="#home">
                    <ListItemIcon>
                        <AccountBox/>
                    </ListItemIcon>
                    <ListItemText primary="Profile"/>
                </ListItemButton>
            </ListItem>

            <ListItem dissablePadding>
                <ListItemButton component="a" href="#home">
                    <ListItemIcon>
                        <Person/>
                    </ListItemIcon>
                    <ListItemText primary="Friends"/>
                </ListItemButton>
            </ListItem>

            <ListItem dissablePadding>
                <ListItemButton component="a" href="#home">
                    <ListItemIcon>
                        <Settings/>
                    </ListItemIcon>
                    <ListItemText primary="Settings"/>
                </ListItemButton>
            </ListItem>

            
            <ListItem dissablePadding>
                <ListItemButton component="a" href="#home">
                    <ListItemIcon>
                        <AccountBox/>
                    </ListItemIcon>
                    <ListItemText primary="Profile"/>
                </ListItemButton>
            </ListItem>
        </List>
    </Box>
  )
}

export default Sidebar