import React from 'react'
import { Box, Stack, Button, Menu, MenuItem, Select, FormControl, InputLabel, OutlinedInput, Chip, Divider } from '@mui/material'
import { useState, useEffect } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const FilterMenu = ({categories, setCategories}) => {

  const handleChange = (e) => {
    const {
      target: {value},
    } = e;
    setCategories(typeof(value) === 'string' ? value.split(',') : value);

  }

  const handleDelete = ({value}) => {
    console.log(value)
    setCategories(categories.filter((category) => category !== value))
  }

  return (
    <FormControl>
      <InputLabel>Filter Options</InputLabel>
      <Select
        label="Filter Options"
        value={categories}
        multiple
        onChange={handleChange}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} 
                onDelete={() => handleDelete({value})}
                onMouseDown={(e) => {
                  e.stopPropagation();
                }} 
              />
            ))}
          </Box>
        )}
        sx={{width: 300}}
      >
        <MenuItem value="Bruin Plate">Bruin Plate</MenuItem>
        <MenuItem value="Epicuria">Epicuria</MenuItem>
        <MenuItem value="De Neve">De Neve</MenuItem>
        <Divider sx={{borderBottomWidth: 3}} />
        <MenuItem value="Breakfast">Breakfast</MenuItem>
        <MenuItem value="Lunch">Lunch</MenuItem>
        <MenuItem value="Dinner">Dinner</MenuItem>
      </Select> 
    </FormControl>
  )
}

export default FilterMenu