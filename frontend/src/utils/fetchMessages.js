import axios from "axios";
import { proxy_server } from "./constants";

//Get user messages
export const fetchMessages = async (username, authToken) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${proxy_server}/messages`,
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
