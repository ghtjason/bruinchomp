import React from 'react';
import Post from '../components/Post';
import { Stack, Typography } from '@mui/material'
import { useState, useEffect } from "react";
import FilterMenu from '../components/FilterMenu'

import Searchbar from '../components/Searchbar';
import { dining_hall, meal_period } from '../utils/constants';
import Cookies from 'js-cookie';

import axios from 'axios';
import SearchAndFilterBar from '../components/SearchAndFilterBar';

const Home = () => {

  let authID = ""
  // fetch posts with authToken if logged in (for likes)
  const authToken = Cookies.get('authToken');
  if (authToken) {
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
        if (response.data.length > 0)
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

  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [hallFilter, setHallFilter] = useState('');
  const [mealFilter, setMealFilter] = useState('');

  useEffect(() => {
    const handleFilter = () => {
      let filteredPosts = posts;
      if (hallFilter) {
        if (hallFilter === 'All') {
          filteredPosts = filteredPosts;
        } else {
          const hallPosts = posts.filter((post) => {
            return (post.hall.toLowerCase() === hallFilter.toLowerCase());
          })
          filteredPosts = filteredPosts.filter((post) => hallPosts.includes(post));
        }
      }
      if (mealFilter) {
        if (mealFilter === 'All') {
          filteredPosts = filteredPosts;
        } else {
          const mealPosts = posts.filter((post) => {
            return (post.meal_period.toLowerCase() === mealFilter.toLowerCase());
          })
          filteredPosts = filteredPosts.filter((post) => mealPosts.includes(post));
        }
      }
      setFilteredPosts(filteredPosts);
    }
    handleFilter()
  }, [hallFilter, mealFilter, posts])

  return (
    <Stack sx={{ width: '100vw', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
      <div className="Posts">
        <Stack direction="row" sx={{ width: '50vw', maxWidth: 900, minWidth: 600, justifyContent: 'space-between', mb: 2 }}>
          <SearchAndFilterBar hallFilter={hallFilter} setHallFilter={setHallFilter} mealFilter={mealFilter} setMealFilter={setMealFilter} />
        </Stack>
        <Typography sx={{ fontWeight: 'bold', fontSize: '28px' }}>{loaded}</Typography>
        <Stack spacing={2} mt={3} sx={{ alignItems: 'center' }}>
          {filteredPosts.map((posts) => (
            <div key={posts.id}>
              <Post post={posts} />
            </div>
          ))}
        </Stack>
      </div>
    </Stack>
  )
}

{/* <FilterMenu categories={categories} setCategories={setCategories}/> 
<Searchbar/>*/}

export default Home
