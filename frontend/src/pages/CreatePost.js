import { useState } from "react";
import "../index.css";
import axios from "axios";
import {
  Stack,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import Cookies from "js-cookie"; // cookiessssss
import { NoCellRounded, Title } from "@mui/icons-material";

const Create = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [dininghall, setDininghall] = useState("");
  const [body, setBody] = useState("");
  const [mealPeriod, setMealperiod] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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
    //Process image url first

    //Create basic post to upload to server
    let data = JSON.stringify({
      title: title,
      content: body,
      image_url: image,
      hall: dininghall,
      meal_period: mealPeriod,
    });
  };

  return (
    <div className="createPost">
      <h2>Create new post</h2>
      <form onSubmit={handleSubmit} className="createForm">
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
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <div className="formGroup">
          <label>Upload image file</label>
          <input
            type="file"
            accept="image/*"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
      </form>
      <Button variant="outlined">Add Post</Button>
    </div>
  );
};

export default Create;
