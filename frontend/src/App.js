import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Create from "./pages/CreatePost";
import Register from "./pages/Register";
import Login from "./pages/Login";

import SearchFeed from "./pages/SearchFeed";
import axios from "axios";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Box sx={{ display: "flex" }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/create" element={<Create />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/search/:searchTerm" element={<SearchFeed />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </div>
  );
}
