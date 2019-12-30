import React, { useEffect, useState } from 'react';

import {
  DataTable,
  HeadCell,
  Layout,
  ResourceAPI,
  handleAxiosError,
} from '../common';
import { useTokenContext } from '../store';

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
  const [token, setToken] = useTokenContext();
  const [products, setProducts] = useState<any[]>([]);

  // Fetch products from server.
  useEffect(() => {
    const fetchProducts = async (accessToken: string) => {
      try {
        const res = await ResourceAPI.fetchAll('products', accessToken);
        const data = res.data.map((product: any) => ({
          ...product,
          url: `/goodies/${product.id}`,
        }));
        setProducts(data);
      } catch (e) {
        handleAxiosError(e, 'Fetching of products failed:', setToken);
      }
    };

    if (!token || !token.access_token) {
      return;
    }

    fetchProducts(token.access_token);
  }, [token, setToken]);

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
