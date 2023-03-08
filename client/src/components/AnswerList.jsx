import { List } from '@mui/material';
import React, { memo } from 'react';
import AnswerListItem from './AnswerListItem';

const AnswerList = memo((props) => {
  const { questions, answers, hideRequired } = props;

  return (
    <List>
      {questions.map((question, index) => (
        <AnswerListItem
          key={index}
          index={index + 1}
          question={question}
          answer={answers[index]}
          hideRequired={hideRequired}
        />
      ))}
    </List>
  );
});

export default AnswerList;