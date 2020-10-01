import React from 'react';
import { Field } from 'formik';
import { MenuItem } from '@material-ui/core';
import { TextField } from 'formik-material-ui';

interface Option {
  label: string;
  value: string | number;
}

interface Props {
  name: string;
  label: string;
  options: Option[];
  autoFocus?: boolean;
}

const Select: React.FC<Props> = ({
  name,
  label,
  options,
  autoFocus = false,
}) => (
  <Field
    component={TextField}
    name={name}
    label={label}
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
  </Field>
);

export default Select;
