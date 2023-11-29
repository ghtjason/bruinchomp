import React from 'react';
import Post from './Post';
import { Box, Stack, Button, Menu, MenuItem } from '@mui/material'
import { useState, useEffect } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { fetchPosts } from '../utils/fetchPosts';


 const Feed = () => {

    // const [posts, setPosts] = useState(
    //     [
    //         {title: 'Bruin Plate', category: 'Bruin_Plate', body: 'lorem iosum', Post_image: 'https://bruinplate.hh.ucla.edu/img/Home_Slide_MOC.jpg', author: 'Bob', id: 1},
    //         {title: 'Epicuria', category: 'Epicuria', body: 'lorem iosum', Post_image: 'https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_EpicuriaAckerman2.png', author: 'John', id: 2},
    //         {title: 'De Neve', category: 'De_Neve', body: 'lorem iosum', Post_image: 'https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_DeNeve.png', author: 'Smith', id: 3}    
    //     ]
    // )
    const [posts, setPosts] = useState([])
    const [category, setCategory] = useState('No_filter')
    const [filteredPosts, setFilteredPosts] = useState(posts)

    useEffect(() => {
        fetchPosts().then(result => {
            setPosts(result)
        })
    }, [])

    // code to implement the Menu logic
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleChoiceSelect = (dining_hall) => {
        setCategory(dining_hall);
        setAnchorEl(null);
    };
    // putting handleFilter inside useEffect, only call when category or post changes
    useEffect(() => {
        const handleFilter = () => {
            // console.log(category)
            if (category === 'No_filter')
            {
                setFilteredPosts(posts)
            }
            else
            {
                const filteredPosts = posts.filter((post) => post.category === category)
                setFilteredPosts(filteredPosts)    
            }
        }
        handleFilter()
    }, [category, posts])

    return (
        <Stack>
        
        <div className="Posts">
            <Box>
                <Button
                    onClick={handleMenuClick}
                    variant = "outlined"
                    sx={{height: 35}}
                >
                    Filter Dining Halls<ArrowDropDownIcon/>
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => handleClose(category)}
                >
                    <MenuItem onClick={() => handleChoiceSelect("Bruin_Plate")}>Bruin Plate</MenuItem>
                    <MenuItem onClick={() => handleChoiceSelect("Epicuria")}>Epicuria</MenuItem>
                    <MenuItem onClick={() => handleChoiceSelect("De_Neve")}>De Neve</MenuItem>
                    <MenuItem onClick={() => handleChoiceSelect("No_filter")}>None</MenuItem>
                </Menu> 
            </Box>

            
            <Stack >
                {filteredPosts.map((posts) => (
                    <div className="post-preview" key={posts.id}>
                        <Post post={posts}/>
                    </div>
                ))}
            </Stack>

        </div>
        </Stack>
    )
}

export default Feed