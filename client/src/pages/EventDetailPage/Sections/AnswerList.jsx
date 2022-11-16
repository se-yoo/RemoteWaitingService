import { List } from '@mui/material';
import React from 'react';
import AnswerListItem from './AnswerListItem';

const AnswerList = (props) => {
  const { questions, answers } = props;

  return (
    <List>
      {questions.map((question, index) => (
        <AnswerListItem
          key={index}
          index={index + 1}
          question={question}
          answer={answers[index]}
        />
      ))}
    </List>
  );
};

export default AnswerList;