import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home'
import About from './pages/About'
import Posts from './pages/Posts'
import Create from './pages/CreatePost'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element={<Navbar/>}>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/create" element={<Create />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}