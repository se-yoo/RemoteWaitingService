import React from 'react';
import UserNoticeInfo from './Sections/UserNoticeInfo';
import UserEventBasicInfo from './Sections/UserEventBasicInfo';
import UserEventJoinInfo from './Sections/UserEventJoinInfo';
import MenuTitle from '../../components/MenuTitle';



const userEventQuestionList = [
  { id: 'question-1', question: '이름', required: true, answerType: 0 },
  { id: 'question-2', question: '성별', required: true, answerType: 4, options: [{ text: '남성', value: 1 }, { text: '여성', value: 2 }] }
];

const userEventAnswer = {
   id: 1, participantDate: '2022-09-26 15:00:01.002', status: 0, answers: ['홍길동', 1] 
};

const tempEvent = { 
  id: 1, 
  title: '제목없는 이벤트', 
  description: '이벤트 설명입니다 이벤트 설명입니다 이벤트 설명입니다',
  participantCnt: 10, 
  createDate: '2022-09-27', 
  startDate: '2022-09-27 15:00',
  endDate: '2022-10-05 18:00',
  option: 0,
  result_option: 1
}


const UserEventDetailPage = () => {



  return (
    <>
      <MenuTitle title={"이벤트 상세"} />
      <UserEventBasicInfo eventContent={tempEvent}/>
      <UserEventJoinInfo eventQuestion={userEventQuestionList} eventAnswer={userEventAnswer} eventResult={tempEvent.result_option}/>
      <UserNoticeInfo />
    </>
  );
};

export default UserEventDetailPage;