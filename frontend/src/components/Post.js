import React from 'react'
import { Card, Typography, CardContent, Button, Stack, IconButton, TextField, InputAdornment, Chip } from '@mui/material'
import { useState } from 'react';
import axios from 'axios';
import { proxy_server } from '../utils/constants';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Post = ({post}) => {

  const [liked, setLiked] = useState(post.is_liked);
  const [count, setCount] = useState(post.like_count);
  const [comments, setComments] = useState([]);
  const [commentsShown, setCommentsShown] = useState(false)
  const [commentText, setCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false)
  let disabled = true;

  // can't like or comment when not logged in
  const authToken = Cookies.get('authToken');
  if(authToken) {
    disabled = false;
  } 
  else {
    disabled = true;
  }

  const navigate = useNavigate();

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
    url: `${proxy_server}/posts/${post.id}/likes`,
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
      url: `${proxy_server}/posts/${post.id}/comments`,
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${authToken}`
      },
      data : data
    };
    
    axios.request(config)
    .then(() => {
      setCommentSuccess(true)
      const timeoutId = setTimeout(() => {
        setCommentSuccess(false);
        }, 3000);

        return () => clearTimeout(timeoutId);
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
        url: `${proxy_server}/posts/${post.id}/comments`,
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
        <Stack direction="row" sx={{justifyContent: 'space-between', mr: 1}}>
          <Typography sx={{fontWeight: 'bold', fontSize: '24px'}}>{post.title}</Typography>
          <Typography sx={{fontWeight: 'bold', fontSize: '18px'}}>{post.timestamp.slice(0, 10)}</Typography>
        </Stack>
        <Stack direction="row" spacing={1} sx={{mt: 1, mb: 1}}>
          <Chip icon={<LocationOnIcon/>} label={post.hall}/>
          <Chip icon={<AccessTimeIcon/>} label={post.meal_period}/>
        </Stack>
      </CardContent>
      <img
        src={post.image_url}
        alt={post.title}
        style={{width:'50vw', maxWidth: 900, minWidth: 600, maxHeight: 900, minHeight: 300}}
      />
      <CardContent>
        <Stack direction="row" sx={{alignItems: 'center', mb: 1}}>
          <Button
            onClick={() => navigate(`/profile/${post.author_username}`)}
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
          <Typography ml={1} sx = {{fontWeight: 'bold', fontSize: '20px'}}>{post.author_username}</Typography>
        </Stack>
        <Typography sx={{fontSize: '16px'}}>{post.content}</Typography>

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
          <Typography ml={1} color={'green'}>{commentSuccess ? 'Success!' : ''} </Typography>
        </Stack>

        <Stack mt={1} spacing={1}>
          {comments.map((comment) => (
            <div key={comment.id}>
              <Stack direction="row" alignItems={"flex-start"}>
                <Button
                  onClick={() => navigate(`/profile/${comment.author_username}`)}
                  sx = {{
                    borderRadius: "50%",
                    minWidth: 25,
                    minHeight: 20,
                    mr: 0.5
                  }}
                >
                  <img 
                    src={comment.author_profile_image_url}
                    alt={`${comment.author_username} profile`}
                    style={{
                      borderRadius: "50%",
                      width: 25,
                      height: 25,
                      display: comment.id === -1 ? "none" : "block"
                    }}
                  />
                </Button>
                <Typography width={750} mt={0.7}><b>{comment.author_username}</b>{comment.id === -1 ? '' : ': '}{comment.content}</Typography>
              </Stack>
            </div>
          ))}
        </Stack>
      </CardContent>

    </Card>
  )
}

export default Post