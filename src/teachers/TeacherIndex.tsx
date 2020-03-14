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

const TeacherIndex: React.FC = () => {
  const teachers = useResourceCollection('teachers');

  return (
    <Layout
      title="Professeurs"
      actions={[
        'Ajouter',
        'Envoyer un mail aux professeurs',
      ]}
    >
      <DataTable
        data={teachers}
        headCells={headCells}
        defaultOrder="asc"
        defaultOrderBy="last_name"
      />
    </Layout>
  );
};

export default TeacherIndex;
