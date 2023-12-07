import React from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Typography, InputAdornment, TextField, Autocomplete } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const searchParams = [
    {label: 'user: ', explanation: 'search for username'},
    {label: 'hall: ', explanation: 'search for dining hall'},
    {label: 'meal: ', explanation: 'search for meal period'},
    {label: 'order: ', explanation: "search by 'relevant' or 'popular'"},
    {label: '', explanation: 'no field = search for any phrase!'},
  ];

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if(searchTerm) {
        if (searchTerm.includes('/') || searchTerm.includes('%') || searchTerm.includes('=')) {
          setError(true)
          setSearchTerm('')
        }
        else {
          let search = searchTerm
          setSearchTerm('')
          if (search.startsWith('user: ')) {
            search = search.slice(6)
            navigate(`/search/user=${search}`)
          }
          else if (search.startsWith('hall: ')) {
            search = search.slice(6)
            navigate(`/search/hall=${search}`)
          }
          else if (search.startsWith('meal period: ')) {
            search = search.slice(13)
            navigate(`/search/meal=${search}`)
          }
          else if (search.startsWith('order: ')) {
            if(searchTerm === 'order: relevant')
              navigate(`/search/order=relevant`)
            else if(search === 'order: popular')
              navigate(`/search/order=popular`)
            else {
              console.log('reached')
              setError(true)
              return
            }
          }
          else {
            navigate(`/search/key=${search}`)
          }
          setError(false)
        }
      }
    }
  }

  return (
    <Autocomplete
      freeSolo
      disableClearable
      options={searchParams}
      renderOption={(props, option) => (
        <li {...props} >
          <Typography fontSize={'13px'} fontWeight={'bold'}>{option.label}</Typography>
          <Typography fontSize={'12px'} color={'gray'} ml={1} mt={0.2}>{option.explanation}</Typography>
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
          label={error ? 'Error' : ''}
          variant="outlined"
          placeholder="Search..."
          onKeyDown={handleSearch}
          value={searchTerm || ''}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 20, 
              height: 55, 
              width: 250, 
            },
          }}
          InputProps={{
            ...params.InputProps,
            type: 'search',
            startAdornment: (
              <InputAdornment position="start" sx={{ml: 1}}>
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      )}
    />
    
  )
}

export default Searchbar