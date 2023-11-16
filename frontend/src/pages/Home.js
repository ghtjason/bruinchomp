import Header from '../components/Header'
import "../index.css"
import { Link } from 'react-router-dom';
import { Grid} from '@mui/material'

export default function Home() {

    return (
        <Grid>
            <h1>BruinChomp</h1>
            <nav>
                <Link to="/home">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/posts">Posts</Link>
            </nav>
        </Grid>
    )
}
