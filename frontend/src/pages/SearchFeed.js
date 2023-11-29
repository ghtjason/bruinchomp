import React from 'react'
import Feed from './Feed'
import Searchbar from './Searchbar'
import { Stack, Box } from '@mui/material'

const SearchFeed = () => {
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

export default SearchFeed