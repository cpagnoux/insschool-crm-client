import React from 'react';
import { useForm } from 'react-hook-form';

import { useResourceCollection } from '../common';
import { Form, Select, SubmitButton } from '../common/forms';
import { formErrors } from '../constants';

export interface FormData {
  contact: string;
}

interface Props {
  initialValues?: FormData;
  onSubmit: (data: FormData) => void;
}

const OrderForm: React.FC<Props> = ({ initialValues, onSubmit }) => {
  const { register, handleSubmit, errors } = useForm<FormData>();
  const contacts = useResourceCollection('contacts');

  const defaultValues: FormData = initialValues || {
    contact: '',
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Select
        name="contact"
        label="Adhérent"
        options={contacts.map((contact) => ({
          label: `${contact.first_name} ${contact.last_name}`,
          value: contact.id,
        }))}
        defaultValue={defaultValues.contact}
        inputRef={register({ required: true })}
        autoFocus
      />
      {errors.contact && formErrors.fieldRequired}
      <SubmitButton />
    </Form>
  );
};

export default OrderForm;
