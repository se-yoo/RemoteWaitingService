import { TableCell, TableRow } from '@mui/material';
import React, { memo } from 'react';

const NoticeInfoTableRow = memo((props) => {
  const { item, index } = props;

  return (
    <TableRow>
      <TableCell align="center">{index}</TableCell>
      <TableCell align="left">{item.title}</TableCell>
      <TableCell align="center">{item.createDate}</TableCell>
    </TableRow>
  );
});

export default NoticeInfoTableRow;