import { List } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventListItem from './EventListItem';

const tempEventList = [ // 화면 작업을 위한 임시 값, 추후 삭제
  { id: 1, title: '이벤트 제목', participantCnt: 10, createDate: '2022-09-27', startDate: '2022-09-27 15:00', endDate: '2022-10-05 18:00', status: 1, result_option: 0 },
  { id: 2, title: '이벤트 제목', participantCnt: 10, createDate: '2022-09-27', startDate: '2022-09-27 15:00', endDate: '2022-10-05 18:00', status: 1, result_option: 0 },
  { id: 3, title: '이벤트 제목', participantCnt: 10, createDate: '2022-09-27', startDate: '2022-09-27 15:00', endDate: '2022-10-05 18:00', status: 1, result_option: 0 },
  { id: 4, title: '이벤트 제목', participantCnt: 10, createDate: '2022-09-27', startDate: '2022-09-27 15:00', endDate: '2022-10-05 18:00', status: 2, result_option: 1 },
  { id: 5, title: '이벤트 제목', participantCnt: 10, createDate: '2022-09-27', startDate: '2022-09-27 15:00', endDate: '2022-10-05 18:00', status: 2, result_option: 2 },
  { id: 6, title: '이벤트 제목', participantCnt: 10, createDate: '2022-09-27', startDate: '2022-09-27 15:00', endDate: '2022-10-05 18:00', status: 2, result_option: 2 },
  { id: 7, title: '이벤트 제목', participantCnt: 10, createDate: '2022-09-27', startDate: '2022-09-27 15:00', endDate: '2022-10-05 18:00', status: 2, result_option: 1 }
];

const EventList = (props) => {
  const [eventList, ] = useState(tempEventList);
  const { sx } = props;
  const navigate = useNavigate();

  const getContent = useCallback((event) => {
    return `${event.startDate} ~ ${event.endDate}`;
  }, []);

  const onClickEvent = useCallback((eventId) => {
    navigate(`/user/event/detail/${eventId}`);
  }, []);

  return (
    <List sx={sx}>
      {eventList.map(event => (
        <EventListItem 
          key={event.id} 
          title={event.title}
          content={getContent(event)} 
          status={event.status}
          onClickEvent={() => {onClickEvent(event.id)}}
          eventResult={event.result_option}
        />
      ))}
    </List>
  );
};

export default EventList;