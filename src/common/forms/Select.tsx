import React from 'react';
import { MenuItem, TextField } from '@material-ui/core';

interface Option {
  label: string;
  value: string | number;
}

interface Props {
  name: string;
  label: string;
  options: Option[];
  defaultValue?: string;
  inputRef?: any;
  autoFocus?: boolean;
}

const Select: React.FC<Props> = ({
  name,
  label,
  options,
  defaultValue,
  inputRef,
  autoFocus = false,
}) => (
  <TextField
    name={name}
    label={label}
    defaultValue={defaultValue}
    inputRef={inputRef}
    select
    fullWidth
    autoFocus={autoFocus}
  >
    <MenuItem value="" />
    {options.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </TextField>
);

export default Select;
