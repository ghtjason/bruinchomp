import React from 'react'
import { Card, Typography, CardContent, Button, Stack } from '@mui/material'

const Post = ({post}) => {
  console.log(post)
  return (
    <Card sx={{ width: '50vw', maxWidth: 900, minWidth: 600, border: "none", boxShadow: 3 }}>
      <CardContent>
        <Typography>{post.title}</Typography>
      </CardContent>
      <img
        src={post.image_url}
        alt={post.title}
        style={{width:'50vw', maxWidth: 900, minWidth: 600}}
      />
      <CardContent>
        <Typography>{post.author_username}</Typography>
        <Typography>{post.content}</Typography>
        <Stack direction="row" mt={1}>
          <Button variant="outlined">Comment</Button>
          <Button variant="outlined">Like</Button>
          <Button variant="outlined">Save</Button>
        </Stack>
      </CardContent>

    </Card>
  )
}

export default Post