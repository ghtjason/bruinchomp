import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Posts from './pages/Posts';
import Create from './pages/CreatePost';
import axios from "axios";

export default function App() {

  return (
    <div>
       <BrowserRouter>
        <Box sx={{display: 'flex'}}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Navigate replace to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/create" element={<Create />} />
          </Routes>
        </Box>
       </BrowserRouter>
    </div>
  );
}