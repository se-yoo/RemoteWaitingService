import React, { useCallback, useState } from "react";
import { Box } from "@mui/material";
import JoinTerms from "./Sections/JoinTerms";
import JoinForm from "./Sections/JoinForm";
import Auth from "../../hoc/Auth";
import { JOIN_STEP } from "../../utils/code";

const JoinPage = () => {
  const [step, setStep] = useState(JOIN_STEP.TERMS);

  const onClickNext = useCallback(() => {
    setStep(JOIN_STEP.INPUT);
  }, []);

  return (
    <Box className="com-center-area">
      <Box component="h1">회원가입</Box>
      {step === JOIN_STEP.TERMS ?
        <JoinTerms onClickNext={onClickNext} />
        : <JoinForm />
      }
    </Box >
  );
};

export default Auth(JoinPage, false);
