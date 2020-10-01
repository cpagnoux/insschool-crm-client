import React from 'react';
import { Field } from 'formik';
import { CheckboxWithLabel } from 'formik-material-ui';

interface Props {
  name: string;
  label: string;
  autoFocus?: boolean;
}

const Checkbox: React.FC<Props> = ({ name, label, autoFocus = false }) => (
  <Field
    component={CheckboxWithLabel}
    name={name}
    Label={{ label }}
    autoFocus={autoFocus}
  />
);

export default Checkbox;
