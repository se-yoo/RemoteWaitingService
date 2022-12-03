import { List } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SectionTitle from '../../../components/SectionTitle';
import JoinQuestionListItem from './JoinQuestionListItem';
import { loadUserEventJoin } from '../../../store/actions/event_actions';
import { useParams } from 'react-router-dom';



const QuestionList = (props) => {
  const dispatch = useDispatch();
  const { value, onChangeAnswer, required, onChangeRequired } = props;
  const [eventQuestionList,setEventQuestionList]=useState([]);
  const eventId = useParams().eventId;
  const body={
    eventId:eventId
  }
  
  useEffect(()=>{
    dispatch(loadUserEventJoin(body))
    .then(response=>{
      if(response.payload.success){
        setEventQuestionList(response.payload.eventQuestion);
      }
      else{
        console.log(response.payload.err);
      }
    })
  }, [])

  return (
    <>
      <SectionTitle title="참여 정보" sx={{ mt: 6 }} />
      <List>
        {eventQuestionList.map((question, index) => (
          <JoinQuestionListItem
            key={index}
            index={index + 1}
            question={question}
            answerItem={value}
            onChangeItem={onChangeAnswer}
            itemRequired={required}
            onChangeItemRequired={onChangeRequired}
          />
        ))}
      </List>
    </>
  );
};

export default QuestionList;