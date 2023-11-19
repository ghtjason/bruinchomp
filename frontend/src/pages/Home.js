import "../index.css"
import { Link } from 'react-router-dom';
import { Grid, Stack, Typography } from '@mui/material'

export default function Home() {

    return (
        <Stack spacing={5} sx= {{ border: 1, width: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
            <Typography>this line is a test </Typography>
            <Typography>test #2</Typography>
            <Typography>another test line</Typography>
            <Typography>yay</Typography>
        </Stack>
    )
}
