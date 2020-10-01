import React from 'react';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';

interface Props {
  name: string;
  label: string;
  type?: string;
  autoFocus?: boolean;
}

const Input: React.FC<Props> = ({
  name,
  label,
  type = 'text',
  autoFocus = false,
}) => (
  <Field
    component={TextField}
    name={name}
    label={label}
    type={type}
    fullWidth
    autoFocus={autoFocus}
  />
);

export default Input;
