import {
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

import axios from "axios";
import { auth_token } from "../utils/constants";
import Cookies from "js-cookie"; // cookiessssss
import { useState } from "react";

const Messages = () => {
  const authToken = Cookies.get("authToken");
  const [otherUser, setOtherUser] = useState("");
  const [Msgcontent, setMsgContent] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const createMessage = () => {
    const authToken = Cookies.get("authToken");

    //Check if user exists, if not, print error

    let data = JSON.stringify({
      recipient_username: otherUser,
      content: Msgcontent,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api-m46o.onrender.com/messages",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (authToken) {
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
        </div>
      </Card>
    );
  } else {
    return <div>You are not logged in!</div>;
  }
};

export default Messages;
