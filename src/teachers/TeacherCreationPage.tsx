import React from 'react';
import { FormikHelpers } from 'formik';

import { Layout, ResourceAPI } from '../common';
import { useTokenContext } from '../store';
import TeacherForm, { Values } from './TeacherForm';

const TeacherCreationPage: React.FC = () => {
  const [token] = useTokenContext();

  const handleSubmit = async (
    values: Values,
    actions: FormikHelpers<Values>,
  ) => {
    if (!token || !token.access_token) {
      actions.setSubmitting(false);
      return;
    }

    await ResourceAPI.post('teachers', values, token.access_token);
    actions.setSubmitting(false);
  };

  return (
    <Layout title="Nouveau professeur">
      <TeacherForm onSubmit={handleSubmit} />
    </Layout>
  );
};

export default TeacherCreationPage;
