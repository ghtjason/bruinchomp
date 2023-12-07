import React from 'react'
import Searchbar from '../components/Searchbar'
import Post from '../components/Post'
import { Stack, Box, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { proxy_server } from '../utils/constants'

const Searched = () => {
  const location = useLocation();
  const queryParams =  new URLSearchParams(location.search);
  const searchTerm = queryParams.get('key');
//   const userTerm = queryParams.get('user');
//   const hallTerm = queryParams.get('hall');
//   const mealTerm = queryParams.get('meal');
//   const orderTerm = queryParams.get('order');
//   const matchTerm = queryParams.get('match');
  //const {searchTerm} = useParams();
  const [searchedPosts, setSearchedPosts] = useState([])

  useEffect(() => {

    const search = async () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${proxy_server}/posts/search?${queryParams}`,
        headers: { 
        }
      };
      await axios.request(config)
      .then((response) => {
        if(response.data.length > 0) {
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
  }, [searchTerm])
 
  return (
    <Stack sx= {{ width: '100vw', mt: 2}}>
      <Stack direction="row" sx={{justifyContent: 'space-between', mr: 10, ml: 5}}> 
        <Typography mb={2} variant="h5" fontWeight={"bold"}>
          Showing search results for <span style ={{color:'#FF0000'}}>{searchTerm ? searchTerm.replace('=', ': ') : ''}</span>
        </Typography>
        <Box>
          <Searchbar/>
        </Box>
      </Stack>

      <Stack spacing={2} mt={3} sx={{alignItems:'center'}}>
          {searchedPosts.map((posts) => (
            <div key={posts.id}>
              <Post post={posts}/>
            </div>
          ))}                 
      </Stack>

    </Stack>
  ) 
}

export default Searched