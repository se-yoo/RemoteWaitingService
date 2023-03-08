import { List } from '@mui/material';
import React, { memo } from 'react';
import QuestionListItem from './QuestionListItem';

const QuestionList = memo((props) => {
  const { questions } = props;

  return (
    <>
      <List>
        {questions.map((question, index) => (
          <QuestionListItem
            key={question._id}
            index={index + 1}
            question={question}
          />
        ))}
      </List>
    </>
  );
});

export default QuestionList;