import React from 'react';

import {
  DataTable,
  HeadCell,
  Layout,
  useResourceCollection,
} from '../common';

const headCells: HeadCell[] = [{
  id: 'name',
  label: 'Nom',
  numeric: false,
}];

const RoomIndex: React.FC = () => {
  const rooms = useResourceCollection('rooms');

  return (
    <Layout title="Salles" actions={['Ajouter']}>
      <DataTable
        data={rooms}
        headCells={headCells}
        defaultOrder="asc"
        defaultOrderBy="name"
      />
    </Layout>
  );
};

export default RoomIndex;
