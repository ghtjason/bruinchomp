import React from 'react'
import { Stack, Box, Typography, Avatar, Button, Card, CardContent } from '@mui/material'
import { useState, useEffect } from 'react'
import { fetchPosts } from '../utils/fetchPosts'
import { fetchUserInfo } from '../utils/fetchUserInfo'
import Post from '../components/Post'
import Cookies from 'js-cookie'; // cookiessssss

const Profile = () => {
  const authToken = Cookies.get('authToken');
  let loggedIn = false;
  let userInfo;

  // if logged in, fetch posts & user info
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState([]);
  if (authToken) {
    userInfo = fetchUserInfo(authToken);
    loggedIn = true;
    console.log(userInfo.username);
  }
  useEffect(() => {
    if(loggedIn) {
      fetchUserInfo(authToken).then(result => {
        setUsername(result.username)
      })
    }
  }, [])

  useEffect(() => {
    fetchPosts('').then(result => {
      setPosts(result)
    })
  }, [])


  //search for user later
  


  // css
  const profileStyles = {
    profileCard: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '16px',
      width: '50%',
      height: '200px',
    },
    avatarContainer: {
      height: '100%',
      alignItems: 'center',
      paddingLeft: '16px',
      paddingTop: '20px',
      justifyContent: "center",
    },
    avatar: {
      width: '160px',
      height: '160px',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px', 
    },
    bio: {
      marginTop: '16px',
      overflowWrap: 'break-word',
      width: '85%',
    },
  };

  // return
  if(loggedIn) {
  return (
    <Stack sx= {{ width: '100vw', justifyContent: 'space-between', alignItems: 'center', mt: 2}}>
        {/* PROFILE ELEMENTS: replace contents with user specific info */}
        <Card style={profileStyles.profileCard}>
          <div style={profileStyles.avatarContainer}>
            <Avatar alt="Placeholder" src="path_to_pfp.jpg" style={profileStyles.avatar} /> 
          </div>

          <CardContent>
            <div style={profileStyles.header}>
              <Typography variant="h4">{username}</Typography>
              <Button variant="outlined" color="primary">Edit Profile</Button>
            </div>

            <Typography variant="body1">Posts: 10</Typography>

            <Typography variant="body2" style={profileStyles.bio}>
              this is a bio.
              this is a bio this is a bio this is a bio this is a bio.
              this is a bio this is a bio this is a bio this is a bio this is a bio this is a bio this is a bio this is a bio this is a bio
            </Typography>
          </CardContent>
        </Card>

        {/* POSTS */}
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
    );
  }
  else {
    return (
      <Typography>Please log in first!</Typography>
    )
  }
};

export default Profile;