import React, { useCallback } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = (props) => {
  const { value, onChangeValue, onSearch } = props;

  const onChangeText = useCallback((e) => {
    onChangeValue(e.target.value);
  }, []);

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        onSearch(e);
      }
    },
    [onSearch],
  );

  return (
    <TextField
      sx={{ mt: 1.5 }}
      placeholder="검색어"
      value={value}
      onChange={onChangeText}
      onKeyDown={onKeyDown}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={onSearch}>
              <SearchIcon color="primary" sx={{ fontSize: "26px" }} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchInput;
