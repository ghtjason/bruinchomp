import "../index.css"
import { Stack, Typography, Box } from '@mui/material'
import Posts from "./Posts";

export default function Home() {

    return (
        <Box>
            <Stack spacing={5} sx= {{  justifyContent: 'flex-start', alignItems: 'center', display: 'flex', marginRight: 1, marginLeft: 1, marginTop: 1}}>
                <Typography sx={{ fontWeight: 'bold', fontSize: 20}}>
                    Recent Posts
                </Typography>
                <Box marginTop={0}>
                    <Posts/>
                </Box>
            </Stack>            
        </Box>

    )
}
