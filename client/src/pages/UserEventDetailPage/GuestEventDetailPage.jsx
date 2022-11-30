import React, { useEffect, useState } from 'react';
import UserEventBasicInfo from './Sections/UserEventBasicInfo';
import UserEventJoinInfo from './Sections/UserEventJoinInfo';
import MenuTitle from '../../components/MenuTitle';
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { loadUserEventDetail } from '../../store/actions/answer_actions';
import Auth from '../../hoc/Auth';
import { Box } from '@mui/material';



const GuestEventDetailPage = () => {
  const dispatch = useDispatch();

  const [eventDetail, setEventDetail] = useState([]);

  const eventId = useParams().eventId;
  const userId = useParams().userId;

  const body={
    eventId:eventId,
    userId:userId
  }

  useEffect(()=>{
    dispatch(loadUserEventDetail(body))
    .then(response=>{
      if(response.payload.success){
        setEventDetail(response.payload.eventDetail);
        //console.log("eventDetail : "+response.payload.success);
        //console.log("eventDetail : "+ JSON.stringify(response.payload.eventDetail));
      }
      else{
        console.log(response.payload.err);
      }
    })
  }, [dispatch])


  return (
    <Box
      sx={{ 
        width: {
          xs: '100%',
          md: '80%',
          xl: '70%'
        },
        margin: {
          xs: '16px',
          sm: '32px',
          md: '32px auto',
          xl: '70px auto'
        }
      }}
    >
      <MenuTitle title={"이벤트 상세"} />
      <UserEventBasicInfo />
      {eventDetail.map(event=>(
        <UserEventJoinInfo key={event._id} eventDetail={event} />
      ))}
      
    </Box>
  );
};

export default Auth(GuestEventDetailPage,false);