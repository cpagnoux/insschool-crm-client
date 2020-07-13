import React from 'react';
import { FormikErrors, FormikHelpers } from 'formik';

import { useResourceCollection } from '../common';
import { Form, Select, SubmitButton } from '../common/forms';
import { formErrors } from '../constants';

export interface Values {
  contact: string;
}

interface Props {
  initialValues?: Values;
  onSubmit: (values: Values, actions: FormikHelpers<Values>) => void;
}

const OrderForm: React.FC<Props> = ({ initialValues, onSubmit }) => {
  const contacts = useResourceCollection('contacts');

  const defaultInitialValues: Values = {
    contact: '',
  };

  const validate = (values: Values) => {
    const errors: FormikErrors<Values> = {};

    if (!values.contact) {
      errors.contact = formErrors.fieldRequired;
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
          <Select
            name="contact"
            label="Adhérent"
            options={contacts.map((contact) => ({
              label: `${contact.first_name} ${contact.last_name}`,
              value: contact.id,
            }))}
            autoFocus
          />
          <SubmitButton disabled={isSubmitting} />
        </>
      )}
    </Form>
  );
};

export default OrderForm;
