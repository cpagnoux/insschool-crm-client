import React from 'react';
import { Field } from 'formik';
import { KeyboardDatePicker } from 'formik-material-ui-pickers';

interface Props {
  name: string;
  label: string;
  disableFuture?: boolean;
  autoFocus?: boolean;
}

const DatePicker: React.FC<Props> = ({
  name,
  label,
  disableFuture = false,
  autoFocus = false,
}) => (
  <Field
    component={KeyboardDatePicker}
    name={name}
    label={label}
    format="dd/MM/yyyy"
    disableFuture={disableFuture}
    clearable
    fullWidth
    autoFocus={autoFocus}
  />
);

export default DatePicker;
