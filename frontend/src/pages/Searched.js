import React, { useMemo } from 'react'
import SearchAndFilterBar from '../components/SearchAndFilterBar';
import Post from '../components/Post'
import { Stack, Box, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { proxy_server } from '../utils/constants'
import Cookies from 'js-cookie';

const Searched = () => {
  const location = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const searchTerm = queryParams.get('key');

  const [searchedPosts, setSearchedPosts] = useState([])

  const hallFilterFromParams = queryParams.get('hall') || 'All';
  const mealFilterFromParams = queryParams.get('meal') || 'All';
  const orderFilterFromParams = queryParams.get('order') || 'recent';

  // Initialize state with defaults from query parameters
  const [hallFilter, setHallFilter] = useState(hallFilterFromParams);
  const [mealFilter, setMealFilter] = useState(mealFilterFromParams);
  const [orderFilter, setOrderFilter] = useState(orderFilterFromParams);

  let authID = ""
  // fetch posts with authToken if logged in (for likes)
  const authToken = Cookies.get('authToken');
  if (authToken) {
    authID = `Bearer ${authToken}`
  }

  useEffect(() => {

    const search = async () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${proxy_server}/posts/search?${queryParams}`,
        headers: {
          'Authorization': authID
        }
      };
      await axios.request(config)
        .then((response) => {
          if (response.data.length > 0) {
            setSearchedPosts(response.data)
          }
          else {
            setSearchedPosts([])
          }
        })
        .catch((error) => {
          console.log(error);
          setSearchedPosts([])
        });
    };
    search();
  }, [searchTerm, queryParams])

  return (
    <Stack sx={{ width: '100vw', mt: 2 }}>
      <Stack direction="column" sx={{ justifyContent: 'space-between', mr: 2, ml: 2, alignItems: 'center' }}>
        <Box>
          <SearchAndFilterBar hallFilter={hallFilter} setHallFilter={setHallFilter} mealFilter={mealFilter} setMealFilter={setMealFilter} orderFilter={orderFilter} setOrderFilter={setOrderFilter} />
        </Box>
        <Typography mt={1} variant="h5" fontWeight={"bold"} align="center">
          Showing search results for <span style={{ color: '#FF0000' }}>{searchTerm ? searchTerm.replace('=', ': ') : ''}</span>
        </Typography>
      </Stack>

      <Typography sx={{ mt:1, fontSize: '25px'}} align="center">{searchedPosts.length !== 0 ? '' : "No posts found :("}</Typography>

      <Stack spacing={2} mt={1} sx={{ alignItems: 'center' }}>
        {searchedPosts.map((post) => (
          <div key={post.id}>
            <Post post={post} />
          </div>
        ))}
      </Stack>

    </Stack>
  )
}

export default Searched