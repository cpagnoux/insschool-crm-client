import React from 'react';
import { KeyboardTimePicker } from '@material-ui/pickers';

interface Props {
  name: string;
  label: string;
  defaultValue?: Date | null;
  inputRef?: any;
  autoFocus?: boolean;
}

const TimePicker: React.FC<Props> = ({
  name,
  label,
  defaultValue,
  inputRef,
  autoFocus = false,
}) => (
  <KeyboardTimePicker
    name={name}
    label={label}
    defaultValue={defaultValue}
    inputRef={inputRef}
    ampm={false}
    minutesStep={5}
    clearable
    fullWidth
    autoFocus={autoFocus}
    value={null}
    onChange={() => null}
  />
);

export default TimePicker;
