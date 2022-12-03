import React, { useEffect, useState }  from 'react';
import { Box } from '@mui/material';
import SectionTitle from '../../../components/SectionTitle';
import { loadUserEventJoin } from '../../../store/actions/event_actions';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';


const UserEventBasicInfo = () => {
  const dispatch = useDispatch();
  const eventId = useParams().eventId;
  const [userJoinEvent, setUserJoinEvent] = useState([]);

  const body={
    eventId:eventId
  }

  useEffect(()=>{
    dispatch(loadUserEventJoin(body))
    .then(response=>{
      if(response.payload.success){
        const tempEvent = response.payload.event;
        if(tempEvent.noLimitDate!==true){//응답기간에 제한이 있을경우에만
          const today = new Date();
          console.log(tempEvent)
          console.log(tempEvent.startDate > today.toISOString());
          console.log(tempEvent.endDate < today.toISOString());
          if(tempEvent.startDate > today.toISOString() || today.toISOString() > tempEvent.endDate  ){
            console.log("이벤트 참여 기간이 아닙니다.");
          }
        }

        setUserJoinEvent(response.payload.event);
      }
      else{
        console.log(response.payload.err);
      }
    })
  }, [])


  return (
    <>
      <Box
        component="div"
        fontSize={36}
        mt={2.5}
      >
        {userJoinEvent.title}
      </Box>
      <SectionTitle title={"이벤트 설명"} sx={{ mt: 12 }} />
      <Box>{userJoinEvent.description}</Box>
      <SectionTitle title={"이벤트 기간"} sx={{ mt: 6 }}/>
      {userJoinEvent.noLimitDate===true && (
        <Box>
          제한없음
        </Box>
      )}
      {userJoinEvent.noLimitDate===false && (
        <Box>
          {moment(userJoinEvent.startDate).format('YYYY-MM-DD HH:mm:ss')} ~ {moment(userJoinEvent.endDate).format('YYYY-MM-DD HH:mm:ss')}
        </Box>
      )}
    </>
  );
}

export default UserEventBasicInfo;