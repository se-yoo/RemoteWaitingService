import React, { useCallback } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const DateInput = (props) => {
  const { 
    sx,
    value, 
    onChangeValue,
    label,
    disabled,
    error,
    helperText,
    minDate,
    maxDate,
    containTime
  } = props;

  const onChangeDate = useCallback((newValue) => {
    const value = dayjs(newValue).format("YYYY-MM-DD HH:mm");
    onChangeValue(value !== "Invalid Date" ? value : null);
  }, [onChangeValue]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {containTime? (
        <DateTimePicker
          inputFormat="YYYY-MM-DD HH:mm" 
          mask="____-__-__ __:__"
          label={label}
          value={value}
          disabled={disabled}
          onChange={onChangeDate}
          error={error}
          helperText={helperText}
          minDate={minDate}
          maxDate={maxDate}
          renderInput={(params) => (
            <TextField 
              sx={sx}
              {...params}  
            />
          )}
        />
      ): (
        <DatePicker
          inputFormat="YYYY-MM-DD" 
          mask="____-__-__"
          label={label}
          value={value}
          disabled={disabled}
          onChange={onChangeDate}
          error={error}
          helperText={helperText}
          minDate={minDate}
          maxDate={maxDate}
          renderInput={(params) => (
            <TextField 
              sx={sx}
              {...params}  
            />
          )}
        />
      )}
    </LocalizationProvider>
  );
};

export default DateInput;