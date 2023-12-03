import axios from "axios";

export const fetchUserInfo = async (authToken) => {
  let authID = 'Bearer ' + authToken;
  let config = {
    method: 'get',
    url: 'https://api-m46o.onrender.com/users',
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
