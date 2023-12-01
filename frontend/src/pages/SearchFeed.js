import React, { useEffect } from 'react'
import Feed from '../components/Feed'
import Searchbar from '../components/Searchbar'
import { Stack, Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

const SearchFeed = () => {
  const {searchTerm} = useParams();
  console.log('searchFeed received: ', searchTerm)

  return (
    <Stack sx= {{ width: '100vw', justifyContent: 'space-between', alignItems: 'center', mt: 2}}>
      <Typography mb={2} variant="h5" fontWeight={"bold"}>
        Showing search results for <span style ={{color:'#FF0000'}}>{searchTerm}</span>:
      </Typography>
      <Box>
        <Feed searchTerm={searchTerm}/>
      </Box>
    </Stack>
  )
}

export default SearchFeed