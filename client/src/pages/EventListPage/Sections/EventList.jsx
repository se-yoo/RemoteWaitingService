import { List } from "@mui/material";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/function";
import EventListItem from "./EventListItem";

const EventList = (props) => {
  const { sx } = props;
  const events = useSelector((state) => state.event.events);
  const userData = useSelector((state) => state.user.userData);
  const { isAdmin } = userData || { isAdmin: false };
  const navigate = useNavigate();

  const getContent = useCallback(
    (event) => {
      if (isAdmin) {
        return `${event.participantCnt}명 참여 | ${formatDate(
          event.createDate,
        )}`;
      } else {
        return event.noLimitDate
          ? "상시 참여 가능"
          : `${event.startDate} ~ ${event.endDate}`;
      }
    },
    [isAdmin],
  );

  const onClickEvent = useCallback(
    (eventId) => {
      navigate(`/event/detail/${eventId}`);
    },
    [isAdmin, userData],
  );

  return (
    <List sx={sx}>
      {events.map((event) => (
        <EventListItem
          key={event._id}
          title={event.title}
          content={getContent(event)}
          status={event.status}
          result={event.result}
          onClickEvent={() => {
            onClickEvent(event._id);
          }}
        />
      ))}
    </List>
  );
};

export default EventList;
