import React from 'react';
import { FormikErrors, FormikHelpers } from 'formik';
import { Grid } from '@material-ui/core';

import { Form, Input, SubmitButton } from '../common/forms';
import { formErrors } from '../constants';

export interface Values {
  name: string;
  address: string;
  zip_code: string;
  city: string;
}

interface Props {
  initialValues?: Values;
  onSubmit: (values: Values, actions: FormikHelpers<Values>) => void;
}

const RoomForm: React.FC<Props> = ({ initialValues, onSubmit }) => {
  /* eslint-disable @typescript-eslint/camelcase */
  const defaultInitialValues: Values = {
    name: '',
    address: '',
    zip_code: '',
    city: '',
  };
  /* eslint-enable @typescript-eslint/camelcase */

  const validate = (values: Values) => {
    const errors: FormikErrors<Values> = {};

    if (!values.name) {
      errors.name = formErrors.fieldRequired;
    }

    return errors;
  };

  return (
    <Form
      initialValues={initialValues || defaultInitialValues}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <>
          <Input
            name="name"
            label="Nom"
            autoFocus
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
          <SubmitButton disabled={isSubmitting} />
        </>
      )}
    </Form>
  );
};

export default RoomForm;
