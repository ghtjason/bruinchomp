import React from 'react'
import { Stack, Typography, Avatar, Button, Card, CardContent, TextField } from '@mui/material'
import { useState, useEffect } from 'react'
import { fetchPosts } from '../utils/fetchPosts'
import { fetchUserInfo, fetchUsernameInfo } from '../utils/fetchUserInfo'
import Post from '../components/Post'
import Cookies from 'js-cookie'; // cookiessssss
import axios from "axios";
import { uploadImage } from '../utils/uploadImage'
import { proxy_server } from '../utils/constants'
import { useParams } from 'react-router-dom'


// function to check if username is found yet. If so, it sets posts.
const Profile = () => {
  const authToken = Cookies.get('authToken');
  const {user} = useParams();
  let loggedIn = false;

  const [viewingSelf, setViewingSelf] = useState(!user)
  const [userExists, setUserExists] = useState(true)
  const [posts, setPosts] = useState(null);
  const [username, setUsername] = useState([]);
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [pfpEdited, setPfpEdited] = useState(false);
  const [pfp_url, setPfp_url] = useState("");
  const [editMode, setEditMode] = useState(false);
  useEffect(() => { // fixes bug when clicking 'profile' button when viewing someone else's profile
    setPosts(null)
  }, [user])

  const initializeProfile = async () => {
    if (user) {
      await fetchUsernameInfo(user).then(result => {
        if (result.username === undefined) {
          setUserExists(false)
        }
        else {
          setUsername(result.username)
          setBio(result.bio)
          setPfp_url(result.profile_image_url)
        }
      })
    }
    if (authToken) {
      await fetchUserInfo(authToken).then(result => {
        if (!user) {
          setUsername(result.username)
          setBio(result.bio)
          setPfp_url(result.profile_image_url)
        }
        setViewingSelf(username === result.username)
      })
      fetchPosts(username, authToken).then(result => {
        if(result) setPosts(result);
      })
    }
    else {
      fetchPosts(username).then(result => {
        if(result) setPosts(result);
      })
    }
  }


  if (!posts) {
    initializeProfile();
  }
  if (authToken) {
    loggedIn = true;
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
      width: '140px',
      height: '140px',
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
  if((loggedIn && viewingSelf) || (user && userExists)) {
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
                  <Button disabled={!viewingSelf} variant="outlined" color="primary" onClick={() => setEditMode(true)}>Edit Profile</Button>
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
                    accept="image/png, image/jpg, image/jpeg"
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
  else if (user && !userExists) {
    pageContent =
    <Typography>No user found.</Typography>
  }
  else {
    pageContent =
      <Typography>Please log in first!</Typography>
  }

  return pageContent;
};

export default Profile;