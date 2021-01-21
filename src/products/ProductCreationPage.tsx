import React from 'react';

import { Layout, ResourceAPI } from '../common';
import { useTokenContext } from '../store';
import ProductForm, { FormData } from './ProductForm';

const ProductCreationPage: React.FC = () => {
  const [token] = useTokenContext();

  const handleSubmit = async (data: FormData) => {
    if (!token || !token.access_token) {
      return;
    }

    await ResourceAPI.post('products', data, token.access_token);
  };

  return (
    <Layout title="Nouveau goodies">
      <ProductForm onSubmit={handleSubmit} />
    </Layout>
  );
};

export default ProductCreationPage;
