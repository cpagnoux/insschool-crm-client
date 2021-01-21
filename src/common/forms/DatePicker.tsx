import React from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';

interface Props {
  name: string;
  label: string;
  defaultValue?: Date | null;
  inputRef?: any;
  disableFuture?: boolean;
  autoFocus?: boolean;
}

const DatePicker: React.FC<Props> = ({
  name,
  label,
  defaultValue,
  inputRef,
  disableFuture = false,
  autoFocus = false,
}) => (
  <KeyboardDatePicker
    name={name}
    label={label}
    defaultValue={defaultValue}
    inputRef={inputRef}
    format="dd/MM/yyyy"
    disableFuture={disableFuture}
    clearable
    fullWidth
    autoFocus={autoFocus}
    value={null}
    onChange={() => null}
  />
);

export default DatePicker;
