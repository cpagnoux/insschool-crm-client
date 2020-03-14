import React from 'react';

import {
  DataTable,
  HeadCell,
  Layout,
  useResourceCollection,
} from '../common';

const headCells: HeadCell[] = [{
  id: 'name',
  label: 'Désignation',
  numeric: false,
}, {
  id: 'price',
  label: 'Prix',
  numeric: true,
}, {
  id: 'stock',
  label: 'Stock',
  numeric: true,
}];

const ProductIndex: React.FC = () => {
  const products = useResourceCollection('products', 'goodies');

  return (
    <Layout title="Goodies" actions={['Ajouter']}>
      <DataTable
        data={products}
        headCells={headCells}
        defaultOrder="asc"
        defaultOrderBy="name"
      />
    </Layout>
  );
};

export default ProductIndex;
