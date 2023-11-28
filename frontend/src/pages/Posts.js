import React from 'react';
import { Box, Stack, Button, Menu, MenuItem } from '@mui/material'
import { useState, useEffect } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

 const Posts = () => {

    //Get from backend server later
    //Can maybe try to search by post?
    const [posts, setPosts] = useState(
        [
            {title: 'Bruin Plate', category: 'Bruin_Plate', body: 'lorem iosum', Post_image: 'https://bruinplate.hh.ucla.edu/img/Home_Slide_MOC.jpg', author: 'Bob', id: 1},
            {title: 'Epicuria', category: 'Epicuria', body: 'lorem iosum', Post_image: 'https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_EpicuriaAckerman2.png', author: 'John', id: 2},
            {title: 'De Neve', category: 'De_Neve', body: 'lorem iosum', Post_image: 'https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_DeNeve.png', author: 'Smith', id: 3}    
        ]
    )
    const [category, setCategory] = useState('No_filter')
    const [filteredPosts, setFilteredPosts] = useState(posts)
    
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
        <Stack sx ={{maxWidth: '75vw'}}>
        
        <div className="Posts">
            {/* <div className = "filter">
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Bruin_Plate">Bruin Plate</option>
                    <option value="Epicuria">Epicuria</option>
                    <option value="De_Neve">De Neve</option>
                    <option value="No_filter">None</option>
                </select>
                <button onClick={handleFilter}>Filter Posts</button>
            </div> */}
            <Box>
                <Button
                    onClick={handleMenuClick}
                    variant = "outlined"
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
            
            <Stack sx={{alignItems: 'flex-end', width: '100vw', maxWidth: 900, border:1}}>
                {filteredPosts.map((post) => (
                    <div className="post-preview" key={posts.id}>
                        <Box sx={{maxWidth: '50%', height: 'auto', alignItems: 'center'}}>
                            <h2>{post.title}</h2>
                            <div className="image"> 
                            <img
                                src={post.Post_image}
                                alt={post.title}
                                style={{ height: 500 }}
                            />
                            </div>
                            <p>{post.author}</p>
                            <p>{post.body}</p>
                            <div className="buttons">
                                <Button variant="outlined">Comment</Button>
                                <Button variant="outlined">Like</Button>
                                <Button variant="outlined">Save</Button>
                            </div>
                        </Box>
                    </div>
                ))}
            </Stack>

        </div>
        
        </Stack>
    )
}

export default Posts