import React from 'react'
import { Drawer, List, ListItem, ListItemText, Button, Stack, Typography, Box, IconButton } from '@mui/material';
import { useNavigate, Outlet, Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

const mainNavbarItems = [
    {
        id: 0,
        label: 'Home',
        route: 'home',
    },
    {
        id: 1,
        label: 'About',
        route: 'about',
    },
    {
        id: 2,
        label: 'Posts',
        route: 'posts',
    }
]

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <Stack direction="row">
            <Drawer
            sx={{width: 200,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 200,
                    boxSizing: 'border-box',
                    backgroundColor: '#101F33',
                    color: 'rgba(255, 255, 255, 0.7)',
                },
                '& .Mui-selected': {
                    color: 'red',
                }}}
            variant="permanent"
            anchor="left"
            >
                <List>
                {mainNavbarItems.map((item) => (
                    <ListItem
                        button
                        key={item.id}
                        onClick={() => navigate(item.route)}
                    >
                        <ListItemText
                            sx={{
                                '& span': {
                                    marginLeft: '5px',
                                    fontWeight: '600',
                                    fontSize: '16px',
                                }}}
                            primary={item.label}
                        />
                    </ListItem>
                ))}
                </List>
                <Box textAlign = 'center' sx = {{marginTop: 'auto', marginBottom: 3}}>
                    <Button 
                        variant = "contained"
                        component = {Link}
                        to = "/create"
                        sx = {{borderRadius: 5, width: 150, justifyContent: 'center'}}
                        startIcon = {<AddIcon />}
                    >
                        <Typography sx= {{fontSize: '16px', fontWeigt: '1000'}}> Create </Typography>
                    </Button>
                </Box>
            </Drawer>
            <Outlet />
        </Stack>
    );
};

export default Navbar