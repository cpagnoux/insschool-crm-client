import React from 'react';
import { useForm } from 'react-hook-form';
import { Grid } from '@material-ui/core';

import {
  DatePicker,
  Form,
  Input,
  SubmitButton,
} from '../common/forms';
import { formErrors } from '../constants';

export interface FormData {
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
  initialValues?: FormData;
  onSubmit: (data: FormData) => void;
}

const TeacherForm: React.FC<Props> = ({ initialValues, onSubmit }) => {
  const { register, handleSubmit, errors } = useForm<FormData>();

  /* eslint-disable @typescript-eslint/camelcase */
  const defaultValues: FormData = initialValues || {
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
  /* eslint-enable @typescript-eslint/camelcase */

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="last_name"
        label="Nom"
        defaultValue={defaultValues.last_name}
        inputRef={register({ required: true })}
        autoFocus
      />
      {errors.last_name && formErrors.fieldRequired}
      <Input
        name="first_name"
        label="Prénom"
        defaultValue={defaultValues.first_name}
        inputRef={register({ required: true })}
      />
      {errors.first_name && formErrors.fieldRequired}
      <DatePicker
        name="birth_date"
        label="Date de naissance"
        defaultValue={defaultValues.birth_date}
        inputRef={register}
        disableFuture
      />
      <Input
        name="address"
        label="Adresse"
        defaultValue={defaultValues.address}
        inputRef={register}
      />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Input
            name="zip_code"
            label="Code postal"
            defaultValue={defaultValues.zip_code}
            inputRef={register}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            name="city"
            label="Ville"
            defaultValue={defaultValues.city}
            inputRef={register}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Input
            name="mobile"
            label="Portable"
            defaultValue={defaultValues.mobile}
            inputRef={register}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            name="phone"
            label="Fixe"
            defaultValue={defaultValues.phone}
            inputRef={register}
          />
        </Grid>
      </Grid>
      <Input
        name="email"
        label="Email"
        defaultValue={defaultValues.email}
        inputRef={register}
      />
      <SubmitButton />
    </Form>
  );
};

export default TeacherForm;
