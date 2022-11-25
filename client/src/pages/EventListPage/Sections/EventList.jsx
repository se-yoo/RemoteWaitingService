import { List } from '@mui/material';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../../utils/function';
import EventListItem from './EventListItem';


const EventList = (props) => {
  const events = useSelector(state => state.event.events);
  const { sx } = props;
  const navigate = useNavigate();

  const getContent = useCallback((event) => {
    // 추후 권한별 내용 변경
    return `${event.participantCnt}명 참여 | ${formatDate(event.createDate)}`;
  }, []);

  const onClickEvent = useCallback((eventId) => {
    navigate(`/event/detail/${eventId}`);
  }, []);

  return (
    <List sx={sx}>
      {events.map(event => (
        <EventListItem 
          key={event._id} 
          title={event.title}
          content={getContent(event)} 
          status={event.status}
          onClickEvent={() => {onClickEvent(event._id)}}
        />
      ))}
    </List>
  );
};

export default EventList;