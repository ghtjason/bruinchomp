import React, { useEffect } from 'react'
import { Card, Typography, CardContent, Button, Stack, IconButton } from '@mui/material'
import { useState } from 'react';
import axios from 'axios'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUp from '@mui/icons-material/ThumbUp';
import { auth_token } from '../utils/constants';

const Post = ({post}) => {

  const [liked, setLiked] = useState(post.is_liked);
  const [count, setCount] = useState(post.like_count);

  const handleLikeClick = () => {
    
    let method = 'post'
    if (liked) {
      method = 'delete'
      setCount(count - 1)
    }
    else {
      setCount(count + 1)
    }
    setLiked(!liked)
    let config = {
    method: `${method}`,
    maxBodyLength: Infinity,
    url: `https://api-m46o.onrender.com/posts/${post.id}/likes`,
    headers: { 
      'Authorization': auth_token
    }
   };
    axios.request(config)
  }

  return (
    <Card sx={{ width: '50vw', maxWidth: 900, minWidth: 600, boxShadow: 3, border: 1 }}>
      <CardContent>
        <Typography>{post.title}</Typography>
        <Typography>{post.meal_period}</Typography>
        <Typography>{post.hall}</Typography>
        <Typography>{post.timestamp}</Typography>
      </CardContent>
      <img
        src={post.image_url}
        alt={post.title}
        style={{width:'50vw', maxWidth: 900, minWidth: 600}}
      />
      <CardContent>
        <Typography>{post.author_username}</Typography>
        <Typography>{post.content}</Typography>
        <Stack direction="row" mt={1} spacing={1}>
          <Button variant="outlined">Comment</Button>
          {/* <Button variant="outlined" onClick={likePost}>{post.like_count} Likes</Button>
          <Button variant="outlined" onClick={unlikePost}>{post.like_count} Likes</Button> */}
          {/* <IconButton onClick={likePost} color='primary'>
            <ThumbUpIcon/>
          </IconButton>
          <Typography></Typography> */}
          <Button onClick={handleLikeClick} variant={liked ? 'contained' : 'outlined'}>
            <ThumbUpOffAltIcon sx={{marginRight: 1}}/>{count} Likes
          </Button>
        </Stack>
      </CardContent>

    </Card>
  )
}

export default Post