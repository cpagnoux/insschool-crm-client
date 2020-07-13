import React from 'react';
import { FormikHelpers } from 'formik';

import { Layout, ResourceAPI } from '../common';
import { useTokenContext } from '../store';
import ContactForm, { Values } from './ContactForm';

const ContactCreationPage: React.FC = () => {
  const [token] = useTokenContext();

  const handleSubmit = async (
    values: Values,
    actions: FormikHelpers<Values>,
  ) => {
    if (!token || !token.access_token) {
      actions.setSubmitting(false);
      return;
    }

    await ResourceAPI.post('contacts', values, token.access_token);
    actions.setSubmitting(false);
  };

  return (
    <Layout title="Nouvel adhérent">
      <ContactForm onSubmit={handleSubmit} />
    </Layout>
  );
};

export default ContactCreationPage;
