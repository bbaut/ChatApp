import React from 'react'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux';
import SidebarHeader from './SidebarHeader';
import SidebarMenu from './SidebarMenu';
import Chats from './Chats';
import Groups from './Groups';
import Contacts from './Contacts';
import Requests from './Requests';
import AddContact from './AddContact';

const Sidebar = () => {
    const { value } = useSelector(
        (state) => state.display
    );

    if (value === "welcome" || value === "chats") {
        return (
            <>
                <Box 
                sx={{
                    display: "grid",
                    gridTemplateRows: "10% 10% 80%",
                    overflow: "hidden",
                    backgroundColor: "#080420"
                }}
                >
                    <SidebarHeader/>
                    <SidebarMenu/>
                    <Chats/>
                </Box>
            </>
        )
    }
    else if (value === "contacts") {
        return (
            <>
                <Box 
                sx={{
                    display: "grid",
                    gridTemplateRows: "10% 10% 80%",
                    overflow: "hidden",
                    backgroundColor: "#080420"
                }}
                >
                    <SidebarHeader/>
                    <SidebarMenu/>
                    <Contacts/>
                </Box>
            </>
        )
    }
    else if (value === "groups") {
        return (
            <>
                <Box 
                sx={{
                    display: "grid",
                    gridTemplateRows: "10% 10% 80%",
                    overflow: "hidden",
                    backgroundColor: "#080420"
                }}
                >
                    <SidebarHeader/>
                    <SidebarMenu/>
                    <Groups/>
                </Box>
            </>
        )
    }
    else if (value === "requests") {
        return (
            <>
                <Box 
                sx={{
                    display: "grid",
                    gridTemplateRows: "10% 10% 80%",
                    overflow: "hidden",
                    backgroundColor: "#080420"
                }}
                >
                    <SidebarHeader/>
                    <SidebarMenu/>
                    <Requests/>
                </Box>
            </>
        )
    }
    else if (value === "addContact") {
        return (
            <>
                <Box 
                sx={{
                    display: "grid",
                    gridTemplateRows: "10% 10% 80%",
                    overflow: "hidden",
                    backgroundColor: "#080420"
                }}
                >
                    <SidebarHeader/>
                    <SidebarMenu/>
                    <AddContact/>
                </Box>
            </>
        )
    }
    
}

export default Sidebar
