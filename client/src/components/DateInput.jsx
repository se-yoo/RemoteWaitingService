import React, { useCallback } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const DateInput = (props) => {
  const { 
    sx,
    value, 
    onChangeValue,
    label
  } = props;

  const onChangeDate = useCallback((newValue) => {
    onChangeValue(dayjs(newValue).format("YYYY-MM-DD"));
  }, [onChangeValue]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        inputFormat="YYYY-MM-DD" 
        mask="____-__-__"
        label={label}
        value={value}
        onChange={onChangeDate}
        renderInput={(params) => (
          <TextField 
            sx={sx}
            {...params}  
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DateInput;