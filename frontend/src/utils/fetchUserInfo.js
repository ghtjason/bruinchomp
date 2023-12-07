import axios from "axios";
import { proxy_server } from "./constants";

export const fetchUserInfo = async (authToken) => {
  let authID = 'Bearer ' + authToken;
  let config = {
    method: 'get',
    url: `${proxy_server}/users`,
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': authID
    },
  };

  const response = await axios.request(config);
  if(response) {
    return response.data;
  }
  else console.log('profile not found for ID (should not ever happen)');
};
