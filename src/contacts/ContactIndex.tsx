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

const ContactIndex: React.FC = () => {
  const contacts = useResourceCollection('contacts', 'members');

  return (
    <Layout
      title="Adhérents"
      actions={[
        'Ajouter',
        'Envoyer un mail aux adhérents sélectionnés',
      ]}
    >
      <DataTable
        data={contacts}
        headCells={headCells}
        defaultOrder="asc"
        defaultOrderBy="last_name"
      />
    </Layout>
  );
};

export default ContactIndex;
