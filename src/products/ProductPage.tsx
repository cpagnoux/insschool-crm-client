import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Paper } from '@material-ui/core';

import {
  DataField,
  DataItem,
  Layout,
  Loader,
  ResourceAPI,
  handleAxiosError,
} from '../common';
import { useTokenContext } from '../store';

const getFields = (product: any): DataField[] => [{
  label: 'Description :',
  value: product.description,
}, {
  label: 'Prix :',
  value: product.price,
}, {
  label: 'Stock :',
  value: product.stock,
}];

const ProductPage: React.FC<RouteComponentProps> = ({ match }) => {
  const [token, setToken] = useTokenContext();
  const [product, setProduct] = useState();

  // Fetch product from server.
  useEffect(() => {
    const fetchProduct = async (id: number, accessToken: string) => {
      try {
        const res = await ResourceAPI.fetch('products', id, accessToken);
        setProduct(res.data);
      } catch (e) {
        handleAxiosError(e, 'Fetching of product failed:', setToken);
      }
    };

    if (!token || !token.access_token) {
      return;
    }

    const { params }: any = match;
    fetchProduct(params.id, token.access_token);
  }, [match, token, setToken]);

  if (!product) {
    return <Loader />;
  }

  const fields = getFields(product);

  return (
    <Layout
      title={`Goodies - ${product.name}`}
      actions={['Modifier', 'Supprimer']}
    >
      <Paper>
        <DataItem fields={fields} />
      </Paper>
    </Layout>
  );
};

export default ProductPage;
