import { useState } from "react";
import "../index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  Card,
  Stack,
  Box,
} from "@mui/material";
import Cookies from "js-cookie"; // cookiessssss
import { uploadImage } from '../utils/uploadImage'
import { proxy_server } from "../utils/constants";
import Post from "../components/Post";
import { fetchUserInfo } from "../utils/fetchUserInfo";

const Create = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [dininghall, setDininghall] = useState("");
  const [body, setBody] = useState("");
  const [mealPeriod, setMealperiod] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [image_url, setImage_url] = useState("");
  const [author_username, setAuthorUsername] = useState("");
  const [pfp_url, setPfpUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  console.log(image);

  const authToken = Cookies.get("authToken");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const authToken = Cookies.get("authToken");
    e.preventDefault();

    if (!title) {
      setErrorMsg("Title Field is required");
      return;
    }
    if (!dininghall) {
      setErrorMsg("Dining hall is required");
      return;
    }
    if (!mealPeriod) {
      setErrorMsg("Meal Period Field is required");
      return;
    }
    if (!body) {
      setErrorMsg("Content body is required");
      return;
    }

    //Wait for the image to be uploaded so the link to image is valid
    //Before trying to create a post object
    const uploadedImageUrl = await uploadImage(e, image, authToken, setImage_url, setErrorMsg);

    if(!uploadedImageUrl) return;

    let data = JSON.stringify({
      title: title,
      content: body,
      image_url: uploadedImageUrl,
      hall: dininghall,
      meal_period: mealPeriod,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${proxy_server}/posts`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      data: data,
    };

    try {
      console.log(config);
      const response = await axios.request(config);
      console.log(dininghall);
      console.log(JSON.stringify(response.data));
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error during request setup:", error.message);
      }
      console.log("Error config:", error.config);
    }
    setTitle("");
    setImage("");
    setDininghall("");
    setMealperiod("");
    setBody("");
    navigate("/home");
  };

  if(authToken) {
    fetchUserInfo(authToken).then(result => {
      setAuthorUsername(result.username)
      setPfpUrl(result.profile_image_url)
    })
  }

  console.log(image)
  const post = {
    hall: dininghall,
    meal_period: mealPeriod,
    author_username: author_username,
    image_url: imagePreview,
    title: title,
    content: body,
    timestamp: Date(),
    author_profile_image_url: pfp_url,
  }


  if (authToken) {
    return (
      <Stack direction="row" sx={{width: '75vw', justifyContent: 'space-between', alignItems: 'center'}}>
        <Box>
          <div className="createPost">
            <Typography sx={{fontWeight: 'bold', fontSize: '32px'}}>Create new post</Typography>
            <Typography color='red'>{errorMsg}</Typography>
            <form className="createForm">
              <div className="formGroup">
                <Typography fontWeight={'bold'}>Post title</Typography>
                <TextField
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  fullWidth
                />
              </div>
              <div className="formGroup">
                <FormControl>
                  <InputLabel id="dining Hall">Dining Hall</InputLabel>
                  <Select
                    labelId="dining hall"
                    value={dininghall}
                    onChange={(e) => setDininghall(e.target.value)}
                    label="Dining Hall"
                    sx={{width: 300}}
                  >
                    <MenuItem value="Bruin Plate">Bruin Plate</MenuItem>
                    <MenuItem value="Epicuria">Epicuria</MenuItem>
                    <MenuItem value="De Neve">De Neve</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="formGroup">
                <FormControl>
                  <InputLabel id="Category">Meal Period</InputLabel>
                  <Select
                    label="Meal Period"
                    value={mealPeriod}
                    onChange={(e) => setMealperiod(e.target.value)}
                    sx={{width: 300}}
                  >
                    <MenuItem value="Breakfast">Breakfast</MenuItem>
                    <MenuItem value="Lunch">Lunch</MenuItem>
                    <MenuItem value="Dinner">Dinner</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="formGroup">
                <Typography fontWeight={'bold'}>Post content</Typography>
                <TextField
                  type="text"
                  required
                  multiline
                  value={body}
                  maxRows={5}
                  style = {{width: 300}}
                  onChange={(e) => setBody(e.target.value)}
                />
              </div>
              <div className="formGroup">
                <Typography fontWeight={'bold'}>Upload Image</Typography>
                <input
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    setImagePreview(URL.createObjectURL(e.target.files[0]));
                  }}
                />
              </div>
            </form>
            <Button variant="outlined" onClick={handleSubmit}>
              Add Post
            </Button>
          </div>
        </Box>
        <Stack spacing={1}>
          <Typography sx={{fontWeight: 'bold', fontSize: '32px'}}>Post Preview: </Typography>
          <Post post={post} in_create={true}/>
        </Stack>
      </Stack>
    );
  } else {
    return <Typography>Please log in first!</Typography>;
  }
};

export default Create;
