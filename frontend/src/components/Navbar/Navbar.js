import React from 'react'
import { Drawer, List, ListItem, ListItemText, Grid, Stack } from '@mui/material';
import { navbarStyles } from './styles';
import { useNavigate, Outlet } from "react-router-dom";

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
    },
  ]

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <Stack direction="row">
            <Drawer
            sx={navbarStyles.drawer}
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
                            sx={navbarStyles.text}
                            primary={item.label}
                        />
                    </ListItem>
                ))}
                </List>
            </Drawer>
            <Outlet />
        </Stack>
    );
};

export default Navbar