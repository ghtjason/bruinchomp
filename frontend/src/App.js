import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Posts from './pages/Posts';
import Create from './pages/CreatePost';
import axios from "axios";

export default function App() {

  function getData () {
    //const axios = require('axios');

    let config = {
      method: 'get',
      url: '/posts',
    };
  
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  
  }


  return (
    <div>
      <button onClick = {getData}> Hello </button>
       {/* <BrowserRouter>
         <Routes>
           <Route path = "/" element={<Navbar/>}>
             <Route path="/home" element={<Home />} />
             <Route path="/about" element={<About />} />
             <Route path="/posts" element={<Posts />} />
             <Route path="/create" element={<Create />} />
           </Route>
         </Routes>
       </BrowserRouter> */}
    </div>
  );
}