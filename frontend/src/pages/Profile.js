import React from 'react'
import { Stack, Box, Typography } from '@mui/material'
import Feed from '../components/Feed'
import { useState, useEffect } from 'react'
import { fetchPosts } from '../utils/fetchPosts'
import Post from '../components/Post'

const Profile = () => {
  const [posts, setPosts] = useState([]);
  //search for user later
  useEffect(() => {
    fetchPosts('').then(result => {
      setPosts(result)
    })
  }, [])

  return (
    <Stack sx= {{ width: '100vw', justifyContent: 'space-between', alignItems: 'center', mt: 2}}>
      <Typography>User Profile</Typography>
      <div className="Posts">
        <Stack spacing={2} mt={3} sx={{alignItems:'center'}}>
          {posts.map((posts) => (
            <div key={posts.id}>
              <Post post={posts}/>
            </div>
          ))}
        </Stack>
      </div>
    </Stack>
  )
}

export default Profile