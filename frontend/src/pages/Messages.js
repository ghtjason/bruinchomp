import { Stack, TextField, CardContent,Typography, Card, Button, InputAdornment, IconButton} from "@mui/material";

import Cookies from "js-cookie"; // cookiessssss
import { useState } from "react";
import { fetchReceivedMessages, createMessage } from "../utils/messageUtils";
import { fetchUsernameInfo } from "../utils/fetchUserInfo";
import Message from '../components/Message'
import SendIcon from '@mui/icons-material/Send';


const Messages = () => {
  const authToken = Cookies.get("authToken");
  const [recipient, setRecipient] = useState("");
  const [msgContent, setMsgContent] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [messages, setMessages] = useState(null);
  const [msgSuccess, setMsgSuccess] = useState(false)

  const initializeProfile = () => {
    fetchReceivedMessages(authToken).then((result) => {
      console.log("messages: ", result)
      if (result) setMessages(result)
    });
    console.log("Received messages:", messages);
  };

  const handleSend = async () => {
    if (recipient) {
      await createMessage(authToken, recipient, msgContent).then(result => {
          console.log("sent msg")
      })
    }
  };


  if (!messages) initializeProfile()
  if (authToken && messages) {
    return (
      <Stack sx={{ width: '100vw', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <Card
        sx={{
          width: '50vw'
        }}>
          <CardContent>
            <Typography
            variant='h5'
            sx={{
              mb: '15px'
            }}
            ><b>Send a message</b></Typography>
            <form onSubmit={handleSend}>
              <TextField
                required
                sx={{
                  mb: '20px'
                }}
                label="Recipient"
                variant="outlined"
                fullWidth
                onChange={(e) => setRecipient(e.target.value)}
              />
              <TextField
                required
                label="Send a message"
                variant="outlined"
                multiline
                rows={2}
                value={msgContent}
                onChange={(e) => setMsgContent(e.target.value)}
                InputProps={{
                  endAdornment: <InputAdornment position="end">
                    {/* <IconButton onClick={addComment} disabled = {disabled}> */}
                    <IconButton
                      onClick={handleSend}
                    >
                      <SendIcon/>
                    </IconButton>
                  </InputAdornment>,
                }}
                fullWidth
              />
              {/* <Typography variant="body2" style={errorMsgStyle}>
                {message}
              </Typography> */}
            </form>
            <Typography ml={1} color={'green'}>{msgSuccess ? 'Success!' : ''} </Typography>
          </CardContent>
        </Card>
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
