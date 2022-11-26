import { TableCell, TableRow } from '@mui/material';
import React, { memo } from 'react';
import { ANSWER_TYPE } from '../../../utils/code';
import { formatDatetime } from '../../../utils/function';

const answerText = (question, answer) => {
  switch(question.answerType) {
    case ANSWER_TYPE.TEXT:
    case ANSWER_TYPE.TEXT_TELNO:
    case ANSWER_TYPE.TEXT_EMAIL:
    case ANSWER_TYPE.TEXTAREA:
    case ANSWER_TYPE.DATE:
      return answer;
    case ANSWER_TYPE.RADIO: {
      const answerOption = question.options.find(option => option.value === answer);
      return answerOption ? answerOption.text : '알 수 없음';
    }
    case ANSWER_TYPE.CHECKBOX: {
      const answerArray = typeof answer === 'object' ? answer : [answer];
      const answers = question.options.filter(option => 
        answerArray.includes(option.value) 
      );
      return answers.map(answer => answer.text).join(', ');
    }
    default: 
      return answer;
  }
};

const AllAnswerDialogContentRow = memo((props) => {
  const { item, index, questions } = props;

  return (
    <TableRow>
      <TableCell align="center">{index}</TableCell>
      {questions.map((question, i) => (
        <TableCell 
          key={question.id}
          align="left"
        >
          {answerText(question, item.answers[i]) || "-"}
        </TableCell>
      ))}
      <TableCell align="center">
        {formatDatetime(item.participantDate)}
      </TableCell>
    </TableRow>
  );
});

export default AllAnswerDialogContentRow;