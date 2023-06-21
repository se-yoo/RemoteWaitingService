import { Button, Grid, IconButton, TextField } from "@mui/material";
import React, { memo, useCallback, useMemo } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import { ERR_EVENT_NO_RESET } from "../../../store/actions/types";

const EditQuestionListItemFormOption = memo((props) => {
  const { index, onChangeOptions } = props;
  const question = useSelector((state) => state.event.questions[index]);
  const { options } = question;
  const dispatch = useDispatch();

  const onChangeOption = useCallback(
    (e, index) => {
      const newOption = {
        ...options[index],
        text: e.target.value,
      };
      let newOptions = [...options];

      newOptions.splice(index, 1, newOption);
      onChangeOptions(newOptions);
    },
    [options, onChangeOptions],
  );

  const onClickAddOption = useCallback(() => {
    let optionValue = 1;

    if (options && options.length > 0) {
      optionValue = options[options.length - 1].value + 1;
    }

    const newOption = {
      value: optionValue,
      text: "새로운 답변",
    };
    let newOptions = [...(options || []), newOption];
    onChangeOptions(newOptions);
  }, [options, onChangeOptions]);

  const onClickDeleteOption = useCallback(
    (index) => {
      if (options.length === 1) {
        dispatch({
          type: ERR_EVENT_NO_RESET,
          payload: {
            closing: true,
            message: "답변은 최소 한개 이상 존재해야 합니다.",
          },
        });
        return;
      }

      let newOptions = [...options];
      newOptions.splice(index, 1);

      onChangeOptions(newOptions);
    },
    [options, options.length, onChangeOptions],
  );

  return useMemo(
    () => (
      <>
        <Grid
          container
          justifyContent="end"
          spacing={2}
          sx={{ pr: 2, mt: { xs: 2, md: 0 } }}
        >
          <Grid item xs={11} md={9}>
            {options &&
              options.map((option, index) => (
                <TextField
                  key={option.value}
                  value={option.text}
                  sx={{ mb: 2 }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => {
                          onClickDeleteOption(index);
                        }}
                      >
                        <DeleteOutlineIcon color="primary" />
                      </IconButton>
                    ),
                  }}
                  onChange={(e) => {
                    onChangeOption(e, index);
                  }}
                />
              ))}
            <Button
              variant="text"
              sx={{ fontSize: 16 }}
              onClick={onClickAddOption}
            >
              + 답변 추가
            </Button>
          </Grid>
        </Grid>
      </>
    ),
    [options, index],
  );
});

export default EditQuestionListItemFormOption;
