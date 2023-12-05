import React from 'react'
import { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Button, Stack, Typography, Box, ListItemButton} from '@mui/material';
import { useNavigate, Outlet, Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { mainNavbarItems } from '../utils/constants';

const Navbar = () => {
  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <Box>
      <Drawer
        sx={{ width: '250px', 
            '& .MuiDrawer-paper': {
              width: '250px',
              boxSizing: 'border-box',
              backgroundColor: '#FFFFFF',
        }}}
        variant="permanent"
        anchor="left"
      >
        <Box mt={3}>
          <List>
          {mainNavbarItems.map((item) => (
            <ListItemButton
                key={item.id}
                onClick={() => {
                  navigate(item.route)
                  setSelectedItem(item.id)
                }}
                sx ={{
                  backgroundColor: selectedItem === item.id ? '#dbf0fe' : 'transparent',
                  borderRadius: 20,
                  marginLeft: 1.5,
                  marginRight: 1.5,
                  marginBottom: 1,
                  '&: hover': {
                    backgroundColor: '#dbf0fe'
                  }
                }}
            >
              <ListItemText
                sx={{
                  '& span': {
                    marginLeft: '5px',
                    fontWeight: '600',
                    fontSize: '18px',
                    color: 'black'
                  }}}
                primary={item.label}
              />
            </ListItemButton>
          ))}
          </List>  
        </Box>
        

        <Box textAlign = 'center' sx = {{marginTop: 'auto', marginBottom: 3}}>
          <Button 
            variant = "contained"
            component = {Link}
            to = "/create"
            sx = {{borderRadius: 5, width: '15vw', maxWidth: '150px', minWidth: '120px'}}
            startIcon = {<AddIcon />}
          >
            <Typography sx= {{fontSize: '18px', fontWeight: '600'}}> Create </Typography>
          </Button>
        </Box>
      </Drawer>
      <Outlet />
    </Box>
  );
};

export default Navbar