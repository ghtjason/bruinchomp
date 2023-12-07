import {
  Button,
  TextField,
  Typography,
  Card,
  Stack,
} from "@mui/material";

import axios from "axios";
import { auth_token } from "../utils/constants";
import Cookies from "js-cookie"; // cookiessssss
import { useState } from "react";
import { fetchMessages } from "../utils/fetchMessages";
import { fetchUserInfo } from "../utils/fetchUserInfo";

const Messages = () => {
  const authToken = Cookies.get("authToken");
  const [user, setUser] = useState("");
  const [otherUser, setOtherUser] = useState("");
  const [Msgcontent, setMsgContent] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [messages, setMessages] = useState("");

  const initializeProfile = async (e) => {
    await fetchUserInfo(authToken).then((result) => {
      setUser(result.username);
    });
    fetchMessages(user, authToken).then((result) => {
      if (result) setMessages(result);
    });
    console.log("Received messages:", messages);
  };

  const createMessage = async (e) => {
    const authToken = Cookies.get("authToken");
    if (messages == null) console.log("well rip");
    console.log("Received messages:", messages);

    //Check if user exists, if not, print error

    let data = JSON.stringify({
      recipient_username: otherUser,
      content: Msgcontent,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${proxy_server}/messages`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Response data:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.log("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error during request setup:", error.message);
      }
      console.log("Error config:", error.config);
    }
    setOtherUser("");
    setMsgContent("");
  };

  if (authToken) {
    initializeProfile();
    return (
      <Card>
        <div className="createPost">
          <Typography sx={{ fontWeight: "bold", fontSize: "32px" }}>
            Create new Message
          </Typography>
          <Typography color="red">{errorMsg}</Typography>
          <form className="createForm">
            <div className="formGroup">
              <Typography fontWeight={"bold"}>Recipient Username </Typography>
              <TextField
                type="text"
                required
                value={otherUser}
                onChange={(e) => setOtherUser(e.target.value)}
                fullWidth
              />
            </div>
          </form>
          <div className="formGroup">
            <Typography fontWeight={"bold"}>Message Content</Typography>
            <TextField
              type="text"
              required
              value={Msgcontent}
              onChange={(e) => setMsgContent(e.target.value)}
              fullWidth
            />
          </div>
          <Button variant="outlined" onClick={createMessage}>
            Create Message
          </Button>
        </div>
        <div className="Message">
          <Typography sx={{ fontWeight: "bold", fontSize: "32px" }}>
            Your Messages
          </Typography>
          {/* POSTS */}
          <div className="Messages">
            <Stack spacing={2} mt={3} sx={{ alignItems: "center" }}>
              {messages ? (
                messages.map((message) => {
                  if (
                    message.sender_username === user ||
                    message.recipient_username === user
                  ) {
                    return (
                      <div key={message.id}>
                        <p>{message.content}</p>
                        <p>Sender: {message.sender_username}</p>
                        <p>Recipient: {message.recipient_username}</p>
                        <p>{message.timestamp}</p>
                      </div>
                    );
                  }
                  return null;
                })
              ) : (
                <Typography>No Messages Yet!</Typography>
              )}
            </Stack>
          </div>
        </div>
      </Card>
    );
  } else {
    return <div>You are not logged in!</div>;
  }
};

export default Messages;
