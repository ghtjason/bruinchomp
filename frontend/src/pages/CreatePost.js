import { useState } from "react";
import "../index.css";
import axios from "axios";
import { auth_token } from "../utils/constants";
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
  CardContent,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Cookies from "js-cookie"; // cookiessssss
import { uploadImage } from '../utils/uploadImage'

const Create = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [dininghall, setDininghall] = useState("");
  const [body, setBody] = useState("");
  const [mealPeriod, setMealperiod] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [image_url, setImage_url] = useState("");
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
      url: "https://api-m46o.onrender.com/posts",
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
  if (authToken) {
    return (
      <Card>
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
                accept="image/*"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </div>
          </form>
          <Button variant="outlined" onClick={handleSubmit}>
            Add Post
          </Button>
        </div>
      </Card>
    );
  } else {
    return <Typography>Please log in first!</Typography>;
  }
};

export default Create;
