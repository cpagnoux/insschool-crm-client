import React, { useEffect, useState } from 'react';

import {
  DataTable,
  HeadCell,
  Layout,
  handleAxiosError,
} from '../common';
import { useTokenContext } from '../store';
import OrderAPI from './OrderAPI';

const headCells: HeadCell[] = [{
  id: 'id',
  label: 'N° de commande',
  numeric: true,
}, {
  id: 'contact_full_name',
  label: 'Adhérent',
  numeric: false,
}, {
  id: 'created_at',
  label: 'Date',
  numeric: false,
}];

const OrderIndex: React.FC = () => {
  const [token, setToken] = useTokenContext();
  const [orders, setOrders] = useState<any[]>([]);

  // Fetch orders from server.
  useEffect(() => {
    const fetchOrders = async (accessToken: string) => {
      try {
        const res = await OrderAPI.fetchAll(accessToken);
        const data = res.data.map((order: any) => ({
          ...order,
          url: `/orders/${order.id}`,
        }));
        setOrders(data);
      } catch (e) {
        handleAxiosError(e, 'Fetching of orders failed:', setToken);
      }
    };

    if (!token || !token.access_token) {
      return;
    }

    fetchOrders(token.access_token);
  }, [token, setToken]);

  return (
    <Layout title="Commandes" actions={['Ajouter']}>
      <DataTable
        data={orders}
        headCells={headCells}
        defaultOrder="desc"
        defaultOrderBy="created_at"
      />
    </Layout>
  );
};

export default OrderIndex;
