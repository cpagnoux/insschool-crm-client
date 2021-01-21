import React from 'react';
import { useForm } from 'react-hook-form';
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

export interface FormData {
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
  initialValues?: FormData;
  onSubmit: (data: FormData) => void;
}

const PreRegistrationForm: React.FC<Props> = ({ initialValues, onSubmit }) => {
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
    mobile_father: '',
    mobile_mother: '',
    email: '',
    with_lessons: false,
    medium_of_knowledge: '',
  };
  /* eslint-enable @typescript-eslint/camelcase */

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Link href="http://www.insschool.fr/">
        {"Retour vers le site d'INS School"}
      </Link>
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
        inputRef={register({ required: true })}
        disableFuture
      />
      {errors.birth_date && formErrors.fieldRequired}
      <Input
        name="address"
        label="Adresse"
        defaultValue={defaultValues.address}
        inputRef={register({ required: true })}
      />
      {errors.address && formErrors.fieldRequired}
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Input
            name="zip_code"
            label="Code postal"
            defaultValue={defaultValues.zip_code}
            inputRef={register({ required: true })}
          />
          {errors.zip_code && formErrors.fieldRequired}
        </Grid>
        <Grid item xs={6}>
          <Input
            name="city"
            label="Ville"
            defaultValue={defaultValues.city}
            inputRef={register({ required: true })}
          />
          {errors.city && formErrors.fieldRequired}
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
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Input
            name="mobile_father"
            label="Portable père"
            defaultValue={defaultValues.mobile_father}
            inputRef={register}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            name="mobile_mother"
            label="Portable mère"
            defaultValue={defaultValues.mobile_mother}
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
      <Checkbox
        name="with_lessons"
        label="Souhaitez-vous participer à des cours ?"
        defaultValue={defaultValues.with_lessons}
        inputRef={register}
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
        defaultValue={defaultValues.medium_of_knowledge}
        inputRef={register({ required: true })}
      />
      {errors.medium_of_knowledge && formErrors.fieldRequired}
      <PreRegistrationInfo />
      <SubmitButton />
    </Form>
  );
};

export default PreRegistrationForm;
