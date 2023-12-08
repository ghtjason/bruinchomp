import React from 'react'
import { Card, Typography, CardContent, Button, Stack, IconButton, TextField, InputAdornment, Chip } from '@mui/material'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Message = ({message}) => {


  const navigate = useNavigate();

  return (
    <Card sx={{ width:'50vw', boxShadow: 10, border: 1, boxSizing: 'border-box'}}>
      <CardContent>
            <div key={message.id}>
              <Stack direction="row" alignItems={"flex-start"}>
                <Button
                  onClick={() => navigate(`/profile/${message.sender_username}`)}
                  sx = {{
                    borderRadius: "50%",
                    mr: 1
                  }}
                >
                  <img 
                    src={message.sender_profile_image_url}
                    alt={`${message.sender_username} profile`}
                    style={{
                      borderRadius: "50%",
                      width: 50,
                      height: 50,
                      display: message.id === -1 ? "none" : "block"
                    }}
                  />
                </Button>
                <Stack direction="row" sx={{justifyContent: 'space-between', mr: 1, width: '45vw'}}>
                  <Stack direction="row">
                    <Typography sx={{ mt: 0.7, wordWrap: "break-word", mr: 1}}>
                      <b>{message.sender_username}</b>
                    </Typography>
                    <Typography sx={{ width: '32vw', mt: 0.7, wordWrap: "break-word"}}>
                      {message.content}
                    </Typography>
                  </Stack>
                  <Typography sx={{fontWeight: 'bold', fontSize: '16px', ml: 1}}>{message.timestamp.slice(0, 10)}</Typography>
                </Stack>

              </Stack>
            </div>
      </CardContent>
    </Card>
  )
}

export default Message
