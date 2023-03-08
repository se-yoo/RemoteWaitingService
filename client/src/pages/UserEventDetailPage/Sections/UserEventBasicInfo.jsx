import React, { useEffect, useState }  from 'react';
import { Box } from '@mui/material';
import SectionTitle from '../../../components/SectionTitle';
import { loadUserEventJoin } from '../../../store/actions/event_actions';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';


const UserEventBasicInfo = (props) => {
  const { type } = props
  const dispatch = useDispatch();
  const eventId = useParams().eventId;
  const [userEvent, setUserEvent] = useState([]);
  const navigate = useNavigate();

  const body={
    eventId:eventId
  }

  useEffect(()=>{
    dispatch(loadUserEventJoin(body))
    .then(response=>{
      if(response.payload.success){
        if(type==="join"){
          const tempEvent = response.payload.event;
          if(tempEvent.noLimitDate!==true){//응답기간에 제한이 있을경우에만
            const today = new Date();
            //console.log(tempEvent)
            //console.log(tempEvent.startDate > today.toISOString());
            //console.log(tempEvent.endDate < today.toISOString());
            if(tempEvent.startDate > today.toISOString() || today.toISOString() > tempEvent.endDate  ){
              console.log("이벤트 참여 기간이 아닙니다.");
              navigate("/end");
            }
          }
        }
        
        setUserEvent(response.payload.event);
      }
      else{
        navigate("/default");
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
        {userEvent.title}
      </Box>
      <SectionTitle title={"이벤트 설명"} sx={{ mt: 12 }} />
      <Box>{userEvent.description}</Box>
      <SectionTitle title={"이벤트 기간"} sx={{ mt: 6 }}/>
      {userEvent.noLimitDate===true && (
        <Box>
          제한없음
        </Box>
      )}
      {userEvent.noLimitDate===false && (
        <Box>
          {moment(userEvent.startDate).format('YYYY-MM-DD HH:mm:ss')} ~ {moment(userEvent.endDate).format('YYYY-MM-DD HH:mm:ss')}
        </Box>
      )}
    </>
  );
}

UserEventBasicInfo.defaultProps = {
  type:null
}


export default UserEventBasicInfo;