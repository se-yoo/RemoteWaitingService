import React, { useState, useCallback } from "react";
import {
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
} from "@mui/material";
import { terms } from "../../../utils/resource";

const JoinTerms = (props) => {
  const { onClickNext } = props;
  const [agree, setAgree] = useState(false);

  const onChangeAgree = useCallback((e) => {
    setAgree(e.target.checked);
  }, []);

  return (
    <>
      <TextField
        value={terms}
        multiline
        maxRows="20"
        InputProps={{
          readOnly: true,
          disabled: true,
        }}
      />
      <FormControlLabel
        label="동의합니다."
        sx={{ marginRight: "auto", marginTop: "1em" }}
        control={<Checkbox checked={agree} onChange={onChangeAgree} />}
      />
      <Button
        disabled={!agree}
        sx={{
          height: "90px",
          fontSize: "32px",
          mt: 4,
        }}
        fullWidth
        onClick={onClickNext}
      >
        다음
      </Button>
    </>
  );
};

export default JoinTerms;