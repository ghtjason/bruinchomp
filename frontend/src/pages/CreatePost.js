import { Button } from "@mui/material";
import { useState } from "react";
import "../index.css";
const Create = () => {
  const [title, setTitle] = useState();
  const [image, setImage] = useState();
  const [comments, setComments] = useState();
  const [date, setDate] = useState();
  const [likes, setLikes] = useState();
  const [dininghall, setDininghall] = useState();
  const [body, setBody] = useState();
  const [mealPeriod, setMealperiod] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const post = {};
  };

  return (
    <div className="createPost">
      <h2>Create new post</h2>
      <form onSubmit={handleSubmit}>
        <label>Post title</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Post category</label>
        <select
          value={dininghall}
          onChange={(e) => setDininghall(e.target.value)}
        >
          <option value="Bruin_Plate">Bruin Plate</option>
          <option value="Epicuria">Epicuria</option>
          <option value="De_Neve">De Neve</option>
        </select>
        <label>Post category</label>
        <select
          value={mealPeriod}
          onChange={(e) => setMealperiod(e.target.value)}
        >
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Extended_dinner">Extended Dinner</option>
        </select>
        <label>Post body</label>
        <textarea
          type="text"
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Upload image file</label>
        <input
          type="file"
          accept="image/*"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </form>
      <Button variant="outlined">Add Post</Button>
    </div>
  );
};

export default Create;
