import React from 'react';

import { Layout, ResourceAPI } from '../common';
import { useTokenContext } from '../store';
import OrderForm, { FormData } from './OrderForm';

const OrderCreationPage: React.FC = () => {
  const [token] = useTokenContext();

  const handleSubmit = async (data: FormData) => {
    if (!token || !token.access_token) {
      return;
    }

    await ResourceAPI.post('orders', data, token.access_token);
  };

  return (
    <Layout title="Nouvelle commande">
      <OrderForm onSubmit={handleSubmit} />
    </Layout>
  );
};

export default OrderCreationPage;
