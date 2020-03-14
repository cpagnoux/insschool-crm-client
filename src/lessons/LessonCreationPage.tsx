import React from 'react';
import { FormikHelpers } from 'formik';

import { Layout, ResourceAPI } from '../common';
import { useTokenContext } from '../store';
import LessonForm, { Values } from './LessonForm';

const LessonCreationPage: React.FC = () => {
  const [token] = useTokenContext();

  const handleSubmit = async (
    values: Values,
    actions: FormikHelpers<Values>,
  ) => {
    if (!token || !token.access_token) {
      actions.setSubmitting(false);
      return;
    }

    await ResourceAPI.post('lessons', values, token.access_token);
    actions.setSubmitting(false);
  };

  return (
    <Layout title="Nouveau cours">
      <LessonForm onSubmit={handleSubmit} />
    </Layout>
  );
};

export default LessonCreationPage;
