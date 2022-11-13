import { Box, IconButton, TextField } from '@mui/material';
import React, { useCallback, useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

const EditTitle = (props) => {
  const { value, onChangeValue, sx } = props;
  const [tempTitle, setTempTitle] = useState("");
  const [editable, setEditable] = useState(false);

  const onClickEdit = useCallback(() => {
    setEditable(true);
    setTempTitle(value);
  }, [value]);

  const onClickCompleteEdit = useCallback(() => {
    onChangeValue(tempTitle);
    setEditable(false);
  }, [tempTitle, onChangeValue]);

  const onChangeTempTitle = useCallback((e) => {
    setTempTitle(e.target.value);
  }, []);

  const onCheckEnter = useCallback((e) => {
    if(e.key === 'Enter') {
      onClickCompleteEdit();
    }
  }, [onClickCompleteEdit]);

  return (
    <Box sx={sx}>
      {editable ? 
        (
          <TextField
            value={tempTitle}
            onChange={onChangeTempTitle}
            onKeyPress={onCheckEnter}
            InputProps={{
              endAdornment: (
                <IconButton onClick={onClickCompleteEdit}>
                  <CheckOutlinedIcon color="primary" />
                </IconButton>
              )
            }}
          />
        )
        : (
          <Box
            display="flex"
            alignItems="center"
            fontSize={24}
          >
            {value}
            <IconButton
              sx={{ ml: 1 }}
              onClick={onClickEdit}
            >
              <EditOutlinedIcon color="black" />
            </IconButton>
          </Box>
        )
      }
    </Box>
  );
};

export default EditTitle;