import React from 'react';
import { FormikHelpers } from 'formik';

import { Layout, ResourceAPI } from '../common';
import { useTokenContext } from '../store';
import RoomForm, { Values } from './RoomForm';

const RoomCreationPage: React.FC = () => {
  const [token] = useTokenContext();

  const handleSubmit = async (
    values: Values,
    actions: FormikHelpers<Values>,
  ) => {
    if (!token || !token.access_token) {
      actions.setSubmitting(false);
      return;
    }

    await ResourceAPI.post('rooms', values, token.access_token);
    actions.setSubmitting(false);
  };

  return (
    <Layout title="Nouvelle salle">
      <RoomForm onSubmit={handleSubmit} />
    </Layout>
  );
};

export default RoomCreationPage;
