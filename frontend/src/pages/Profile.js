import React from 'react'
import { Stack, Typography, Avatar, Button, Card, CardContent, TextField } from '@mui/material'
import { useState } from 'react'
import { fetchPosts } from '../utils/fetchPosts'
import { fetchUserInfo } from '../utils/fetchUserInfo'
import Post from '../components/Post'
import Cookies from 'js-cookie'; // cookiessssss
import axios from "axios";
import { uploadImage } from '../utils/uploadImage'
import { proxy_server } from '../utils/constants'

// function to check if username is found yet. If so, it sets posts.
const Profile = () => {
  const authToken = Cookies.get('authToken');
  let loggedIn = false;

  // if logged in, fetch posts & user info
  const [posts, setPosts] = useState(null);
  const [username, setUsername] = useState([]);
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [pfpEdited, setPfpEdited] = useState(false);
  const [pfp_url, setPfp_url] = useState("");
  const [editMode, setEditMode] = useState(false);

  const initializeProfile = async (e) => {
    await fetchUserInfo(authToken).then(result => {
      setUsername(result.username)
      setBio(result.bio)
      setPfp_url(result.profile_image_url)
      console.log(result.profile_image_url)
    })
    fetchPosts(username, authToken).then(result => {
      if(result) setPosts(result);
    })
  }

  if (authToken) {
    loggedIn = true;
    if(posts == null) initializeProfile();
  }

  const handleEdit = (e) => {
    // Update the bio as the user types
    setBio(e.target.value);
  };

  const updateProfile = async (e) => {
    let data;
    if(pfpEdited) {
      const uploadedImageUrl = await uploadImage(e, image, authToken, setPfp_url, setErrorMsg);
      data = JSON.stringify({
        "profile_image_url": uploadedImageUrl,
        "bio": bio
      });
    }
    else {
      data = JSON.stringify({
        "bio": bio
      });
    }
    let config = {
      method: "PATCH",
      url: `${proxy_server}/users`,
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
      width: '20%',
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

  // return
  let pageContent;
  if(loggedIn) {
    if(!editMode) { // what to display outside edit mode
      pageContent =
        <Stack sx= {{ width: '100vw', justifyContent: 'space-between', alignItems: 'center', mt: 2}}>
            <Card style={profileStyles.profileCard}>
              <div style={profileStyles.avatarContainer}>
                <Avatar alt="Placeholder" src={pfp_url} style={profileStyles.avatar} /> 
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
                <Avatar alt="Placeholder" src={pfp_url} style={profileStyles.avatar} /> 
                <div className="formGroup" style={{width: '10%'}}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if(!image) setImage(e.target.files[0])
                      setPfpEdited(true)
                    }}
                  />
                </div>
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