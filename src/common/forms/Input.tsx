import React from 'react';
import { TextField } from '@material-ui/core';

interface Props {
  name: string;
  label: string;
  defaultValue?: string | number | null;
  inputRef?: any;
  type?: string;
  autoFocus?: boolean;
}

const Input: React.FC<Props> = ({
  name,
  label,
  defaultValue,
  inputRef,
  type = 'text',
  autoFocus = false,
}) => (
  <TextField
    name={name}
    label={label}
    defaultValue={defaultValue}
    inputRef={inputRef}
    type={type}
    fullWidth
    autoFocus={autoFocus}
  />
);

export default Input;
