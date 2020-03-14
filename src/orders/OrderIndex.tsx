import React from 'react';

import {
  DataTable,
  HeadCell,
  Layout,
  useResourceCollection,
} from '../common';

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
  const orders = useResourceCollection('orders');

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
