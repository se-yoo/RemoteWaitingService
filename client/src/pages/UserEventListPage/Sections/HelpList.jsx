import React from 'react';
import HelpListItem from './HelpListItem';
import { EVENT_STATUS_COLOR } from '../../../utils/code';
import { Box } from '@mui/material';

const helpInfos = [
  { color: EVENT_STATUS_COLOR.IN_PROGRESS, text: "진행중" },
  { color: EVENT_STATUS_COLOR.ENDED, text: "마감" }
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