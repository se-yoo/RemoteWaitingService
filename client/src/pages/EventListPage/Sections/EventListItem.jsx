import React from 'react';
import { Grid, ListItemButton, ListItemText } from '@mui/material';
import styled from '@emotion/styled';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import { EVENT_STATUS_COLOR, EVENT_STATUS_TYPE } from '../../../utils/code';

const StyledEventListItem = styled(ListItemButton)({
  background: "#FFFFFF",
  boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.1)",
  borderRadius: "20px",
  marginBottom: "24px",
  padding: "16px 24px"
});

const StyledEventListItemTitle = styled(Grid)({
  fontWeight: 600,
  fontSize: "20px",
  lineHeight: "44px",
  marginBottom: "12px"
});

const StyledEventListItemContent = styled(Grid)({
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "19px",
  color: "black"
})

const getStatusColor = (status) => {
  switch(status) {
    case EVENT_STATUS_TYPE.OPEN_SOON:
      return EVENT_STATUS_COLOR.OPEN_SOON;
    case EVENT_STATUS_TYPE.IN_PROGRESS:
      return EVENT_STATUS_COLOR.IN_PROGRESS;
    case EVENT_STATUS_TYPE.ENDED:
      return EVENT_STATUS_COLOR.ENDED;
    default:
      return "red";
  }
};

const EventListItem = ({ title, content, status }) => {
  return (
    <StyledEventListItem>
      <ListItemText
        primary={
          <StyledEventListItemTitle 
            container
            alignItems="center"
          >
            <LocalActivityOutlinedIcon 
              color={getStatusColor(status)}
              fontSize="large"
              sx={{ mr: 1.5 }}
            />
            {title}
          </StyledEventListItemTitle>
        }
        secondary={
          <StyledEventListItemContent>
            {content}
          </StyledEventListItemContent>
        }
      />
    </StyledEventListItem>
  );
};

export default EventListItem;