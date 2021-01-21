import React from 'react';

import { Layout, ResourceAPI } from '../common';
import { useTokenContext } from '../store';
import ContactForm, { FormData } from './ContactForm';

const ContactCreationPage: React.FC = () => {
  const [token] = useTokenContext();

  const handleSubmit = async (data: FormData) => {
    if (!token || !token.access_token) {
      return;
    }

    await ResourceAPI.post('contacts', data, token.access_token);
  };

  return (
    <Layout title="Nouvel adhérent">
      <ContactForm onSubmit={handleSubmit} />
    </Layout>
  );
};

export default ContactCreationPage;
