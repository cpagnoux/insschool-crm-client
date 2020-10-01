import React from 'react';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';

interface Props {
  name: string;
  label: string;
  autoFocus?: boolean;
}

const Textarea: React.FC<Props> = ({ name, label, autoFocus = false }) => (
  <Field
    component={TextField}
    name={name}
    label={label}
    multiline
    fullWidth
    autoFocus={autoFocus}
  />
);

export default Textarea;
