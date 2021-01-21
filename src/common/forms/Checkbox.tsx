import React from 'react';
import { Checkbox as BaseCheckbox, FormControlLabel } from '@material-ui/core';

interface Props {
  name: string;
  label: string;
  defaultValue?: boolean;
  inputRef?: any;
}

const Checkbox: React.FC<Props> = ({
  name,
  label,
  defaultValue,
  inputRef,
}) => (
  <FormControlLabel
    control={
      <BaseCheckbox name={name} checked={defaultValue} inputRef={inputRef} />
    }
    label={label}
  />
);

export default Checkbox;
