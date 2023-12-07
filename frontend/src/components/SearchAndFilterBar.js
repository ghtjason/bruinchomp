import React from 'react'
import { useState } from "react";
import { Form, useNavigate } from 'react-router-dom';
import { Typography, InputAdornment, TextField, Autocomplete, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

const SearchAndFilterBar = () => {
    const diningHallOptions = ['All', 'De Neve', 'Bruin Plate', 'Epicuria'];
    const mealOptions = ['All', 'Breakfast', 'Lunch', 'Dinner'];
    const orderOptions = ['recent', 'popular', 'relevant'];
    const [searchTerm, setSearchTerm] = useState('')
    const [error, setError] = useState(false)
    const [hallFilter, setHallFilter] = useState('');
    const [mealFilter, setMealFilter] = useState('');
    const [orderFilter, setOrderFilter] = useState('recent');
    const navigate = useNavigate()

    const searchParams = [
        { label: 'user: ', explanation: 'search for username' },
        { label: 'hall: ', explanation: 'search for dining hall' },
        { label: 'meal: ', explanation: 'search for meal period' },
        { label: 'order: ', explanation: "search by 'relevant' or 'popular' " },
        { label: '', explanation: 'no field = search for any phrase!' },
    ];

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            if (searchTerm) {
                if (searchTerm.includes('/') || searchTerm.includes('%') || searchTerm.includes('=')) {
                    setError(true)
                    setSearchTerm('')
                }
                else {
                    let search = "key=" + searchTerm;
                    setSearchTerm('')
                    if (hallFilter) {
                        search = search + "&hall=" + hallFilter;
                    }
                    if (mealFilter) {
                        search = search + "&meal=" + mealFilter;
                    }
                    if (orderFilter) {
                        search = search + "&order=" + orderFilter;
                    }
                    navigate(`/posts/search?${search}`);
                    setError(false);
                }
            } else {
                let search = '';
                if (hallFilter) {
                    search = search + "&hall=" + hallFilter;
                }
                if (mealFilter) {
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

    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="hall-label">Dining Hall</InputLabel>
                    <Select
                        labelId="hall-label"
                        value={hallFilter}
                        label="Dining Jall"
                        onKeyDown={handleSearch}
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
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="meal-label">Meal</InputLabel>
                    <Select
                        labelId="meal-label"
                        value={mealFilter}
                        label="Meal"
                        onKeyDown={handleSearch}
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
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="order-label">Order by</InputLabel>
                    <Select
                        labelId="order-label"
                        value={orderFilter}
                        label="Order by"
                        onKeyDown={handleSearch}
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
            <Grid item>
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
                                    <InputAdornment position="start" sx={{ ml: 1 }}>
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    )}
                />
            </Grid>
        </Grid>

    )
}

export default SearchAndFilterBar