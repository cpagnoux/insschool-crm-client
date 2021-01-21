import React from 'react';

import { Layout, ResourceAPI } from '../common';
import { useTokenContext } from '../store';
import RoomForm, { FormData } from './RoomForm';

const RoomCreationPage: React.FC = () => {
  const [token] = useTokenContext();

  const handleSubmit = async (data: FormData) => {
    if (!token || !token.access_token) {
      return;
    }

    await ResourceAPI.post('rooms', data, token.access_token);
  };

  return (
    <Layout title="Nouvelle salle">
      <RoomForm onSubmit={handleSubmit} />
    </Layout>
  );
};

export default RoomCreationPage;
