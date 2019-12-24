import React, { useEffect, useState } from 'react';

import {
  DataTable,
  HeadCell,
  Layout,
  handleAxiosError,
} from '../common';
import { useTokenContext } from '../store';
import TeacherAPI from './TeacherAPI';

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
  const [token, setToken] = useTokenContext();
  const [teachers, setTeachers] = useState<any[]>([]);

  // Fetch teachers from server.
  useEffect(() => {
    const fetchTeachers = async (accessToken: string) => {
      try {
        const res = await TeacherAPI.fetchAll(accessToken);
        const data = res.data.map((teacher: any) => ({
          ...teacher,
          url: `/teachers/${teacher.id}`,
        }));
        setTeachers(data);
      } catch (e) {
        handleAxiosError(e, 'Fetching of teachers failed:', setToken);
      }
    };

    if (!token || !token.access_token) {
      return;
    }

    fetchTeachers(token.access_token);
  }, [token, setToken]);

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
