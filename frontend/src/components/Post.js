import React, { useEffect } from 'react'
import { Card, Typography, CardContent, Button, Stack, IconButton, TextField, InputAdornment } from '@mui/material'
import { useState } from 'react';
import axios from 'axios'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import SendIcon from '@mui/icons-material/Send';
import Cookies from 'js-cookie';

const Post = ({post}) => {

  const [liked, setLiked] = useState(post.is_liked);
  const [count, setCount] = useState(post.like_count);
  const [comments, setComments] = useState([]);
  const [commentsShown, setCommentsShown] = useState(false)
  const [commentText, setCommentText] = useState('');
  let disabled = true;

  // can't like or comment when not logged in
  const authToken = Cookies.get('authToken');
  if(authToken) {
    disabled = false;
  } 
  else {
    disabled = true;
  }

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
      'Authorization': `Bearer ${authToken}`
    }
   };
    axios.request(config)
  }

  const addCommentWithKey = (e) => {
    if(e.key === 'Enter') {
      e.preventDefault()
      addComment()
    }
  }

  const addComment = () => {
    if(commentText.trim() === '') {
      setCommentText('')
      return
    }
    let data = JSON.stringify({
      "content": `${commentText}`
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://api-m46o.onrender.com/posts/${post.id}/comments`,
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${authToken}`
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
    setCommentText('')
  }

  const getComments = async () => {
    if(commentsShown) {
      setComments([])
    }
    else {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api-m46o.onrender.com/posts/${post.id}/comments`,
        headers: { }
      };
      
      await axios.request(config)
      .then((response) => {
        if(response.data.length > 0) {
          setComments(response.data)
        }
        else {
          setComments([{id: -1, content: 'No comments found'}])
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
    setCommentsShown(!commentsShown)
  }

  return (
    <Card sx={{ width: '50vw', maxWidth: 900, minWidth: 600, boxShadow: 10, border: 1, boxSizing: 'border-box'}}>
      <CardContent>
        <Typography>{post.title}</Typography>
        <Typography>{post.hall} {post.meal_period}</Typography>
        <Typography>{post.timestamp}</Typography>
      </CardContent>
      <img
        src={post.image_url}
        alt={post.title}
        style={{width:'50vw', maxWidth: 900, minWidth: 600, maxHeight: 900, minHeight: 300}}
      />
      <CardContent>
        <Stack direction="row" sx={{alignItems: 'center', mb: 1}}>
          <Button
            sx = {{
              borderRadius: "50%",
              width: 60,
              height: 60,
            }}
          >
            <img 
              src={post.author_profile_image_url}
              alt={`${post.author_username} profile`}
              style={{
                borderRadius: "50%",
                width: 50,
                height: 50,
                display: "block"
              }}
            />
          </Button>
          <Typography ml={1}>{post.author_username}</Typography>
        </Stack>
        <Typography>{post.content}</Typography>

        <TextField
          id="add comment"
          label="Add comment..."
          onKeyDown={addCommentWithKey}
          value={commentText || ''}
          onChange={(e) => setCommentText(e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton onClick={addComment} disabled = {disabled}>
                <SendIcon/>
              </IconButton>
            </InputAdornment>,
          }}
          variant="standard"
          multiline
          disabled = {disabled}
          sx = {{width: '50ch'}}
        />

        <Stack direction="row" mt={1} spacing={1} alignItems={'center'}>
          <Button disabled={disabled} onClick={handleLikeClick} variant={liked ? 'contained' : 'outlined'}>
            <ThumbUpOffAltIcon sx={{marginRight: 1}}/>{count} Likes
          </Button>
          <Button variant="outlined" onClick={getComments}>{commentsShown ? 'hide' : 'show'} comments</Button>
          <Typography ml={1} color={'red'}>{disabled ? 'Please log in to like or comment!' : ''}</Typography>
        </Stack>

        <Stack mt={1}>
          {comments.map((comment) => (
            <div key={comment.id}>
              <Stack direction="row">
                <img 
                  src={comment.author_profile_image_url}
                  alt={`${comment.author_username} profile`}
                  style={{
                    borderRadius: "50%",
                    width: 25,
                    height: 25,
                    display: "block"
                  }}
                />
                <Typography>{comment.author_username}{comment.id === -1 ? '' : ': '}{comment.content}</Typography>
              </Stack>
            </div>
          ))}
        </Stack>
      </CardContent>

    </Card>
  )
}

export default Post