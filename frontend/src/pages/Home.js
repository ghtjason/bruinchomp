import "../index.css"
import { Link } from 'react-router-dom';
import { Grid, Stack, Typography } from '@mui/material'
import Posts from "./Posts";

export default function Home() {

    return (
        <Stack spacing={5} sx= {{ border: 1, width: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
            <Posts/>
        </Stack>
    )
}
