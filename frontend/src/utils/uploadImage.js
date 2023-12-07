import axios from "axios";
import { proxy_server } from "./constants";

export const uploadImage = async (e, image, authToken, setImage_url, setErrorMsg) => {
  //Process image url first
  if (!image) {
    setErrorMsg("Please upload an image");
    return;
  }

  const FormData = require("form-data");

  let data = new FormData();
  data.append("file", image);

  let config = {
    method: "post",
    url: `${proxy_server}/image`,
    headers: {
      Authorization: `Bearer ${authToken}`,
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