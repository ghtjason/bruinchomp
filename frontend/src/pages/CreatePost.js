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
import { styled } from "@mui/material/styles";
import { CompareSharp } from "@mui/icons-material";

const Create = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [dininghall, setDininghall] = useState("");
  const [body, setBody] = useState("");
  const [mealPeriod, setMealperiod] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const uploadImage = async (e) => {
    //Process image url first
    e.preventDefault();
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
    console.log("worked");
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!mealPeriod) {
      setErrorMsg("Meal Period Field is required");
    }
    if (!title) {
      setErrorMsg("Title Field is required");
    }
    if (!dininghall) {
      setErrorMsg("Dining hall is required");
    }
    if (!body) {
      setErrorMsg("Content body is required");
    }
    if (!image) {
      setErrorMsg("Please upload an image");
    }
    //Create basic post to upload to server
    /*
    let data = JSON.stringify({
      title: title,
      content: body,
      image_url: image,
      hall: dininghall,
      meal_period: mealPeriod,
    });

    let config = {
      method: "post",
      url: "https://api-m46o.onrender.com/Posts",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios.request;
    */
  };

  return (
    <div className="createPost">
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
      <Button variant="outlined" onClick={uploadImage}>
        Add Post
      </Button>
    </div>
  );
};

export default Create;
