import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery, fetchUsers } from '../../store/actions/userSlice';
import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Input = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        dispatch(setSearchQuery(query));
        dispatch(fetchUsers(query));
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [query, dispatch]);

  return (
    <div style={{display:'flex',flex:1,justifyContent:'center'}}>
  <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search for users..."
        inputProps={{ 'aria-label': 'Search for users...' }}
        value={query}
        

    onChange={(e) => setQuery(e.target.value)}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
     
    </Paper>

    </div>
    
  );
};

export default Input;
