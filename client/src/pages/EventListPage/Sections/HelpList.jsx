import React from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import HelpListItem from './HelpListItem';
import { EVENT_STATUS_COLOR } from '../../../utils/code';

const helpInfos = [
  { color: EVENT_STATUS_COLOR.OPEN_SOON, text: "오픈 예정", authAdmin: true },
  { color: EVENT_STATUS_COLOR.IN_PROGRESS, text: "진행중" },
  { color: EVENT_STATUS_COLOR.ENDED, text: "마감" }
]

const HelpList = () => {
  const userData = useSelector(state => state.user.userData);
  const { isAdmin } = userData || { isAdmin: false };

  return (
    <Box display="flex" justifyContent="end">
      {helpInfos
        .filter(info => !isAdmin ? !info.authAdmin : true)
        .map((info, i) => {
          return (
            <HelpListItem key={i} color={info.color} text={info.text} />
          )
        })
      }
    </Box>
  );
};

export default HelpList;