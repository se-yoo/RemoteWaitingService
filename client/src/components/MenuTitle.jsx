import { Box } from '@mui/system';
import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled(Box)({
  fontWeight: "700",
  fontSize: "32px",
  lineHeight: "39px",
  color: "#496F46"
});

const StyledSubText = styled(Box)({
  fontSize: "16px",
  lineHeight: "19px",
  color: "#BCBCBC",
  marginTop: "16px"
});

const MenuTitle = (props) => {
  const { title, sx, subText, subTextSx } = props;

  return (
    <>
      <StyledTitle sx={sx}>
        { title }
      </StyledTitle>
      {subText && (
        <StyledSubText sx={subTextSx}>
          {subText}
        </StyledSubText>
      )}
    </>
  );
};

export default MenuTitle;