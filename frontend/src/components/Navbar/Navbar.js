import React from 'react'
import { Drawer, List, ListItem, ListItemText, Grid } from '@mui/material';
import { mainNavbarItems } from './navbarItems';
import { navbarStyles } from './styles';
import { useNavigate, Outlet } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <Grid container>
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
        </Grid>
    );
};

export default Navbar