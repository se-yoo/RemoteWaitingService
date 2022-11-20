import React, { useState }  from 'react';
import { Checkbox,FormControlLabel, Grid, Button } from '@mui/material';
import UserEventBasicInfo from '../UserEventDetailPage/Sections/UserEventBasicInfo';
import MenuTitle from '../../components/MenuTitle';
import JoinQuestionList from './Sections/JoinQuestionList';

const tempEvent = { 
  id: 1, 
  title: '제목없는 이벤트', 
  description: '이벤트 설명입니다 이벤트 설명입니다 이벤트 설명입니다',
  participantCnt: 10, 
  createDate: '2022-09-27', 
  startDate: '2022-09-27 15:00',
  endDate: '2022-10-05 18:00',
  option: 0 
}

const UserEventJoinPage = () =>{
  const [isChecked, setisChecked] = useState(false);

  const CheckedHandler = () => {
      setisChecked(!isChecked);

    };

  return(
    <>
      <MenuTitle title={"이벤트 참여"} />
      <UserEventBasicInfo eventContent={tempEvent}/>
      <JoinQuestionList />
      <FormControlLabel control={<Checkbox checked={isChecked} sx={{
          color: "#496F46",
          '&.Mui-checked': {
            color: "#496F46"
          }
        }}/>} 
        onChange={CheckedHandler} label="개인정보 수집 이용에 동의합니다." 
      />

      <Grid
        container
        justifyContent="end"
        sx={{ mt: 6 }}
      >
        <Button sx={{ width: 200, ml: 2 }}>
          참여
        </Button>
      </Grid>
    </>
  );
};

export default UserEventJoinPage;