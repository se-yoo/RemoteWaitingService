import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import Auth from "../../hoc/Auth";
import { terms } from "../../utils/resource";

const JoinPage = () => {
  const [agree, setAgree] = useState(false);

  const onChangeAgree = useCallback((e) => {
    setAgree(e.target.checked);
  }, []);

  return (
    <Box className="com-center-area">
      <Box component="h1">회원가입</Box>
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
      >
        회원가입
      </Button>
    </Box>
  );
};

export default Auth(JoinPage, false);
