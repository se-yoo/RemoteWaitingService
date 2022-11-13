import { List } from '@mui/material';
import React, { memo, useCallback } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { useDispatch, useSelector } from 'react-redux';
import QuestionListItem from './QuestionListItem';
import { moveEventQuestion } from '../../../store/actions/event_actions';


const SortableItem = SortableElement(({ itemIdx }) => (
  <QuestionListItem
    itemIdx={itemIdx} 
  />
));

const SortableList = SortableContainer(({ items, sx }) => {
  return (
    <List sx={sx}>
      {items.map((question, index) => (
        <SortableItem 
          key={question.id}
          index={index}
          itemIdx={index} 
        />)
      )}
    </List>
  );
});

const QuestionList = memo(({ sx }) => {
  const questions = useSelector(state => state.event.questions);
  const dipatch = useDispatch();

  const onSortEnd = useCallback((moveInfo) => {
    dipatch(moveEventQuestion(questions, moveInfo));
  }, [questions]);

  return (
    <SortableList
      useDragHandle
      sx={sx}
      items={questions}
      onSortEnd={onSortEnd}
    />
  );
});

export default QuestionList;