import { Button, Grid, TextField } from '@mui/material';
import React, { memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

const EditQuestionListItemFormOption = memo((props) => {
  const { idx, onChangeOptions } = props;
  const question = useSelector(state => state.event.questions[idx]);
  const { options } = question;

  const onChangeOption = useCallback((e, index) => {
    const newOption = {
      ...options[index],
      text: e.target.value
    };
    let newOptions = [...options];

    newOptions.splice(index, 1, newOption);
    onChangeOptions(newOptions);
  }, [options, onChangeOptions]);
  
  const onClickAddOption = useCallback(() => {
    let optionValue = 1;

    if(options && options.length > 0) {
      optionValue = options[options.length - 1].value + 1;
    }

    const newOption = {
      value: optionValue,
      text: "새로운 답변"
    };
    let newOptions = [...(options || []), newOption];
    onChangeOptions(newOptions);
  }, [options, onChangeOptions]);

  return useMemo(() => (
    <Grid
      container
      justifyContent="end"
      spacing={2}
      sx={{ pr: 2, mt: 0 }}
    >
      <Grid item xs={9}>
        {options && options.map((option, index) => (
          <TextField
            key={option.value}
            value={option.text}
            sx={{ mb: 2 }}
            onChange={(e) => {onChangeOption(e, index)}}
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
  ), [options, idx]);
});

export default EditQuestionListItemFormOption;