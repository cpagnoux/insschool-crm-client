import React from 'react';
import { FormikErrors, FormikHelpers } from 'formik';
import { Grid } from '@material-ui/core';

import {
  Form,
  Input,
  SubmitButton,
  Textarea,
} from '../common/forms';

export interface Values {
  name: string;
  description: string;
  price: number | null;
  stock: number | null;
}

interface Props {
  initialValues?: Values;
  onSubmit: (values: Values, actions: FormikHelpers<Values>) => void;
}

const ProductForm: React.FC<Props> = ({ initialValues, onSubmit }) => {
  const defaultInitialValues: Values = {
    name: '',
    description: '',
    price: null,
    stock: null,
  };

  const validate = (values: Values) => {
    const errors: FormikErrors<Values> = {};

    if (!values.name) {
      errors.name = 'La désignation est requise';
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
            label="Désignation"
            autoFocus
          />
          <Textarea
            name="description"
            label="Description"
          />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Input
                name="price"
                label="Prix"
                type="number"
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                name="stock"
                label="Stock"
                type="number"
              />
            </Grid>
          </Grid>
          <SubmitButton disabled={isSubmitting} />
        </>
      )}
    </Form>
  );
};

export default ProductForm;
