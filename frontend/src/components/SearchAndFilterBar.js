import React from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Typography, InputAdornment, TextField, Autocomplete, Grid, Select, MenuItem, FormControl, InputLabel, Stack } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

const SearchAndFilterBar = ({hallFilter, setHallFilter, mealFilter, setMealFilter, orderFilter, setOrderFilter}) => {
  const diningHallOptions = ['All', 'De Neve', 'Bruin Plate', 'Epicuria'];
  const mealOptions = ['All', 'Breakfast', 'Lunch', 'Dinner'];
  const orderOptions = ['recent', 'popular'];
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate()

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (searchTerm) {
        if (searchTerm.includes('/') || searchTerm.includes('%') || searchTerm.includes('=') || searchTerm.includes('*')) {
          setError(true)
          setSearchTerm('')
        }
        else {
          let search = "key=" + searchTerm;
          // setSearchTerm('')
          if (hallFilter && hallFilter !== 'All') {
            search = search + "&hall=" + hallFilter;
          }
          if (mealFilter && mealFilter !== 'All') {
            search = search + "&meal=" + mealFilter;
          }
          if (orderFilter) {
            search = search + "&order=" + orderFilter;
          }
          navigate(`/posts/search?${search}`);
          setError(false);
        }
      }
    }
  }

  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Stack spacing={2} direction="row" alignItems="center">
        <Grid item>
          <FormControl sx={{ minWidth: 130 }}>
            <InputLabel id="hall-label">Dining Hall</InputLabel>
            <Select
              labelId="hall-label"
              value={hallFilter}
              label="Dining Hall"
              onChange={(e) => setHallFilter(e.target.value)}
            >
              {diningHallOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl sx={{ minWidth: 130 }}>
            <InputLabel id="meal-label">Meal</InputLabel>
            <Select
              labelId="meal-label"
              value={mealFilter}
              label="Meal"
              onChange={(e) => setMealFilter(e.target.value)}
            >
              {mealOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl sx={{ mr: 2, minWidth: 130 }}>
          <InputLabel id="order-label">Order by</InputLabel>
            <Select
              labelId="order-label"
              value={orderFilter}
              label="Order by"
              onChange={(e) => setOrderFilter(e.target.value)}
            >
              {orderOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                      {option}
                  </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Stack>
      
      <Grid item>
        <TextField
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
            startAdornment: (
                <InputAdornment position="start" sx={{ ml: 1 }}>
                    <SearchIcon />
                </InputAdornment>
            )
          }}
        />
      </Grid>
    </Grid>

  )
}

export default SearchAndFilterBar