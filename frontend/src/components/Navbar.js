import React from 'react'
import { Drawer, List, ListItem, ListItemText, Button, Stack, Typography, Box} from '@mui/material';
import { useNavigate, Outlet, Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { mainNavbarItems } from '../utils/constants';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <Box>
            <Drawer
                sx={{width: '200px', border: 0, borderColor: '#FFC0CB',
                    '& .MuiDrawer-paper': {
                        width: '200px',
                        boxSizing: 'border-box',
                        backgroundColor: '#101F33',
                        color: 'rgba(255, 255, 255, 0.7)',
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
                        sx = {{borderRadius: 5, width: '12vw', maxWidth: '150px', minWidth: '120px', justifyContent: 'center'}}
                        startIcon = {<AddIcon />}
                    >
                        <Typography sx= {{fontSize: '16px', fontWeight: '600'}}> Create </Typography>
                    </Button>
                </Box>
            </Drawer>
            <Outlet />
        </Box>
    );
};

export default Navbar