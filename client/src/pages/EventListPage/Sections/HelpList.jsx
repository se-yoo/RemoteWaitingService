import React from 'react';
import HelpListItem from './HelpListItem';
import { eventStatusColor } from '../../../utils/code';
import { Box } from '@mui/material';

const helpInfos = [
  { color: eventStatusColor.OPEN_SOON, text: "오픈 예정" },
  { color: eventStatusColor.IN_PROGRESS, text: "진행중" },
  { color: eventStatusColor.ENDED, text: "마감" }
]

const HelpList = () => {
  return (
    <Box display="flex" justifyContent="end">
      {helpInfos.map((info, i) => { 
        return (
          <HelpListItem key={i} color={info.color} text={info.text} />
        )
      })}
    </Box>
  );
};

export default HelpList;