import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Create from "./pages/CreatePost";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Messages from "./pages/Messages";

import Searched from "./pages/Searched";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Box sx={{ display: "flex" }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile/:user" element={<Profile />} />
            <Route path="/posts/search" element={<Searched />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </div>
  );
}
