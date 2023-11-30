import React from 'react';
import Post from './Post';
import { Box, Stack, Button, Menu, MenuItem } from '@mui/material'
import { useState, useEffect } from "react";
import FilterMenu from './FilterMenu';

import { fetchPosts } from '../utils/fetchPosts';
import Searchbar from './Searchbar';
import { placeholderPosts } from '../utils/constants';
import { dining_hall, meal_period } from '../utils/constants';


 const Feed = ({searchTerm}) => {

    const [posts, setPosts] = useState(placeholderPosts);

    // useEffect(() => {
    //     fetchPosts({searchTerm}).then(result => {
    //         setPosts(result)
    //     })
    // }, [searchTerm])

    const [categories, setCategories] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState(posts);

    useEffect(() => {
        const handleFilter = () => {
            console.log(categories)
            if (categories.length == 0)
            {
                setFilteredPosts(posts)
            }
            else
            {
                const filteredPosts = posts.filter((post) => {
                    let onlyDiningHalls = true
                    let onlyMealPeriods = true
                    categories.map((item) => {
                        if(dining_hall.includes(item)) {
                            onlyMealPeriods = false
                        }
                        if(meal_period.includes(item)) {
                            onlyDiningHalls = false
                        }
                    })
                    if(onlyDiningHalls) {
                        return categories.includes(post.hall)
                    }
                    else if(onlyMealPeriods) {
                        return categories.includes(post.meal_period)
                    }
                    else {
                        return categories.includes(post.hall) && categories.includes(post.meal_period)
                    }
                })
                setFilteredPosts(filteredPosts)    
            }
        }
        handleFilter()
    }, [categories, posts])

    return (
        <Stack>
            <div className="Posts">
                <Stack direction="row" sx={{width: '50vw', maxWidth: 900, minWidth: 600, justifyContent: 'space-between', mb: 2}}>
                    <FilterMenu categories={categories} setCategories={setCategories}/>
                    <Searchbar/>
                </Stack>

                <Stack spacing={2} mt={3} sx={{alignItems:'center'}}>
                    {filteredPosts.map((posts) => (
                        <div key={posts.id}>
                            <Post post={posts}/>
                        </div>
                    ))}
                </Stack>
            </div>
        </Stack>
    )
}

export default Feed