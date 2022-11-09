import React, { useCallback } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchInput = (props) => {
  const { value, onChangeValue, onClickSearch } = props;

  const onChangeText = useCallback((e) => {
    onChangeValue(e.target.value);
  }, []);

  return (
    <TextField
      sx={{ mt: 1.5 }}
      placeholder="검색어"
      value={value}
      onChange={onChangeText}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={onClickSearch}>
              <SearchIcon 
                color="primary"
                sx={{ fontSize: "26px" }}
              />
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
};

export default SearchInput;