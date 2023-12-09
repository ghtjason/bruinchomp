import axios from "axios";
import { proxy_server } from "./constants";

//Get user messages
export const fetchReceivedMessages = async (authToken) => {
  let config = {
    method: "get",
    url: `${proxy_server}/messages/received`,
    headers: {
      "Authorization": "Bearer " + authToken,
    },
  };
  try {
    const response = await axios.request(config)
    return response.data
  } catch (error) {
    console.log("Error:", error)
    return false
  }
};

export const createMessage = async (authToken, recipient, msgContent) => {
  
  let data = JSON.stringify({
    recipient_username: recipient,
    content: msgContent,
  });

  let config = {
    method: "post",
    url: `${proxy_server}/messages`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authToken}`,
    },
    data: data,
  };

  try {
    const response = await axios.request(config)
    return response.data
  } catch (error) {
    return false
  }

};
