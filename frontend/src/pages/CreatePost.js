import { useState } from "react";
import "../index.css";
import axios from "axios";
import { auth_token } from "../utils/constants";
import {
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Create = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [dininghall, setDininghall] = useState("");
  const [body, setBody] = useState("");
  const [mealPeriod, setMealperiod] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [image_url, setImage_url] = useState("");

  const uploadImage = async (e) => {
    //Process image url first
    e.preventDefault();
    if (!image) {
      setErrorMsg("Please upload an image");
      return;
    }

    const FormData = require("form-data");

    let data = new FormData();
    data.append("file", image);

    let config = {
      method: "post",
      url: "https://api-m46o.onrender.com/image",
      headers: {
        Authorization: auth_token,
      },
      data: data,
    };
    try {
      console.log(config);
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      setImage_url(response.data.url);
      console.log("image url", response.data.url);
      return response.data.url;
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mealPeriod) {
      setErrorMsg("Meal Period Field is required");
      return;
    }
    if (!title) {
      setErrorMsg("Title Field is required");
      return;
    }
    if (!dininghall) {
      setErrorMsg("Dining hall is required");
      return;
    }
    if (!body) {
      setErrorMsg("Content body is required");
      return;
    }

    //Wait for the image to be uploaded so the link to image is valid
    //Before trying to create a post object
    const uploadedImageUrl = await uploadImage(e);

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
        Authorization: auth_token,
      },
      data: data,
    };

    try {
      console.log(config);
      const response = await axios.request(config);
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
  };

  return (
    <div className="createPost">
      <h2>{errorMsg}</h2>
      <h2>Create new post</h2>
      <form className="createForm">
        <div className="formGroup">
          <label>Post title</label>
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
            <InputLabel id="dining Hall">Post Category</InputLabel>
            <Select
              labelID="dining hall"
              value={dininghall}
              onChange={(e) => setDininghall(e.target.value)}
              label="Dining Hall"
              fullWidth
            >
              <MenuItem value="Bruin_Plate">Bruin Plate</MenuItem>
              <MenuItem value="Epicuria">Epicuria</MenuItem>
              <MenuItem value="De_Neve">De Neve</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="formGroup">
          <FormControl>
            <InputLabel id="Category">Meal Period</InputLabel>
            <Select
              value={mealPeriod}
              onChange={(e) => setMealperiod(e.target.value)}
            >
              <MenuItem value="Breakfast">Breakfast</MenuItem>
              <MenuItem value="Lunch">Lunch</MenuItem>
              <MenuItem value="Dinner">Dinner</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="formGroup">
          <label>Post body</label>
          <textarea
            type="text"
            required
            value={body}
            fullWidth
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <div className="formGroup">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]);
              uploadImage(e);
            }}
          />
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload image
          </Button>
        </div>
      </form>
      <Button variant="outlined" onClick={handleSubmit}>
        Add Post
      </Button>
    </div>
  );
};

export default Create;
