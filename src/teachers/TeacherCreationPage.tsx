import React from 'react';

import { Layout, ResourceAPI } from '../common';
import { useTokenContext } from '../store';
import TeacherForm, { FormData } from './TeacherForm';

const TeacherCreationPage: React.FC = () => {
  const [token] = useTokenContext();

  const handleSubmit = async (data: FormData) => {
    if (!token || !token.access_token) {
      return;
    }

    await ResourceAPI.post('teachers', data, token.access_token);
  };

  return (
    <Layout title="Nouveau professeur">
      <TeacherForm onSubmit={handleSubmit} />
    </Layout>
  );
};

export default TeacherCreationPage;
