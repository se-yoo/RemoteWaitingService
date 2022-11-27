import { List } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EventListItem from './EventListItem';
import { EVENT_STATUS_TYPE, EVENT_RESULT_TYPE, PARTICIPANT_STATUS } from '../../../utils/code';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserEventList } from '../../../store/actions/answer_actions';
import moment from 'moment';


const EventList = (props) => {
  //const [eventList, ] = useState(tempEventList);
  const { sx } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userEventList,setUserEventList] = useState([]);
  const userId = useParams().userId
 // const user= useSelector(state => state.user.userData);
 
  const body={
    userId:userId
  }


  useEffect(()=>{
    dispatch(loadUserEventList(body))
    .then(response=>{
      if(response.payload.success){
        setUserEventList(response.payload.eventList);
        console.log("eventList : "+response.payload.success);
        console.log("eventList : "+ JSON.stringify(response.payload.eventList));
        console.log("eventList : "+response.payload.user);
      }
      else{
        console.log("eventListError : "+response.payload.success);
        console.log("eventListError : "+response.payload.message);
        console.log("eventListError : "+response.payload.err);
      }
    })
  }, [dispatch])

  const getResultOption=useCallback((event)=> {
    const eventStatus = getEventStatus(event);
    console.log(EVENT_RESULT_TYPE.WON);
    if (eventStatus!==EVENT_STATUS_TYPE.ENDED) {
      return EVENT_RESULT_TYPE.DEFAULT
    }
    else{
      if(event.status===PARTICIPANT_STATUS.NONE) return EVENT_RESULT_TYPE.NOT_WON;
      else return EVENT_RESULT_TYPE.WIN;
    }
  },[])

  const getEventStatus = useCallback((event)=>{
    const startDate = event.startDate;
    const endDate = event.endDate;
    const today = Date.now();
    if(startDate > today){
      return EVENT_STATUS_TYPE.OPEN_SOON;
    }
    else if(startDate < today && today < endDate){
      return EVENT_STATUS_TYPE.IN_PROGRESS;
    }
    else {
      return EVENT_STATUS_TYPE.ENDED;
    }
  },[])

  const getContent = useCallback((event) => {
    //moment(userJoinEvent.startDate).format('YYYY-MM-DD HH:mm:ss')
    return `${moment(event.startDate).format('YYYY-MM-DD HH:mm:ss')} ~ ${moment(event.endDate).format('YYYY-MM-DD HH:mm:ss')}`;
  }, []);

  const onClickEvent = useCallback((eventId) => {
    navigate(`/user/event/detail/${eventId}`);
  }, []);


  return (
    <List sx={sx}>
      {userEventList.map(event => (
        <EventListItem 
          key={event._id} 
          title={event.title}
          content={getContent(event)} 
          status={getEventStatus(event)}
          onClickEvent={() => {onClickEvent(event._id)}}
          eventResult={getResultOption(event)}
        />
      ))}
    </List>
  );
};

export default EventList;