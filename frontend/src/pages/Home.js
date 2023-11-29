import "../index.css"
import { useEffect, useState } from "react";
import { Stack, Typography, Box, Paper, InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import Feed from "./Feed";
import Searchbar from "./Searchbar";

export default function Home() {
    return (
        <Stack direction="row" sx={{justifyContent: 'space-between', width: '80vw'}}>
            <Stack sx= {{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', marginTop: 2}}>
                <Box>
                    <Feed/>
                </Box>
            </Stack>
            <Box sx={{marginTop: 2}}>
                <Searchbar/>
            </Box>

        </Stack>
           
    )
}
