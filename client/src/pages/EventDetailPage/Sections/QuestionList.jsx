import { List } from '@mui/material';
import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import QuestionListItem from './QuestionListItem';

// 화면 작업을 위한 임시 값, 추후 삭제
const tempEventQuestionList = [
  { id: 'question-1', question: '이름', required: true, answerType: 0 },
  { id: 'question-2', question: '성별', required: true, answerType: 4, options: [{ text: '남성', value: 1 }, { text: '여성', value: 2 }] }
];

const QuestionList = () => {
  return (
    <>
      <SectionTitle title="이벤트 문항" sx={{ mt: 6 }} />
      <List>
        {tempEventQuestionList.map((question, index) => (
          <QuestionListItem
            key={index}
            index={index + 1}
            question={question}
          />
        ))}
      </List>
    </>
  );
};

export default QuestionList;