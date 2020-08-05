import React from 'react';
import { FormikErrors, FormikHelpers } from 'formik';
import { Grid, Link } from '@material-ui/core';

import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  SubmitButton,
} from '../common/forms';
import { MediumOfKnowledge, formErrors } from '../constants';
import PreRegistrationInfo from './PreRegistrationInfo';

export interface Values {
  last_name: string;
  first_name: string;
  birth_date: Date | null;
  address: string;
  zip_code: string;
  city: string;
  mobile: string;
  phone: string;
  mobile_father: string;
  mobile_mother: string;
  email: string;
  with_lessons: boolean;
  medium_of_knowledge: string;
}

interface Props {
  initialValues?: Values;
  onSubmit: (values: Values, actions: FormikHelpers<Values>) => void;
}

const PreRegistrationForm: React.FC<Props> = ({ initialValues, onSubmit }) => {
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
    mobile_father: '',
    mobile_mother: '',
    email: '',
    with_lessons: false,
    medium_of_knowledge: '',
  };

  const validate = (values: Values) => {
    const errors: FormikErrors<Values> = {};

    if (!values.last_name) {
      errors.last_name = formErrors.fieldRequired;
    }

    if (!values.first_name) {
      errors.first_name = formErrors.fieldRequired;
    }

    if (!values.birth_date) {
      errors.birth_date = formErrors.fieldRequired;
    }

    if (!values.address) {
      errors.address = formErrors.fieldRequired;
    }

    if (!values.zip_code) {
      errors.zip_code = formErrors.fieldRequired;
    }

    if (!values.city) {
      errors.city = formErrors.fieldRequired;
    }

    if (!values.medium_of_knowledge) {
      errors.medium_of_knowledge = formErrors.fieldRequired;
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
          <Link href="http://www.insschool.fr/">
            {"Retour vers le site d'INS School"}
          </Link>
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
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Input
                name="mobile_father"
                label="Portable père"
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                name="mobile_mother"
                label="Portable mère"
              />
            </Grid>
          </Grid>
          <Input
            name="email"
            label="Email"
          />
          <Checkbox
            name="with_lessons"
            label="Souhaitez-vous participer à des cours ?"
          />
          <Select
            name="medium_of_knowledge"
            label="Comment nous avez-vous connus ?"
            options={Object.entries(MediumOfKnowledge).map(
              ([key, value]) => ({
                label: value,
                value: key,
              }),
            )}
          />
          <PreRegistrationInfo />
          <SubmitButton disabled={isSubmitting} />
        </>
      )}
    </Form>
  );
};

export default PreRegistrationForm;
