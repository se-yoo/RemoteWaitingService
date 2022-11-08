import { Box } from '@mui/system';
import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled(Box)({
  fontWeight: "700",
  fontSize: "32px",
  lineHeight: "39px",
  color: "#496F46"
});

const MenuTitle = ({ title, sx }) => {
  return (
    <StyledTitle sx={sx}>
      { title }
    </StyledTitle>
  );
};

export default MenuTitle;