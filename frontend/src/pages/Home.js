import Header from '../components/Header'
import "../index.css"
import { Link } from 'react-router-dom';

export default function Home() {

    return (
        <>
            <h1>BruinChomp</h1>
    <nav>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/posts">Posts</Link>
    </nav>

        </>
    )
}
