import "../index.css"
import { useEffect, useState } from "react";
import { Stack, Typography, Box, Paper, InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import Feed from "./Feed";
import Searchbar from "../components/Searchbar";

export default function Home() {
    return (
        <Stack sx= {{ width: '70vw', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Box>
                <Feed searchTerm={''}/>
            </Box>
        </Stack>
    )
}
