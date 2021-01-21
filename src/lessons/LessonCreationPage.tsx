import React from 'react';

import { Layout, ResourceAPI } from '../common';
import { useTokenContext } from '../store';
import LessonForm, { FormData } from './LessonForm';

const LessonCreationPage: React.FC = () => {
  const [token] = useTokenContext();

  const handleSubmit = async (data: FormData) => {
    if (!token || !token.access_token) {
      return;
    }

    await ResourceAPI.post('lessons', data, token.access_token);
  };

  return (
    <Layout title="Nouveau cours">
      <LessonForm onSubmit={handleSubmit} />
    </Layout>
  );
};

export default LessonCreationPage;
