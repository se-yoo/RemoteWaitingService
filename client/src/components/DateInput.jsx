import React, { useCallback, useMemo } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

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
    containTime,
  } = props;

  const inputFormat = useMemo(() => {
    return `YYYY-MM-DD${containTime ? " HH:mm" : ""}`;
  }, [containTime]);

  const onChangeDate = useCallback(
    (newValue) => {
      const value = dayjs(newValue).format(inputFormat);
      onChangeValue(value !== "Invalid Date" ? value : null);
    },
    [onChangeValue, inputFormat],
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {containTime ? (
        <DateTimePicker
          inputFormat={inputFormat}
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
              error={error}
              helperText={helperText}
            />
          )}
        />
      ) : (
        <DatePicker
          inputFormat={inputFormat}
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
              error={error}
              helperText={helperText}
            />
          )}
        />
      )}
    </LocalizationProvider>
  );
};

export default DateInput;
