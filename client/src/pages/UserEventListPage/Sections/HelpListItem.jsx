import React from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import { Box } from '@mui/material';

const HelpListItem = ({ color, text }) => {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        mr: 2
      }}
    >
      <CircleIcon
        color={color}
        sx={{
          fontSize: 15,
          mr: 1
        }}
      />
      <span>{ text }</span>
    </Box>
  );
};

export default HelpListItem;