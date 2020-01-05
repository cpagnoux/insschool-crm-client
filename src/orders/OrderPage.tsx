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
import ProductList from './ProductList';

const getFields = (order: any): DataField[] => [{
  label: 'Adhérent :',
  value: order.contact
    && `${order.contact.first_name} ${order.contact.last_name}`,
  url: order.contact && `/members/${order.contact.id}`,
}, {
  label: 'Date :',
  value: order.created_at,
}];

const OrderPage: React.FC<RouteComponentProps> = ({ match }) => {
  const [token, setToken] = useTokenContext();
  const [order, setOrder] = useState();

  // Fetch order from server.
  useEffect(() => {
    const fetchOrder = async (id: number, accessToken: string) => {
      try {
        const res = await ResourceAPI.fetch('orders', id, accessToken);
        setOrder(res.data);
      } catch (e) {
        handleAxiosError(e, 'Fetching of order failed:', setToken);
      }
    };

    if (!token || !token.access_token) {
      return;
    }

    const { params }: any = match;
    fetchOrder(params.id, token.access_token);
  }, [match, token, setToken]);

  if (!order) {
    return <Loader />;
  }

  const fields = getFields(order);
  const total = order.order_product.reduce((sum: number, product: any) => (
    sum + product.product.price * product.quantity
  ), 0);

  return (
    <Layout
      title={`Commandes - n° ${order.id}`}
    >
      <Paper>
        <DataItem fields={fields} />
        <ProductList products={order.order_product} />
        <DataItem
          fields={[{
            label: 'TOTAL :',
            value: `${total.toFixed(2)} €`,
          }]}
        />
      </Paper>
    </Layout>
  );
};

export default OrderPage;
