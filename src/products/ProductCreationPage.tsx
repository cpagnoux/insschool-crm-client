import React from 'react';
import { FormikHelpers } from 'formik';

import { Layout, ResourceAPI } from '../common';
import { useTokenContext } from '../store';
import ProductForm, { Values } from './ProductForm';

const ProductCreationPage: React.FC = () => {
  const [token] = useTokenContext();

  const handleSubmit = async (
    values: Values,
    actions: FormikHelpers<Values>,
  ) => {
    if (!token || !token.access_token) {
      actions.setSubmitting(false);
      return;
    }

    await ResourceAPI.post('products', values, token.access_token);
    actions.setSubmitting(false);
  };

  return (
    <Layout title="Nouveau goodies">
      <ProductForm onSubmit={handleSubmit} />
    </Layout>
  );
};

export default ProductCreationPage;
