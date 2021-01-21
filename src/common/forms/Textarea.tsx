import React from 'react';
import { TextField } from '@material-ui/core';

interface Props {
  name: string;
  label: string;
  defaultValue?: string;
  inputRef?: any;
  autoFocus?: boolean;
}

const Textarea: React.FC<Props> = ({
  name,
  label,
  defaultValue,
  inputRef,
  autoFocus = false,
}) => (
  <TextField
    name={name}
    label={label}
    defaultValue={defaultValue}
    inputRef={inputRef}
    multiline
    fullWidth
    autoFocus={autoFocus}
  />
);

export default Textarea;
