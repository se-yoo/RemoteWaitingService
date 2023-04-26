import { List } from "@mui/material";
import React, { memo } from "react";
import QuestionListItem from "./QuestionListItem";

const QuestionList = memo((props) => {
  const { questions, form, formStatus } = props;

  return (
    <>
      <List>
        {questions.map((question, index) => (
          <QuestionListItem
            key={question._id}
            index={index}
            question={question}
            formItem={form}
            error={formStatus[index] !== undefined}
            helperText={formStatus[index]}
          />
        ))}
      </List>
    </>
  );
});

QuestionList.defaultProps = {
  form: false,
  formStatus: [],
};

export default QuestionList;
