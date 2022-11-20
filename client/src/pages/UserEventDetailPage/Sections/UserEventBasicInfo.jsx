import React from 'react';
import { Box } from '@mui/material';
import SectionTitle from '../../../components/SectionTitle';



const UserEventBasicInfo = (props) => {
  const {eventContent} = props;
  const { 
    title, 
    description,
    createDate, 
    startDate,
    endDate
  } = eventContent;


  return (
    <>
      <Box
        component="div"
        fontSize={36}
        mt={2.5}
      >
        {title}
      </Box>
      <SectionTitle title={"이벤트 설명"} sx={{ mt: 12 }} />
      <Box>{description}</Box>
      <SectionTitle title={"이벤트 기간"} sx={{ mt: 6 }}/>
      <Box>{startDate} ~ {endDate}</Box>
    </>
  );
}

export default UserEventBasicInfo;