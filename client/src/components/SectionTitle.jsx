import { Box, useTheme } from '@mui/material';
import React from 'react';
import CircleIcon from '@mui/icons-material/Circle';

const SectionTitle = (props) => {
  const theme = useTheme();
  const { title, sx, color } = props;

  return (
    <Box 
      display="flex"
      alignItems="center"
      fontSize={16}
      fontWeight={700}
      color={theme.palette[color || "primary"].main}
      my={1.5}
      sx={sx}
    >
      <CircleIcon
        sx={{ mr: 1, fontSize: 8 }}
        color={color || "primary"}
      />
      { title }
    </Box>
  );
};

export default SectionTitle;