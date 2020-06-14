import React from 'react';
import { FormikHelpers } from 'formik';

import { Layout, ResourceAPI } from '../common';
import { useTokenContext } from '../store';
import OrderForm, { Values } from './OrderForm';

const OrderCreationPage: React.FC = () => {
  const [token] = useTokenContext();

  const handleSubmit = async (
    values: Values,
    actions: FormikHelpers<Values>,
  ) => {
    if (!token || !token.access_token) {
      actions.setSubmitting(false);
      return;
    }

    await ResourceAPI.post('orders', values, token.access_token);
    actions.setSubmitting(false);
  };

  return (
    <Layout title="Nouvelle commande">
      <OrderForm onSubmit={handleSubmit} />
    </Layout>
  );
};

export default OrderCreationPage;
