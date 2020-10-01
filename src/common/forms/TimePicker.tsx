import React from 'react';
import { Field } from 'formik';
import { KeyboardTimePicker } from 'formik-material-ui-pickers';

interface Props {
  name: string;
  label: string;
  autoFocus?: boolean;
}

const TimePicker: React.FC<Props> = ({ name, label, autoFocus = false }) => (
  <Field
    component={KeyboardTimePicker}
    name={name}
    label={label}
    ampm={false}
    minutesStep={5}
    clearable
    fullWidth
    autoFocus={autoFocus}
  />
);

export default TimePicker;
