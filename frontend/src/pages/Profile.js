import React from 'react'
import { Stack, Box, Typography, Avatar, Button, Card, CardContent, TextField } from '@mui/material'
import { useState, useEffect } from 'react'
import { fetchPosts } from '../utils/fetchPosts'
import { fetchUserInfo } from '../utils/fetchUserInfo'
import Post from '../components/Post'
import Cookies from 'js-cookie'; // cookiessssss
import axios from "axios";

// function to check if username is found yet. If so, it sets posts.
const Profile = () => {
  const authToken = Cookies.get('authToken');
  let loggedIn = false;

  // if logged in, fetch posts & user info
  const [posts, setPosts] = useState(null);
  const [username, setUsername] = useState([]);
  const [bio, setBio] = useState('');
  const [editMode, setEditMode] = useState(false);

  if (authToken) {
    loggedIn = true;
  }
  useEffect(() => {
    if(loggedIn) {
      fetchUserInfo(authToken).then(result => {
        setUsername(result.username)
        setBio(result.bio)
      })
    }
  }, [])

  // this function assigns posts only once username is found & runs until username is found & posts is assigned
  function checkAndExecute() {
    if (username != '') {
      console.log("username found: " + username);
      fetchPosts(username, authToken).then(result => {
        console.log(result);
        if(result) setPosts(result);
      })
    } else {
      setTimeout(checkAndExecute, 100); // check again after 100 milliseconds
    }
  }

  if(posts == null) checkAndExecute();

  const handleEdit = (event) => {
    // Update the bio as the user types
    setBio(event.target.value);
  };

  const updateProfile = async (e) => {
    let data = JSON.stringify({
      "bio": bio
    });

    let config = {
      method: "PATCH",
      url: "https://api-m46o.onrender.com/users",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + authToken
      },
      data: data,
    };

    await axios.request(config) // await for request to send
    window.location.reload(); // reload the page
  }

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
    bioBox: {
      marginTop: '8px',
      width: '200%',
    }
  };

  console.log(editMode)

  // return
  let pageContent;
  if(loggedIn) {
    if(!editMode) { // what to display outside edit mode
      pageContent =
        <Stack sx= {{ width: '100vw', justifyContent: 'space-between', alignItems: 'center', mt: 2}}>
            <Card style={profileStyles.profileCard}>
              <div style={profileStyles.avatarContainer}>
                <Avatar alt="Placeholder" src="path_to_pfp.jpg" style={profileStyles.avatar} /> 
              </div>

              <CardContent>
                <div style={profileStyles.header}>
                  <Typography variant="h4">{username}</Typography>
                  <Button variant="outlined" color="primary" onClick={() => setEditMode(true)}>Edit Profile</Button>
                </div>

                <Typography variant="body1">Posts: {posts ? posts.length : 0}</Typography> {/* POST COUNT */}

                <Typography variant="body2" style={profileStyles.bio}>
                  {bio}
                </Typography>
              </CardContent>
            </Card>

            {/* POSTS */}
              <div className="Posts">
                <Stack spacing={2} mt={3} sx={{alignItems:'center'}}>
                  <Typography>
                    {(!posts ? 'No Posts Yet!' : '')}
                  </Typography>
                  {(posts ? (posts.map((posts) => (
                    <div key={posts.id}>
                      <Post post={posts}/>
                    </div>
                  ))) : '')}
                </Stack>
              </div>
            </Stack>
    }
    else { // what to display in edit mode
      pageContent =
        <Stack sx= {{ width: '100vw', justifyContent: 'space-between', alignItems: 'center', mt: 2}}>
            <Card style={profileStyles.profileCard}>
              <div style={profileStyles.avatarContainer}>
                <Avatar alt="Placeholder" src="path_to_pfp.jpg" style={profileStyles.avatar} /> 
              </div>

              <CardContent>
                <div style={profileStyles.header}>
                  <Typography variant="h4">{username}</Typography>
                  <Button variant="outlined" color="primary" onClick={() => updateProfile()}>Save Changes</Button>
                </div>

                <Typography variant="body1">Posts: {posts ? posts.length : 0}</Typography> {/* POST COUNT */}

                <TextField style={profileStyles.bioBox}
                  label="Update Bio"
                  variant="outlined"
                  multiline
                  rows={2}
                  value={bio}
                  onChange={handleEdit}
                  fullWidth
                />
              </CardContent>
            </Card>

            {/* POSTS */}
              <div className="Posts">
                <Stack spacing={2} mt={3} sx={{alignItems:'center'}}>
                  <Typography>
                    {(!posts ? 'No Posts Yet!' : '')}
                  </Typography>
                  {(posts ? (posts.map((posts) => (
                    <div key={posts.id}>
                      <Post post={posts}/>
                    </div>
                  ))) : '')}
                </Stack>
              </div>
            </Stack>
    }
  }
  else {
    pageContent =
      <Typography>Please log in first!</Typography>
  }

  return pageContent;
};

export default Profile;