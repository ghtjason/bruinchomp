import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Stack, Typography, Box, Paper, InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (e) => {
      if (e.key === 'Enter') {
          e.preventDefault()
          if(searchTerm) {
            if(!searchTerm.includes('/') && !searchTerm.includes('%')) {
              navigate(`/search/${searchTerm}`)
              setError(false)
            }
            else {
              setError(true)
            }
          }
          setSearchTerm('')
      }
  }

  return (
    <TextField 
      error={error}
      label={error ? 'Error' : ''}
      variant="outlined"
      placeholder="Search..."
      onKeyDown={handleSearch}
      value={searchTerm || ''}
      onChange={(e) => setSearchTerm(e.target.value)}
      InputProps={{
          sx: {borderRadius: 20, height: 35, justifyContent: 'center'},
          startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
      }}  
    />
  )
}

export default Searchbar