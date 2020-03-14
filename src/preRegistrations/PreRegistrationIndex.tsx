import React from 'react';

import {
  DataTable,
  HeadCell,
  Layout,
  useResourceCollection,
} from '../common';

const headCells: HeadCell[] = [{
  id: 'last_name',
  label: 'Nom',
  numeric: false,
}, {
  id: 'first_name',
  label: 'Prénom',
  numeric: false,
}];

const PreRegistrationIndex: React.FC = () => {
  const preRegistrations = useResourceCollection('pre-registrations');

  return (
    <Layout title="Pré-inscriptions">
      <DataTable
        data={preRegistrations}
        headCells={headCells}
        defaultOrder="asc"
        defaultOrderBy="last_name"
      />
    </Layout>
  );
};

export default PreRegistrationIndex;
