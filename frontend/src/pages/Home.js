import React from 'react';
import Post from '../components/Post';
import { Stack, Typography } from '@mui/material'
import { useState, useEffect } from "react";
import FilterMenu from '../components/FilterMenu'

import Searchbar from '../components/Searchbar';
import { dining_hall, meal_period } from '../utils/constants';
import Cookies from 'js-cookie';

import axios from 'axios';

const Home = () => {

  let authID = ""
  // fetch posts with authToken if logged in (for likes)
  const authToken = Cookies.get('authToken');
  if(authToken) {
    authID = `Bearer ${authToken}`
  } 

  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState('Loading posts...')

  useEffect(() => {
    const fetchPosts = async () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api-m46o.onrender.com/posts',
        headers: { 
          'Authorization': authID
        }
      };
      try {
          const response = await axios.request(config);
          if(response.data.length > 0)
              setPosts(response.data);
          setLoaded('')
      } 
      catch (error) {
        console.log('Error:', error);
        setPosts([])
      }
    };
    fetchPosts();
  }, [authID])

  const [categories, setCategories] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    const handleFilter = () => {
      if (categories.length === 0) {
        setFilteredPosts(posts)
      }
      else {  
        const filteredPosts = posts.filter((post) => {
          let onlyDiningHalls = true
          let onlyMealPeriods = true
          for (var i in categories) {
            if(dining_hall.includes(categories[i])) {
              onlyMealPeriods = false
            }
            if(meal_period.includes(categories[i])) {
              onlyDiningHalls = false
            }
          }
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
    <Stack sx= {{ width: '100vw', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
      <div className="Posts">
        <Stack direction="row" sx={{width: '50vw', maxWidth: 900, minWidth: 600, justifyContent: 'space-between', mb: 2}}>
          <FilterMenu categories={categories} setCategories={setCategories}/>
          <Searchbar/>
        </Stack>
        <Typography sx={{fontWeight: 'bold', fontSize: '28px'}}>{loaded}</Typography>
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

export default Home