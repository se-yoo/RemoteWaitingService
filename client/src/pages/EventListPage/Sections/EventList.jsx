import { List } from '@mui/material';
import React, { useCallback, useState } from 'react';
import EventListItem from './EventListItem';

const tempEventList = [ // 화면 작업을 위한 임시 값, 추후 삭제
  { id: 1, title: '이벤트 제목', participantCnt: 10, date: '2022-09-27', status: 0 },
  { id: 2, title: '이벤트 제목', participantCnt: 10, date: '2022-09-27', status: 1 },
  { id: 3, title: '이벤트 제목', participantCnt: 10, date: '2022-09-27', status: 1 },
  { id: 4, title: '이벤트 제목', participantCnt: 10, date: '2022-09-27', status: 2 },
  { id: 5, title: '이벤트 제목', participantCnt: 10, date: '2022-09-27', status: 2 },
  { id: 6, title: '이벤트 제목', participantCnt: 10, date: '2022-09-27', status: 2 },
  { id: 7, title: '이벤트 제목', participantCnt: 10, date: '2022-09-27', status: 2 }
];

const EventList = (props) => {
  const [eventList, ] = useState(tempEventList);
  const { sx } = props;

  const getContent = useCallback((event) => {
    // 추후 권한별 내용 변경
    return `${event.participantCnt}명 참여 | ${event.date}`;
  }, []);

  return (
    <List sx={sx}>
      {eventList.map(event => (
        <EventListItem 
          key={event.id} 
          title={event.title}
          content={getContent(event)} 
          status={event.status}
        />
      ))}
    </List>
  );
};

export default EventList;