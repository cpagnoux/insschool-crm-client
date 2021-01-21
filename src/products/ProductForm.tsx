import React from 'react';
import { useForm } from 'react-hook-form';
import { Grid } from '@material-ui/core';

import {
  Form,
  Input,
  SubmitButton,
  Textarea,
} from '../common/forms';
import { formErrors } from '../constants';

export interface FormData {
  name: string;
  description: string;
  price: number | null;
  stock: number | null;
}

interface Props {
  initialValues?: FormData;
  onSubmit: (data: FormData) => void;
}

const ProductForm: React.FC<Props> = ({ initialValues, onSubmit }) => {
  const { register, handleSubmit, errors } = useForm<FormData>();

  const defaultValues: FormData = initialValues || {
    name: '',
    description: '',
    price: null,
    stock: null,
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="name"
        label="Désignation"
        defaultValue={defaultValues.name}
        inputRef={register({ required: true })}
        autoFocus
      />
      {errors.name && formErrors.fieldRequired}
      <Textarea
        name="description"
        label="Description"
        defaultValue={defaultValues.description}
        inputRef={register}
      />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Input
            name="price"
            label="Prix"
            defaultValue={defaultValues.price}
            inputRef={register}
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            name="stock"
            label="Stock"
            defaultValue={defaultValues.stock}
            inputRef={register}
            type="number"
          />
        </Grid>
      </Grid>
      <SubmitButton />
    </Form>
  );
};

export default ProductForm;
