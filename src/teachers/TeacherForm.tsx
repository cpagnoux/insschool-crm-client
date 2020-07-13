import React from 'react';
import { FormikErrors, FormikHelpers } from 'formik';
import { Grid } from '@material-ui/core';

import {
  DatePicker,
  Form,
  Input,
  SubmitButton,
} from '../common/forms';
import { formErrors } from '../constants';

export interface Values {
  last_name: string;
  first_name: string;
  birth_date: Date | null;
  address: string;
  zip_code: string;
  city: string;
  mobile: string;
  phone: string;
  email: string;
}

interface Props {
  initialValues?: Values;
  onSubmit: (values: Values, actions: FormikHelpers<Values>) => void;
}

const TeacherForm: React.FC<Props> = ({ initialValues, onSubmit }) => {
  /* eslint-disable @typescript-eslint/camelcase */
  const defaultInitialValues: Values = {
    last_name: '',
    first_name: '',
    birth_date: null,
    address: '',
    zip_code: '',
    city: '',
    mobile: '',
    phone: '',
    email: '',
  };

  const validate = (values: Values) => {
    const errors: FormikErrors<Values> = {};

    if (!values.last_name) {
      errors.last_name = formErrors.fieldRequired;
    }

    if (!values.first_name) {
      errors.first_name = formErrors.fieldRequired;
    }

    return errors;
  };
  /* eslint-enable @typescript-eslint/camelcase */

  return (
    <Form
      initialValues={initialValues || defaultInitialValues}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <>
          <Input
            name="last_name"
            label="Nom"
            autoFocus
          />
          <Input
            name="first_name"
            label="Prénom"
          />
          <DatePicker
            name="birth_date"
            label="Date de naissance"
            disableFuture
          />
          <Input
            name="address"
            label="Adresse"
          />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Input
                name="zip_code"
                label="Code postal"
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                name="city"
                label="Ville"
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Input
                name="mobile"
                label="Portable"
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                name="phone"
                label="Fixe"
              />
            </Grid>
          </Grid>
          <Input
            name="email"
            label="Email"
          />
          <SubmitButton disabled={isSubmitting} />
        </>
      )}
    </Form>
  );
};

export default TeacherForm;
