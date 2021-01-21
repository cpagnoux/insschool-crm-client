import React from 'react';
import { useForm } from 'react-hook-form';
import { Grid } from '@material-ui/core';

import { Form, Input, SubmitButton } from '../common/forms';
import { formErrors } from '../constants';

export interface FormData {
  name: string;
  address: string;
  zip_code: string;
  city: string;
}

interface Props {
  initialValues?: FormData;
  onSubmit: (data: FormData) => void;
}

const RoomForm: React.FC<Props> = ({ initialValues, onSubmit }) => {
  const { register, handleSubmit, errors } = useForm<FormData>();

  /* eslint-disable @typescript-eslint/camelcase */
  const defaultValues: FormData = initialValues || {
    name: '',
    address: '',
    zip_code: '',
    city: '',
  };
  /* eslint-enable @typescript-eslint/camelcase */

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="name"
        label="Nom"
        defaultValue={defaultValues.name}
        inputRef={register({ required: true })}
        autoFocus
      />
      {errors.name && formErrors.fieldRequired}
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
      <SubmitButton />
    </Form>
  );
};

export default RoomForm;
