import React from 'react'
import Searchbar from '../components/Searchbar'
import Post from '../components/Post'
import { Stack, Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const SearchFeed = ({key, term}) => {
  const {searchTerm} = useParams();
  const [searchedPosts, setSearchedPosts] = useState([])

  useEffect(() => {

    const search = async () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api-m46o.onrender.com/posts/search?${searchTerm}`,
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

export default SearchFeed