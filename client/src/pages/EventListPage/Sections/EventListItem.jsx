import React from "react";
import { Box, ListItemButton, ListItemText } from "@mui/material";
import styled from "@emotion/styled";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import { theme } from "../../../styles/theme";
import {
  EVENT_STATUS_COLOR,
  EVENT_STATUS_TYPE,
  PARTICIPATION_STATUS,
  PARTICIPATION_STATUS_INFO,
  WAITING_PARTICIPATION_STATUS_INFO,
} from "../../../utils/code";

const StyledEventListItem = styled(ListItemButton)({
  background: "#FFFFFF",
  boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.1)",
  borderRadius: "20px",
  marginBottom: "24px",
  padding: "16px 24px",
});

const StyledEventListItemTitle = styled(Box)({
  fontWeight: 600,
  fontSize: "20px",
  lineHeight: "44px",
  marginBottom: "12px",
});

const StyledEventListItemContent = styled(Box)({
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "19px",
  color: "black",
});

const StyledStateBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "80px",
  height: "40px",
  borderRadius: "20px",
  fontSize: "16px",
  marginLeft: "12px",
  fontWeight: "normal",
});

const getStatusColor = (status) => {
  switch (status) {
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

const getResultColor = (status) => {
  switch (status) {
    case PARTICIPATION_STATUS.WIN:
    case PARTICIPATION_STATUS.ENTER:
      return theme.palette.primary.main;
    case PARTICIPATION_STATUS.ENTER_CANCEL:
      return theme.palette.red.main;
    default:
      return theme.palette.grey.main;
  }
};

const getResultText = (status) => {
  switch (status) {
    case PARTICIPATION_STATUS.WIN:
      return PARTICIPATION_STATUS_INFO.find(
        (item) => item.value === PARTICIPATION_STATUS.WIN,
      ).text;
    case PARTICIPATION_STATUS.ENTER:
    case PARTICIPATION_STATUS.ENTER_CANCEL:
      return WAITING_PARTICIPATION_STATUS_INFO.find(
        (item) => item.value === PARTICIPATION_STATUS.WIN,
      ).text;
    default:
      return "-";
  }
};

const EventListItem = (props) => {
  const { title, content, status, result, onClickEvent } = props;

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
            {result !== undefined && result !== PARTICIPATION_STATUS.NONE && (
              <StyledStateBox
                sx={{
                  backgroundColor: `${getResultColor(result)}1a`,
                  color: getResultColor(result),
                }}
              >
                {getResultText(result)}
              </StyledStateBox>
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
