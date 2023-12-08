import { Stack } from "@mui/material";

import Cookies from "js-cookie"; // cookiessssss
import { useState } from "react";
import { fetchReceivedMessages, createMessage } from "../utils/messageUtils";
import { fetchUserInfo } from "../utils/fetchUserInfo";
import Message from '../components/Message'


const Messages = () => {
  const authToken = Cookies.get("authToken");
  const [user, setUser] = useState("");
  // const [recipient, setRecipient] = useState("");
  // const [msgContent, setMsgContent] = useState("");
  // const [errorMsg, setErrorMsg] = useState("");
  const [messages, setMessages] = useState(null);

  const initializeProfile = () => {
    fetchReceivedMessages(authToken).then((result) => {
      console.log("messages: ", result)
      if (result) setMessages(result)
    });
    console.log("Received messages:", messages);
  };
  if (!messages) initializeProfile()
  if (authToken && messages) {
    return (
      <Stack sx={{ width: '100vw', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <div className="Messages">
          {/* <Typography sx={{ fontWeight: 'bold', fontSize: '28px' }}>{loaded}</Typography> */}
          <Stack spacing={2} mt={3} sx={{ alignItems: 'center' }}>
            {messages.map((message) => (
              <div key={message.id}>
                <Message message={message} />
              </div>
            ))}
          </Stack>
        </div>
      </Stack>
    );
  } else {
    return <div>You are not logged in!</div>;
  }
};

export default Messages;
