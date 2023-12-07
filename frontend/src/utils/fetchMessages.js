import axios from "axios";
import { fetchUserInfo } from "../utils/fetchUserInfo";

//Get user messages
export const fetchMessages = async (username, authToken) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://api-m46o.onrender.com/messages",
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const response = await axios.request(config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error:", error);
    return "";
  }
};
