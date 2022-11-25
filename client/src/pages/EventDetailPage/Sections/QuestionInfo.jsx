import React from 'react';
import { useSelector } from 'react-redux';
import SectionTitle from '../../../components/SectionTitle';
import QuestionList from '../../../components/QuestionList';

const QuestionInfo = () => {
  const questions = useSelector(state => state.event.questions);

  return (
    <>
      <SectionTitle title="이벤트 문항" sx={{ mt: 6 }} />
      <QuestionList questions={questions} />
    </>
  );
};

export default QuestionInfo;