import React from 'react';
import { Box, ListItemButton, ListItemText } from '@mui/material';
import styled from '@emotion/styled';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import { EVENT_STATUS_COLOR, EVENT_STATUS_TYPE, EVENT_RESULT_TYPE } from '../../../utils/code';

const StyledEventListItem = styled(ListItemButton)({
  background: "#FFFFFF",
  boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.1)",
  borderRadius: "20px",
  marginBottom: "24px",
  padding: "16px 24px"
});

const StyledEventListItemTitle = styled(Box)({
  fontWeight: 600,
  fontSize: "20px",
  lineHeight: "44px",
  marginBottom: "12px"
});

const StyledEventListItemContent = styled(Box)({
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "19px",
  color: "black"
})

const StyledStateBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width:"80px",
  height:"40px", 
  borderRadius:"20px",
  fontSize:"16px",
  marginLeft:"12px",
  fontWeight:"normal"
});


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

const stateSuccess={
  BG_COLOR:"rgba(73,111,70,0.1)",
  COLOR:"#496F46"
}

const stateFail={
  BG_COLOR:"rgba(202,55,55,0.1)",
  COLOR:"#CA3737"
}

const EventListItem = (props) => {
  const { title, content, status, onClickEvent, eventResult } = props;

  return (
    <StyledEventListItem onClick={onClickEvent}>
      <ListItemText
        primary={
          <StyledEventListItemTitle 
            display="flex"
            alignItems="center"
            component="span"
          >
            <LocalActivityOutlinedIcon 
              color={getStatusColor(status)}
              fontSize="large"
              sx={{ mr: 1.5 }}
            />
            {title}
            {eventResult !== EVENT_RESULT_TYPE.IN_PROGRESS && (
              <>
                {eventResult===EVENT_RESULT_TYPE.WIN&&(
                  <StyledStateBox sx={{ backgroundColor:stateSuccess.BG_COLOR, color:stateSuccess.COLOR }}>
                    당첨
                  </StyledStateBox>
                )}
                {eventResult===EVENT_RESULT_TYPE.NOT_WON&&(
                  <StyledStateBox sx={{ backgroundColor:stateFail.BG_COLOR, color:stateFail.COLOR }}>
                    미당첨
                  </StyledStateBox>
                )}
              </>
            )}
          </StyledEventListItemTitle>
        }
        secondary={
          <StyledEventListItemContent component="span">
            {content}
          </StyledEventListItemContent>
        }
      />
    </StyledEventListItem>
  );
};

export default EventListItem;