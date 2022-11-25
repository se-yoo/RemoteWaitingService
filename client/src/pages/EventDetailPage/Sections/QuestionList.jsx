import { List } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import SectionTitle from '../../../components/SectionTitle';
import QuestionListItem from './QuestionListItem';

const QuestionList = () => {
  const questions = useSelector(state => state.event.questions);

  return (
    <>
      <SectionTitle title="이벤트 문항" sx={{ mt: 6 }} />
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
};

export default QuestionList;